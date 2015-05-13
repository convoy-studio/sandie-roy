var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  var GlobalEvents;
  GlobalEvents = (function() {
    "use strict";
    function GlobalEvents() {
      this.onResizeHandler = __bind(this.onResizeHandler, this);
      this.init = __bind(this.init, this);
    }

    GlobalEvents.prototype.init = function() {
      $(window).resize(this.onResizeHandler);
      this.onResizeHandler();
    };

    GlobalEvents.prototype.onResizeHandler = function() {
      Model.windowW = window.innerWidth;
      Model.windowH = window.innerHeight;
      Signal.onResize.dispatch();
    };

    return GlobalEvents;

  })();
  return GlobalEvents;
});
