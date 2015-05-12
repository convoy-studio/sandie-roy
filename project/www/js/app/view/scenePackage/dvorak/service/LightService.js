var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var LightService;
  LightService = (function() {
    LightService.prototype.scene = void 0;

    LightService.prototype.pointLight = void 0;

    LightService.prototype.tween = void 0;

    LightService.prototype.anim = void 0;

    LightService.prototype.pointColor = void 0;

    function LightService() {
      this.destroy = __bind(this.destroy, this);
      this.pause = __bind(this.pause, this);
      this.play = __bind(this.play, this);
      this.update = __bind(this.update, this);
      this.onUpdateTween = __bind(this.onUpdateTween, this);
      this.onColorStateChanged = __bind(this.onColorStateChanged, this);
      this.init = __bind(this.init, this);
    }

    LightService.prototype.init = function() {
      this.scene = Dvorak.Scene.scene;
      Signal.colorStateChanged.add(this.onColorStateChanged);
      this.anim = {
        value: 0
      };
      this.tween = TweenMax.to(this.anim, 2, {
        value: 1,
        paused: true,
        onUpdate: this.onUpdateTween
      });
      this.tween.pause(0, false);
      this.pointColor = new THREE.Color();
      this.pointLight = new THREE.PointLight(0x44e9ff, 0.8);
      this.scene.add(this.pointLight);
    };

    LightService.prototype.onColorStateChanged = function() {
      var timescale;
      this.pointColor.setRGB(this.pointLight.color.r, this.pointLight.color.g, this.pointLight.color.b);
      timescale = Dvorak.Color.state === "BLUE" || Dvorak.Color.state === "GREEN" || Dvorak.Color.state === "RED" ? 10000 : 1;
      this.tween.timeScale(timescale);
      this.tween.play(0);
    };

    LightService.prototype.onUpdateTween = function() {
      var vColor;
      vColor = Util.CalcAnimValue(this.pointColor, Dvorak.Color.lightColors[Dvorak.Color.state], this.anim.value);
      this.pointLight.color.setRGB(vColor.r, vColor.g, vColor.b);
    };

    LightService.prototype.update = function() {};

    LightService.prototype.play = function() {
      this.tween.play();
    };

    LightService.prototype.pause = function() {
      this.tween.pause();
    };

    LightService.prototype.destroy = function() {
      Signal.colorStateChanged.remove(this.onColorStateChanged);
      this.anim = null;
      this.tween.kill();
      this.tween = null;
      this.pointLight = null;
    };

    return LightService;

  })();
  return LightService;
});
