var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["ScenePackage", "DvorakCameraService", "DvorakColorService", "DvorakIntersectorTerrain", "DvorakLightService", "DvorakMouseService", "DvorakPoolService", "DvorakSceneService", "DvorakStateService", "DvorakBeginTallPlanes", "DvorakBubbleBreathe", "DvorakChords", "DvorakCylinderInside", "DvorakDisplacementTerrain", "DvorakDoubleColorLines", "DvorakFloatingGems", "DvorakGroundConstruction", "DvorakGroundNotes", "DvorakMouseFollower", "DvorakMouseTrailRibbonGroup", "DvorakObjectColorSwitcher", "DvorakPyramides", "DvorakSideWalls", "DvorakSkyLines", "DvorakSkyPulse", "DvorakTallLines", "DvorakTambours", "DvorakToothPick", "DvorakTornado", "DvorakTrees", "DvorakTriangleRocks", "DvorakTwoColorsFloatingObjects", "DvorakViolinLines", "DvorakViolinTriangles"], function(ScenePackage, CameraService, ColorService, IntersectorTerrain, LightService, MouseService, PoolService, SceneService, StateService, BeginTallPlanes, BubbleBreathe, Chords, CylinderInside, DisplacementTerrain, DoubleColorLines, FloatingGems, GroundConstruction, GroundNotes, MouseFollower, MouseTrailRibbonGroup, ObjectColorSwitcher, Pyramides, SideWalls, SkyLines, SkyPulse, TallLines, Tambours, ToothPick, Tornado, Trees, TriangleRocks, TwoColorsFloatingObjects, ViolinLines, ViolinTriangles) {
  var DvorakPackage;
  DvorakPackage = (function(_super) {
    __extends(DvorakPackage, _super);

    function DvorakPackage(id) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.render = __bind(this.render, this);
      this.timelineStateChanged = __bind(this.timelineStateChanged, this);
      this.init = __bind(this.init, this);
      DvorakPackage.__super__.constructor.call(this, id);
      this.camera = Dvorak.Camera = new CameraService();
      this.light = Dvorak.Light = new LightService();
      this.pooler = Dvorak.Pooler = new PoolService();
      this.scene = Dvorak.Scene = new SceneService();
      this.state = Dvorak.State = new StateService();
      this.color = Dvorak.Color = new ColorService();
      this.mouse = Dvorak.Mouse = new MouseService();
      this.intersector = Dvorak.Intersector = new IntersectorTerrain();
      this.renderer = Renderer.renderer;
    }

    DvorakPackage.prototype.init = function() {
      this.camera.init();
      this.scene.init();
      this.light.init();
      this.pooler.init();
      this.mouse.init();
      this.intersector.init();
      Signal.timelineStateChanged.add(this.timelineStateChanged);
      Signal.captureStarted.add(this.captureStarted);
      Signal.captureDataEnded.add(this.captureDataEnded);
      DvorakPackage.__super__.init.call(this);
    };

    DvorakPackage.prototype.timelineStateChanged = function(state) {
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

    DvorakPackage.prototype.render = function() {
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

    DvorakPackage.prototype.resize = function() {
      Dvorak.Camera.resize();
      DvorakPackage.__super__.resize.call(this);
    };

    DvorakPackage.prototype.destroy = function() {
      Signal.timelineStateChanged.remove(this.timelineStateChanged);
      Signal.captureStarted.remove(this.captureStarted);
      Signal.captureDataEnded.remove(this.captureDataEnded);
      DvorakPackage.__super__.destroy.call(this);
    };

    return DvorakPackage;

  })(ScenePackage);
  return DvorakPackage;
});
