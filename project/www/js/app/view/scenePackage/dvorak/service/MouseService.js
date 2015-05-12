var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var MouseService;
  MouseService = (function() {
    MouseService.prototype.mouseVector = void 0;

    MouseService.prototype.raycaster = void 0;

    MouseService.prototype.intersection = void 0;

    MouseService.prototype.intersectMeshes = void 0;

    MouseService.prototype.mouseHelper = void 0;

    MouseService.prototype.projection = void 0;

    MouseService.prototype.normalVector = void 0;

    function MouseService() {
      this.destroy = __bind(this.destroy, this);
      this.normalProjection = __bind(this.normalProjection, this);
      this.update = __bind(this.update, this);
      this.init = __bind(this.init, this);
      this.projection = new THREE.Vector3(0, 0, 0);
    }

    MouseService.prototype.init = function() {
      this.mouseVector = new THREE.Vector3();
      this.normalVector = new THREE.Vector3();
      this.raycaster = new THREE.Raycaster();
      this.intersection = {
        intersects: false,
        point: new THREE.Vector3()
      };
    };

    MouseService.prototype.update = function() {
      var dir, intersects, p, xRatio, yRatio;
      xRatio = Model.mouseX / Model.windowW;
      yRatio = Model.mouseY / Model.windowH;
      this.mouseVector.set(xRatio * 2 - 1, -yRatio * 2 + 1, 1);
      this.mouseVector.unproject(Dvorak.Camera.camera);
      dir = this.mouseVector.sub(Dvorak.Camera.camera.position).normalize();
      this.raycaster.set(Dvorak.Camera.camera.position, dir);
      intersects = this.raycaster.intersectObjects(this.intersectMeshes);
      if (intersects.length > 0) {
        p = intersects[0].point;
        this.intersection.intersects = true;
      } else {
        this.intersection.intersects = false;
      }
      if (Model.cameraState === "TERRAIN_HIGH" || Model.cameraState === "TERRAIN_LOW") {
        if (this.intersection.intersects) {
          this.projection.x = p.x;
          this.projection.y = p.y;
          this.projection.z = p.z;
        } else {
          this.normalProjection(dir);
        }
      } else if (Model.cameraState === "SKY") {
        this.normalProjection(dir);
      }
    };

    MouseService.prototype.normalProjection = function(dir) {
      var distance;
      distance = 3000;
      this.projection.set(Dvorak.Camera.camera.position.x, Dvorak.Camera.camera.position.y, Dvorak.Camera.camera.position.z);
      this.projection.add(dir.multiplyScalar(distance));
    };

    MouseService.prototype.destroy = function() {
      this.projection = null;
      this.mouseVector = null;
      this.normalVector = null;
      this.raycaster = null;
      this.intersection.point = null;
      this.intersection = null;
    };

    return MouseService;

  })();
  return MouseService;
});
