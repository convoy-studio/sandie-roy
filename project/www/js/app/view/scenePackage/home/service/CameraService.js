var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var CameraService;
  CameraService = (function() {
    CameraService.prototype.camera = void 0;

    CameraService.prototype.lookAtVec = void 0;

    function CameraService() {
      this.update = __bind(this.update, this);
      this.resize = __bind(this.resize, this);
      this.lookAt = __bind(this.lookAt, this);
      this.position = __bind(this.position, this);
      this.init = __bind(this.init, this);
    }

    CameraService.prototype.init = function() {
      var height, width;
      width = Model.windowW;
      height = Model.windowH;
      this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -500, 1000);
      this.camera.zoom = 4;
      this.lookAtVec = new THREE.Vector3(0, 0, 0);
    };

    CameraService.prototype.position = function(v) {
      this.camera.position.x = v.x;
      this.camera.position.y = v.y;
      this.camera.position.z = v.z;
    };

    CameraService.prototype.lookAt = function(v3) {
      this.camera.lookAt(v3);
    };

    CameraService.prototype.resize = function() {
      this.camera.left = window.innerWidth / -2;
      this.camera.right = window.innerWidth / 2;
      this.camera.top = window.innerHeight / 2;
      this.camera.bottom = window.innerHeight / -2;
      this.camera.updateProjectionMatrix();
    };

    CameraService.prototype.update = function() {
      this.lookAt(this.lookAtVec);
    };

    return CameraService;

  })();
  return CameraService;
});
