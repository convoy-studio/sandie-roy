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
      var footer, header;
      header = new Header("header");
      Model.parentEl.append(header.element);
      header.init();
      Model.parentEl.append("<div id='interface-container'>");
      Model.interfaceEl = Model.parentEl.find("#interface-container");
      footer = new Footer("footer");
      Model.parentEl.append(footer.element);
      footer.init();
    };

    GlobalController.prototype.setupRenderer = function() {
      Renderer.init();
    };

    GlobalController.prototype.startRouting = function() {
      Router.setupRouting();
      Router.configHasher();
    };

    return GlobalController;

  })();
  return GlobalController;
});
