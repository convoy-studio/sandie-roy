define(["SoundHelper", "SceneHelper", "Stats", "GUI"], function(SoundHelper, SceneHelper, Stats, GUI) {
  "use strict";
  var DebugManager;
  DebugManager = (function() {
    class DebugManager {
      constructor() {
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        // @initSceneHelper()
        // @initSoundHelper()
        this.initSoundHelper = this.initSoundHelper.bind(this);
        this.initSceneHelper = this.initSceneHelper.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.gui = new dat.GUI();
      }

      init() {
        return this.ready();
      }

      ready() {
        var debugContainer;
        debugContainer = $(".debug-container");
        this.stats = new Stats();
        return debugContainer.append(this.stats.domElement);
      }

      initSoundHelper() {
        this.soundhelper = new SoundHelper();
        return this.soundhelper.init();
      }

      initSceneHelper() {
        var scenehelper;
        scenehelper = new SceneHelper();
        return scenehelper.init();
      }

      onUpdate() {
        if (this.stats != null) {
          this.stats.update();
        }
        if (this.soundhelper != null) {
          return this.soundhelper.onUpdate();
        }
      }

    };

    DebugManager.prototype.gui = void 0;

    DebugManager.prototype.stats = void 0;

    DebugManager.prototype.currentScene = void 0;

    DebugManager.prototype.soundhelper = void 0;

    return DebugManager;

  }).call(this);
  return DebugManager;
});
