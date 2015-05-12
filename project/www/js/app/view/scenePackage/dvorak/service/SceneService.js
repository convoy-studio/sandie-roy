var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["DatParser"], function(DatParser) {
  "use strict";
  var SceneService;
  SceneService = (function() {
    SceneService.prototype.scene = void 0;

    SceneService.prototype.time = void 0;

    SceneService.prototype.sky = void 0;

    SceneService.prototype.sunSphere = void 0;

    SceneService.prototype.skydomeUniforms = void 0;

    SceneService.prototype.tween = void 0;

    SceneService.prototype.anim = void 0;

    SceneService.prototype.fogColor = void 0;

    SceneService.prototype.topColor = void 0;

    SceneService.prototype.bottomColor = void 0;

    function SceneService() {
      this.destroy = __bind(this.destroy, this);
      this.update = __bind(this.update, this);
      this.add = __bind(this.add, this);
      this.onUpdateTween = __bind(this.onUpdateTween, this);
      this.onColorStateChanged = __bind(this.onColorStateChanged, this);
      this.init = __bind(this.init, this);
    }

    SceneService.prototype.init = function() {
      var fragmentShader, vertexShader;
      Signal.colorStateChanged.add(this.onColorStateChanged);
      this.anim = {
        value: 0
      };
      this.tween = TweenMax.to(this.anim, 2, {
        value: 1,
        paused: true,
        onUpdate: this.onUpdateTween
      });
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(0x0d619d, 2296, 4546);
      this.fogColor = new THREE.Color();
      this.topColor = new THREE.Color();
      this.bottomColor = new THREE.Color();
      vertexShader = Loader.getShader("skydome-vertex");
      fragmentShader = Loader.getShader("skydome-fragment");
      this.skydomeUniforms = {
        topColor: {
          type: "c",
          value: new THREE.Color(0x000000)
        },
        bottomColor: {
          type: "c",
          value: new THREE.Color(0xffffff)
        },
        offset: {
          type: "f",
          value: -500
        },
        exponent: {
          type: "f",
          value: 0.78
        }
      };
      this.skyGeo = new THREE.SphereGeometry(8000, 10, 10);
      this.skyMat = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: this.skydomeUniforms,
        side: THREE.BackSide,
        blending: THREE.CustomBlending
      });
      this.sky = new THREE.Mesh(this.skyGeo, this.skyMat);
      this.add(this.sky);
    };

    SceneService.prototype.onColorStateChanged = function() {
      var timescale;
      this.fogColor.setRGB(this.scene.fog.color.r, this.scene.fog.color.g, this.scene.fog.color.b);
      this.topColor.setRGB(this.skydomeUniforms.topColor.value.r, this.skydomeUniforms.topColor.value.g, this.skydomeUniforms.topColor.value.b);
      this.bottomColor.setRGB(this.skydomeUniforms.bottomColor.value.r, this.skydomeUniforms.bottomColor.value.g, this.skydomeUniforms.bottomColor.value.b);
      timescale = Dvorak.Color.state === "BLUE" || Dvorak.Color.state === "GREEN" || Dvorak.Color.state === "RED" ? 1000000 : 1;
      this.tween.timeScale(timescale);
      this.tween.play(0);
    };

    SceneService.prototype.onUpdateTween = function() {
      var fogVal, skyBottomColor, skyTopColor;
      fogVal = Util.CalcAnimValue(this.fogColor, Dvorak.Color.fogColors[Dvorak.Color.state], this.anim.value);
      skyBottomColor = Util.CalcAnimValue(this.bottomColor, Dvorak.Color.skyBottomColors[Dvorak.Color.state], this.anim.value);
      this.scene.fog.color.setRGB(fogVal.r, fogVal.g, fogVal.b);
      this.skydomeUniforms.bottomColor.value.setRGB(skyBottomColor.r, skyBottomColor.g, skyBottomColor.b);
      if (Dvorak.Color.state === "WHITE") {
        skyTopColor = Util.CalcAnimValue(this.topColor, Dvorak.Color.WHITE, this.anim.value);
        this.skydomeUniforms.topColor.value.setRGB(skyTopColor.r, skyTopColor.g, skyTopColor.b);
      }
      if (Dvorak.Color.state === "RED" || Dvorak.Color.state === "BLUE") {
        skyTopColor = Util.CalcAnimValue(this.topColor, Dvorak.Color.BLACK, this.anim.value);
        this.skydomeUniforms.topColor.value.setRGB(skyTopColor.r, skyTopColor.g, skyTopColor.b);
      }
    };

    SceneService.prototype.add = function(object) {
      this.scene.add(object);
    };

    SceneService.prototype.update = function() {
      this.sky.position.x = Dvorak.Camera.camera.position.x;
      this.sky.position.y = Dvorak.Camera.camera.position.y;
      this.sky.position.z = Dvorak.Camera.camera.position.z + 1000;
    };

    SceneService.prototype.destroy = function() {
      Signal.colorStateChanged.remove(this.onColorStateChanged);
      this.skyGeo.dispose();
      this.skyMat.dispose();
      this.fogColor = null;
      this.topColor = null;
      this.bottomColor = null;
      this.tween.kill();
      this.tween = null;
      this.scene = null;
      this.skydomeUniforms = null;
      this.anim = null;
    };

    return SceneService;

  })();
  return SceneService;
});
