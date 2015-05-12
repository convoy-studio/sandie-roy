var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["ScenePackage", "BernsteinCameraService", "BernsteinColorService", "BernsteinIntersectorTerrain", "BernsteinLightService", "BernsteinMouseService", "BernsteinPoolService", "BernsteinSceneService", "BernsteinStateService", "BernsteinDisplacementTerrain", "BernsteinMouseFollower", "BernsteinMouseTrailRibbonGroup"], function(ScenePackage, CameraService, ColorService, IntersectorTerrain, LightService, MouseService, PoolService, SceneService, StateService, DisplacementTerrain, MouseFollower, MouseTrailRibbonGroup) {
  var BernsteinPackage;
  BernsteinPackage = (function(_super) {
    __extends(BernsteinPackage, _super);

    function BernsteinPackage(id) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.render = __bind(this.render, this);
      this.timelineStateChanged = __bind(this.timelineStateChanged, this);
      this.init = __bind(this.init, this);
      BernsteinPackage.__super__.constructor.call(this, id);
      this.camera = Bernstein.Camera = new CameraService();
      this.light = Bernstein.Light = new LightService();
      this.pooler = Bernstein.Pooler = new PoolService();
      this.scene = Bernstein.Scene = new SceneService();
      this.state = Bernstein.State = new StateService();
      this.color = Bernstein.Color = new ColorService();
      this.mouse = Bernstein.Mouse = new MouseService();
      this.intersector = Bernstein.Intersector = new IntersectorTerrain();
      this.renderer = Renderer.renderer;
    }

    BernsteinPackage.prototype.init = function() {
      this.camera.init();
      this.scene.init();
      this.light.init();
      this.pooler.init();
      this.mouse.init();
      this.intersector.init();
      Signal.timelineStateChanged.add(this.timelineStateChanged);
      Signal.captureStarted.add(this.captureStarted);
      Signal.captureDataEnded.add(this.captureDataEnded);
      BernsteinPackage.__super__.init.call(this);
    };

    BernsteinPackage.prototype.timelineStateChanged = function(state) {
      switch (state) {
        case "active":
          this.pause();
          break;
        case "disactive":
          this.play();
          break;
        case "reset":
          break;
      }
    };

    BernsteinPackage.prototype.render = function() {
      var sound_duration, sound_position;
      if (!this.isPaused) {
        sound_duration = Sound.instance.getDuration();
        sound_position = Sound.instance.getPosition();
        if ((sound_duration - sound_position) < 600) {
          this.stop();
          TweenMax.ticker.removeEventListener("tick", this.update);
          Router.sendTo("editor");
        } else {
          Timeline.update();
          this.camera.moveCameraForward();
          this.camera.update();
          this.mouse.update();
        }
      }
      this.light.update();
      this.scene.update();
      this.intersector.update();
      this.state.update();
      Renderer.clear();
      this.renderer.render(this.scene.scene, this.camera.camera);
      Sound.update();
    };

    BernsteinPackage.prototype.resize = function() {
      Bernstein.Camera.resize();
      BernsteinPackage.__super__.resize.call(this);
    };

    BernsteinPackage.prototype.destroy = function() {
      Signal.timelineStateChanged.remove(this.timelineStateChanged);
      Signal.captureStarted.remove(this.captureStarted);
      Signal.captureDataEnded.remove(this.captureDataEnded);
      BernsteinPackage.__super__.destroy.call(this);
    };

    return BernsteinPackage;

  })(ScenePackage);
  return BernsteinPackage;
});
