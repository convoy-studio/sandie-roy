define(["signals"], function(signals) {
  "use strict";
  var Signal;
  Signal = (function() {
    Signal.prototype.onResize = new signals.Signal();

    Signal.prototype.onRouteChanged = new signals.Signal();

    Signal.prototype.onPartPageTransitionIn = new signals.Signal();

    Signal.prototype.onPartPageTransitionInCompleted = new signals.Signal();

    Signal.prototype.onPartPageTransitionOut = new signals.Signal();

    Signal.prototype.onHomePage = new signals.Signal();

    Signal.prototype.onColorStateChanged = new signals.Signal();

    Signal.prototype.contactClicked = new signals.Signal();

    function Signal() {}

    return Signal;

  })();
  return Signal;
});
