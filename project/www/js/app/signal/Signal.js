define(["signals"], function(signals) {
  "use strict";
  var Signal;
  Signal = (function() {
    class Signal {
      constructor() {}

    };

    // Notifications
    Signal.prototype.onResize = new signals.Signal();

    Signal.prototype.onRouteChanged = new signals.Signal();

    Signal.prototype.onPartPageTransitionIn = new signals.Signal();

    Signal.prototype.onPartPageTransitionInCompleted = new signals.Signal();

    Signal.prototype.onPartPageTransitionOut = new signals.Signal();

    Signal.prototype.onHomePage = new signals.Signal();

    Signal.prototype.contactClicked = new signals.Signal();

    Signal.prototype.slideshowOpen = new signals.Signal();

    Signal.prototype.slideshowClose = new signals.Signal();

    return Signal;

  }).call(this);
  return Signal;
});
