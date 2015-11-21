var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["require", "Context", "Browser", "InitialLoadController", "Detector"], function(require, Context, Browser, InitialLoadController, Detector) {
  "use strict";
  var App;
  App = (function() {
    function App() {
      this.appDataCompleted = __bind(this.appDataCompleted, this);
      this.loadAppData = __bind(this.loadAppData, this);
      this.dataCompleted = __bind(this.dataCompleted, this);
      this.loadInitialData = __bind(this.loadInitialData, this);
      this.init = __bind(this.init, this);
      var b;
      b = new Browser().init();
      Model.isDesktop = b.isDesktop;
      Model.browser = b.browser;
      Model.browserVersion = parseInt(b.version, 10);
      Model.isOldBrowser = Model.browser === "Explorer" && Model.browserVersion === 9 ? true : false;
      Model.lang = JS_Lang;
      if (Model.isDesktop) {
        $('html').addClass('is-desktop');
      } else {
        $('html').addClass('is-mobile');
      }
      this.init();
      return;
    }

    App.prototype.init = function() {
      this.loadInitialData();
    };

    App.prototype.loadInitialData = function() {
      var contentUrl, manifest;
      contentUrl = Model.lang + ".json";
      manifest = [
        {
          id: "data",
          src: "data/data.json",
          type: createjs.LoadQueue.JSON
        }, {
          id: "content",
          src: "data/" + contentUrl,
          type: createjs.LoadQueue.JSON
        }
      ];
      Loader.load(manifest, this.dataCompleted);
    };

    App.prototype.dataCompleted = function(e) {
      var c, content, data, pageScope;
      data = Loader.queue.getResult("data");
      c = Loader.queue.getResult("content");
      content = c.global;
      pageScope = c.page;
      Model.pageScope = pageScope;
      Model.content = content;
      Model.parentEl = $(data.initialData.app_parent);
      Model.routing = data.routing;
      this.loadAppData();
    };

    App.prototype.loadAppData = function() {
      var loadController;
      loadController = new InitialLoadController(this.appDataCompleted);
    };

    App.prototype.appDataCompleted = function() {
      var context;
      context = new Context();
    };

    return App;

  })();
  return App;
});
