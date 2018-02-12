define(["TrackballControls"], function(TrackballControls) {
  "use strict";
  var SceneHelper;
  SceneHelper = (function() {
    class SceneHelper {
      constructor() {
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        // @container.add @cameraHelper
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.destroy = this.destroy.bind(this);
      }

      init() {
        console.log("hello");
        Signal.onUpdate.add(this.onUpdate);
        Signal.onKeyPressed.add(this.onKeyPressed);
        return this.ready();
      }

      ready() {
        var currentLight, i, l, len, light, sceneLights;
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
        // Lights Helper
        this.lightHelpers = [];
        sceneLights = Scene.scene.__lights;
        for (i = 0, len = sceneLights.length; i < len; i++) {
          light = sceneLights[i];
          // console.log light.position
          currentLight = light;
          if (light instanceof THREE.DirectionalLight) {
            l = new THREE.DirectionalLightHelper(currentLight, 120);
            l.update();
          }
        }
        // # if light instanceof THREE.PointLight
        // #     l = new THREE.PointLightHelper(light)
        // if l?
        //     console.log l
        //     @lightHelpers.push(l)
        //     @container.add l

        // Camera Helper
        return this.cameraHelper = new THREE.CameraHelper(Camera.camera);
      }

      onKeyPressed(e) {
        e.preventDefault();
        if (e.keyCode === 103) { // g
          return this.enabled = this.enabled ? false : true;
        }
      }

      onUpdate() {
        var cameraPos;
        if (this.enabled) {
          // @controls.update()
          // @cameraHelper.update()

          // for light in @lightHelpers
          //     console.log light.position
          //     light.update()
          cameraPos = Camera.camera.position;
          this.grid.position.set(0, 0, cameraPos.z);
          // @sphere.position.set(cameraPos.x, cameraPos.y, cameraPos.z+600)
          return Util.ToggleVisibility(this.container, true);
        } else {
          return Util.ToggleVisibility(this.container, false);
        }
      }

      destroy() {}

    };

    SceneHelper.prototype.controls = void 0;

    SceneHelper.prototype.grid = void 0;

    SceneHelper.prototype.cameraHelper = void 0;

    SceneHelper.prototype.enabled = false;

    SceneHelper.prototype.container = void 0;

    SceneHelper.prototype.lightHelpers = void 0;

    SceneHelper.prototype.sphere = void 0;

    return SceneHelper;

  }).call(this);
  return SceneHelper;
});
