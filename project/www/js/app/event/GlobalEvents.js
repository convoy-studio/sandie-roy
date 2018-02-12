define([], function() {
  var GlobalEvents;
  GlobalEvents = (function() {
    "use strict";
    class GlobalEvents {
      constructor() {
        this.init = this.init.bind(this);
        this.onResizeHandler = this.onResizeHandler.bind(this);
      }

      init() {
        $(window).resize(this.onResizeHandler);
        this.onResizeHandler();
      }

      onResizeHandler() {
        Model.windowW = window.innerWidth;
        Model.windowH = window.innerHeight;
        Signal.onResize.dispatch();
      }

    };

    return GlobalEvents;

  }).call(this);
  return GlobalEvents;
});
