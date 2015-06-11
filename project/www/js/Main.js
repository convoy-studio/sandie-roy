var _this = this;

require.config({
  waitSeconds: 200,
  paths: {
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
    Main: "Main",
    App: "app/App",
    Context: "app/context/Context",
    GlobalController: "app/controller/GlobalController",
    InitialLoadController: "app/controller/InitialLoadController",
    DebugManager: "app/debug/DebugManager",
    SceneHelper: "app/debug/SceneHelper",
    SoundHelper: "app/debug/SoundHelper",
    GlobalEvents: "app/event/GlobalEvents",
    GlobalModel: "app/model/GlobalModel",
    LoaderService: "app/service/LoaderService",
    RendererService: "app/service/RendererService",
    RouterService: "app/service/RouterService",
    SwitcherService: "app/service/SwitcherService",
    Signal: "app/signal/Signal",
    BinLoader: "app/util/BinLoader",
    Browser: "app/util/Browser",
    DatEvent: "app/util/DatEvent",
    DatParser: "app/util/DatParser",
    Detector: "app/util/Detector",
    Util: "app/util/Util",
    Page: "app/view/Page",
    View: "app/view/View",
    Footer: "app/view/layout/Footer",
    Header: "app/view/layout/Header",
    PartsPage: "app/view/layout/PartsPage",
    Contact: "app/view/layout/module/Contact",
    Slideshow: "app/view/layout/module/Slideshow",
    SubSideMenu: "app/view/layout/module/SubSideMenu",
    TimelineMenu: "app/view/layout/module/TimelineMenu",
    VideoLayer: "app/view/layout/module/VideoLayer",
    About: "app/view/layout/page/About",
    Home: "app/view/layout/page/Home",
    Production: "app/view/layout/page/Production",
    RelationsPresse: "app/view/layout/page/RelationsPresse",
    RelationsPubliques: "app/view/layout/page/RelationsPubliques"
  },
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

require(["jquery", "App", "LoaderService", "RouterService", "GlobalModel", "GlobalController", "Signal", "Util", "GlobalEvents", "TweenMax", "RendererService", "SwitcherService"], function(jquery, App, LoaderService, RouterService, GlobalModel, GlobalController, Signal, Util, GlobalEvents, TweenMax, RendererService, SwitcherService) {
  var events;
  window.jQuery = window.$ = jquery;
  (function() {
    var browserRaf, canceled, targetTime, vendor, w, _i, _len, _ref;
    w = window;
    _ref = ['ms', 'moz', 'webkit', 'o'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vendor = _ref[_i];
      if (w.requestAnimationFrame) {
        break;
      }
      w.requestAnimationFrame = w["" + vendor + "RequestAnimationFrame"];
      w.cancelAnimationFrame = w["" + vendor + "CancelAnimationFrame"] || w["" + vendor + "CancelRequestAnimationFrame"];
    }
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
  window.Loader = new LoaderService();
  window.Router = new RouterService();
  window.Model = new GlobalModel();
  window.Controller = new GlobalController();
  window.Signal = new Signal();
  window.Util = new Util();
  window.Renderer = new RendererService();
  window.Switcher = new SwitcherService();
  events = new GlobalEvents().init();
  return $(function() {
    return new App();
  });
});
