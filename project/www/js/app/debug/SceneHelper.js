var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["TrackballControls"], function(TrackballControls) {
  "use strict";
  var SceneHelper;
  SceneHelper = (function() {
    SceneHelper.prototype.controls = void 0;

    SceneHelper.prototype.grid = void 0;

    SceneHelper.prototype.cameraHelper = void 0;

    SceneHelper.prototype.enabled = false;

    SceneHelper.prototype.container = void 0;

    SceneHelper.prototype.lightHelpers = void 0;

    SceneHelper.prototype.sphere = void 0;

    function SceneHelper() {
      this.destroy = __bind(this.destroy, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.onKeyPressed = __bind(this.onKeyPressed, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
    }

    SceneHelper.prototype.init = function() {
      console.log("hello");
      Signal.onUpdate.add(this.onUpdate);
      Signal.onKeyPressed.add(this.onKeyPressed);
      return this.ready();
    };

    SceneHelper.prototype.ready = function() {
      var currentLight, l, light, sceneLights, _i, _len;
      this.container = new THREE.Group();
      Canvas.add(this.container);
      this.grid = new THREE.GridHelper(500, 25);
      this.container.add(this.grid);
      this.controls = new THREE.TrackballControls(Camera.camera, Renderer.element[0]);
      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;
      this.controls.noZoom = false;
      this.controls.noPan = false;
      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;
      this.controls.keys = [65, 83, 68];
      this.sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 100), new THREE.MeshNormalMaterial());
      this.container.add(this.sphere);
      this.sphere.position.set(0, 0, 800);
      this.lightHelpers = [];
      sceneLights = Scene.scene.__lights;
      for (_i = 0, _len = sceneLights.length; _i < _len; _i++) {
        light = sceneLights[_i];
        currentLight = light;
        if (light instanceof THREE.DirectionalLight) {
          l = new THREE.DirectionalLightHelper(currentLight, 120);
          l.update();
        }
      }
      return this.cameraHelper = new THREE.CameraHelper(Camera.camera);
    };

    SceneHelper.prototype.onKeyPressed = function(e) {
      e.preventDefault();
      if (e.keyCode === 103) {
        return this.enabled = this.enabled ? false : true;
      }
    };

    SceneHelper.prototype.onUpdate = function() {
      var cameraPos;
      if (this.enabled) {
        cameraPos = Camera.camera.position;
        this.grid.position.set(0, 0, cameraPos.z);
        return Util.ToggleVisibility(this.container, true);
      } else {
        return Util.ToggleVisibility(this.container, false);
      }
    };

    SceneHelper.prototype.destroy = function() {};

    return SceneHelper;

  })();
  return SceneHelper;
});
