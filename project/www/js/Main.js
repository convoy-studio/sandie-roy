// Require Config
require.config({
  waitSeconds: 200,
  paths: {
    // Components
    jquery: "../component/jquery/dist/jquery.min",
    signals: "../component/js-signals/dist/signals.min",
    hasher: "../component/hasher/dist/js/hasher.min",
    preloadjs: "../component/createjs-preloadjs/lib/preloadjs-0.4.1.min",
    soundjs: "../component/createjs-soundjs/lib/soundjs-0.5.2.min",
    Mustache: "../component/mustache.js/mustache",
    TweenMax: "../component/greensock/src/minified/TweenMax.min",
    TweenLite: "../component/greensock/src/minified/TweenLite.min",
    SplitText: "../component/greensock/SplitText",
    MouseWheel: "../component/jquery-mousewheel/jquery.mousewheel.min",
    Hammer: "../component/hammer.js/hammer",
    Draggable: "../component/greensock/Draggable",
    ThrowPropsPlugin: "../component/greensock/ThrowPropsPlugin.min",
    Stats: "../lib/stats.min",
    GUI: "../lib/dat.gui.min",
    WheelInerial: "../lib/wheel-inertia",
    // Classes start
    // Generated from updateMain.py
    Main: "Main",
    App: "app/App",
    Context: "app/context/Context",
    Util: "app/util/Util",
    DatEvent: "app/util/DatEvent",
    Detector: "app/util/Detector",
    Browser: "app/util/Browser",
    DatParser: "app/util/DatParser",
    BinLoader: "app/util/BinLoader",
    InitialLoadController: "app/controller/InitialLoadController",
    GlobalController: "app/controller/GlobalController",
    GlobalModel: "app/model/GlobalModel",
    View: "app/view/View",
    Page: "app/view/Page",
    Footer: "app/view/layout/Footer",
    PartsPage: "app/view/layout/PartsPage",
    Header: "app/view/layout/Header",
    About: "app/view/layout/page/About",
    RelationsPubliques: "app/view/layout/page/RelationsPubliques",
    RelationsPresse: "app/view/layout/page/RelationsPresse",
    Home: "app/view/layout/page/Home",
    Production: "app/view/layout/page/Production",
    SubSideMenu: "app/view/layout/module/SubSideMenu",
    VideoLayer: "app/view/layout/module/VideoLayer",
    Contact: "app/view/layout/module/Contact",
    Slideshow: "app/view/layout/module/Slideshow",
    TimelineMenu: "app/view/layout/module/TimelineMenu",
    LoaderService: "app/service/LoaderService",
    SwitcherService: "app/service/SwitcherService",
    RouterService: "app/service/RouterService",
    RendererService: "app/service/RendererService",
    GlobalEvents: "app/event/GlobalEvents",
    Signal: "app/signal/Signal",
    SoundHelper: "app/debug/SoundHelper",
    DebugManager: "app/debug/DebugManager",
    SceneHelper: "app/debug/SceneHelper"
  },
  // Classes end
  shim: {
    TimelineMax: {
      deps: ["TweenMax"],
      exports: "TimelineMax"
    },
    TweenMax: {
      exports: "TweenMax"
    },
    Draggable: {
      deps: ["TweenMax"],
      exports: "Draggable"
    },
    ThrowPropsPlugin: {
      deps: ["TweenMax"],
      exports: "ThrowPropsPlugin"
    },
    preloadjs: {
      exports: "createjs.LoadQueue"
    },
    soundjs: {
      exports: "createjs.Sound"
    },
    signals: {
      exports: "signals"
    },
    hasher: {
      exports: "hasher"
    },
    mustache: {
      exports: "mustache"
    },
    SplitText: {
      deps: ["TweenMax"],
      exports: "SplitText"
    },
    Stats: {
      exports: "Stats"
    }
  }
});

require(["jquery", "App", "LoaderService", "RouterService", "GlobalModel", "GlobalController", "Signal", "Util", "GlobalEvents", "TweenMax", "RendererService", "SwitcherService"], (jquery, App, LoaderService, RouterService, GlobalModel, GlobalController, Signal, Util, GlobalEvents, TweenMax, RendererService, SwitcherService) => {
  var events;
  // Jquery Namespace
  window.jQuery = window.$ = jquery;
  (function() {
    var browserRaf, canceled, i, len, ref, targetTime, vendor, w;
    w = window;
    ref = ['ms', 'moz', 'webkit', 'o'];
    for (i = 0, len = ref.length; i < len; i++) {
      vendor = ref[i];
      if (w.requestAnimationFrame) {
        break;
      }
      w.requestAnimationFrame = w[`${vendor}RequestAnimationFrame`];
      w.cancelAnimationFrame = w[`${vendor}CancelAnimationFrame`] || w[`${vendor}CancelRequestAnimationFrame`];
    }
    // deal with the case where rAF is built in but cAF is not.
    if (w.requestAnimationFrame) {
      if (w.cancelAnimationFrame) {
        return;
      }
      browserRaf = w.requestAnimationFrame;
      canceled = {};
      w.requestAnimationFrame = function(callback) {
        var id;
        return id = browserRaf(function(time) {
          if (id in canceled) {
            return delete canceled[id];
          } else {
            return callback(time);
          }
        });
      };
      return w.cancelAnimationFrame = function(id) {
        return canceled[id] = true;
      };
    } else {
      // handle legacy browsers which don’t implement rAF
      targetTime = 0;
      w.requestAnimationFrame = function(callback) {
        var currentTime;
        targetTime = Math.max(targetTime + 16, currentTime = +(new Date));
        return w.setTimeout((function() {
          return callback(+(new Date));
        }), targetTime - currentTime);
      };
      return w.cancelAnimationFrame = function(id) {
        return clearTimeout(id);
      };
    }
  })();
  // Construct Services and Globals
  // Are 'Singletons' (not exactly) with access from everywhere
  window.Loader = new LoaderService();
  window.Router = new RouterService();
  window.Model = new GlobalModel();
  window.Controller = new GlobalController();
  window.Signal = new Signal();
  window.Util = new Util();
  window.Renderer = new RendererService();
  window.Switcher = new SwitcherService();
  events = new GlobalEvents().init();
  // Starts Application
  return $(() => {
    return new App();
  });
});
