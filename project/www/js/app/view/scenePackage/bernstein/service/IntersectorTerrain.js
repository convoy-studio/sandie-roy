var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  var IntersectorTerrain;
  IntersectorTerrain = (function() {
    IntersectorTerrain.prototype.projectCamera = void 0;

    IntersectorTerrain.prototype.projectCameraLookAt = void 0;

    function IntersectorTerrain() {
      this.destroy = __bind(this.destroy, this);
      this.update = __bind(this.update, this);
      this.init = __bind(this.init, this);
    }

    IntersectorTerrain.prototype.init = function() {
      this.projectCameraLookAt = new THREE.Vector3(0, 0, 0);
      this.projectCamera = new THREE.PerspectiveCamera(110, 1.5, 1, 2600);
      Bernstein.Scene.add(this.projectCamera);
    };

    IntersectorTerrain.prototype.update = function() {
      this.projectCamera.position.x = 0;
      this.projectCamera.position.y = 1500;
      this.projectCamera.position.z = Bernstein.Camera.camera.position.z + 2800;
      this.projectCameraLookAt.z = this.projectCamera.position.z;
      this.projectCamera.lookAt(this.projectCameraLookAt);
    };

    IntersectorTerrain.prototype.destroy = function() {
      this.projectCameraLookAt = null;
      this.projectCamera = null;
    };

    return IntersectorTerrain;

  })();
  return IntersectorTerrain;
});
