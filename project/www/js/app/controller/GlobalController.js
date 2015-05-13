var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["Header", "Footer", "hasher", "TopContainer"], function(Header, Footer, hasher, TopContainer) {
  "use strict";
  var GlobalController;
  GlobalController = (function() {
    function GlobalController() {
      this.startRouting = __bind(this.startRouting, this);
      this.setupRenderer = __bind(this.setupRenderer, this);
      this.setupViews = __bind(this.setupViews, this);
    }

    GlobalController.prototype.setupViews = function() {
      var header, topContainer;
      header = new Header("header");
      Model.parentEl.append(header.element);
      header.init();
      Model.parentEl.append("<div id='main-container'>");
      Model.mainEl = Model.parentEl.find("#main-container");
      Model.mainEl.append("<div id='top-static-container'>");
      Model.topEl = Model.mainEl.find("#top-static-container");
      topContainer = new TopContainer("top-container");
      Model.topEl.append(topContainer.element);
      topContainer.element = Model.topEl;
      topContainer.init();
    };

    GlobalController.prototype.setupRenderer = function() {
      Renderer.init();
    };

    GlobalController.prototype.startRouting = function() {
      Router.configHasher();
    };

    return GlobalController;

  })();
  return GlobalController;
});
