var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var LightService;
  LightService = (function() {
    function LightService() {
      this.destroy = __bind(this.destroy, this);
      this.update = __bind(this.update, this);
      this.init = __bind(this.init, this);
    }

    LightService.prototype.init = function() {
      var light;
      this.scene = Home.Scene;
      light = new THREE.DirectionalLight(0xfffdf0, 0.6);
      this.scene.add(light);
    };

    LightService.prototype.update = function() {};

    LightService.prototype.destroy = function() {};

    return LightService;

  })();
  return LightService;
});
