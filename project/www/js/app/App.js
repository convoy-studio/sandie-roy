define(["require", "Context", "Browser", "InitialLoadController", "Detector"], function(require, Context, Browser, InitialLoadController, Detector) {
  "use strict";
  var App;
  App = class App {
    constructor() {
      var b;
      this.init = this.init.bind(this);
      this.loadInitialData = this.loadInitialData.bind(this);
      this.dataCompleted = this.dataCompleted.bind(this);
      this.loadAppData = this.loadAppData.bind(this);
      this.appDataCompleted = this.appDataCompleted.bind(this);
      // Browser configs
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
      // Model.isDesktop = false
      this.init();
      return;
    }

    init() {
      this.loadInitialData();
    }

    loadInitialData() {
      var contentUrl, manifest;
      contentUrl = Model.lang + ".json";
      manifest = [
        {
          id: "data",
          src: "data/data.json",
          type: createjs.LoadQueue.JSON
        },
        {
          id: "content",
          src: "data/" + contentUrl,
          type: createjs.LoadQueue.JSON
        }
      ];
      Loader.load(manifest, this.dataCompleted);
    }

    dataCompleted(e) {
      var c, content, data, pageScope;
      // Global Content
      data = Loader.queue.getResult("data");
      c = Loader.queue.getResult("content");
      content = c.global;
      pageScope = c.page;
      Model.pageScope = pageScope;
      Model.content = content;
      Model.parentEl = $(data.initialData.app_parent);
      Model.routing = data.routing;
      this.loadAppData();
    }

    loadAppData() {
      var loadController;
      loadController = new InitialLoadController(this.appDataCompleted);
    }

    appDataCompleted() {
      var context;
      context = new Context();
    }

  };
  return App;
});
