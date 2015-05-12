var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["SoundHelper", "SceneHelper", "Stats", "GUI"], function(SoundHelper, SceneHelper, Stats, GUI) {
  "use strict";
  var DebugManager;
  DebugManager = (function() {
    DebugManager.prototype.gui = void 0;

    DebugManager.prototype.stats = void 0;

    DebugManager.prototype.currentScene = void 0;

    DebugManager.prototype.soundhelper = void 0;

    function DebugManager() {
      this.onUpdate = __bind(this.onUpdate, this);
      this.initSceneHelper = __bind(this.initSceneHelper, this);
      this.initSoundHelper = __bind(this.initSoundHelper, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      this.gui = new dat.GUI();
    }

    DebugManager.prototype.init = function() {
      return this.ready();
    };

    DebugManager.prototype.ready = function() {
      var debugContainer;
      debugContainer = $(".debug-container");
      this.stats = new Stats();
      return debugContainer.append(this.stats.domElement);
    };

    DebugManager.prototype.initSoundHelper = function() {
      this.soundhelper = new SoundHelper();
      return this.soundhelper.init();
    };

    DebugManager.prototype.initSceneHelper = function() {
      var scenehelper;
      scenehelper = new SceneHelper();
      return scenehelper.init();
    };

    DebugManager.prototype.onUpdate = function() {
      if (this.stats != null) {
        this.stats.update();
      }
      if (this.soundhelper != null) {
        return this.soundhelper.onUpdate();
      }
    };

    return DebugManager;

  })();
  return DebugManager;
});
