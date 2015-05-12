var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  var GlobalEvents;
  GlobalEvents = (function() {
    "use strict";
    function GlobalEvents() {
      this.onMouseMoveHandler = __bind(this.onMouseMoveHandler, this);
      this.onResizeHandler = __bind(this.onResizeHandler, this);
      this.init = __bind(this.init, this);
    }

    GlobalEvents.prototype.init = function() {
      $(window).resize(this.onResizeHandler);
      $(window).on("mousemove", this.onMouseMoveHandler);
      return this.onResizeHandler();
    };

    GlobalEvents.prototype.onResizeHandler = function() {
      Model.windowW = window.innerWidth;
      Model.windowH = window.innerHeight;
      return Signal.onResize.dispatch();
    };

    GlobalEvents.prototype.onMouseMoveHandler = function(e) {
      e.preventDefault();
      Model.mouseX = e.pageX;
      return Model.mouseY = e.pageY;
    };

    return GlobalEvents;

  })();
  return GlobalEvents;
});
