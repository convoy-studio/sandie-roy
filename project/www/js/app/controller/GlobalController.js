var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["Header", "Footer", "hasher"], function(Header, Footer, hasher) {
  "use strict";
  var GlobalController;
  GlobalController = (function() {
    function GlobalController() {
      this.startRouting = __bind(this.startRouting, this);
      this.setupRenderer = __bind(this.setupRenderer, this);
      this.setupViews = __bind(this.setupViews, this);
    }

    GlobalController.prototype.setupViews = function() {
      var header;
      header = new Header("header");
      Model.parentEl.append(header.element);
      header.init();
      Model.parentEl.append("<div id='main-container'>");
      Model.mainEl = Model.parentEl.find("#main-container");
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
