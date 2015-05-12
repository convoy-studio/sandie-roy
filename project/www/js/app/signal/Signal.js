define(["signals"], function(signals) {
  "use strict";
  var Signal;
  Signal = (function() {
    Signal.prototype.onResize = new signals.Signal();

    Signal.prototype.onRouteChanged = new signals.Signal();

    Signal.prototype.cameraStateChanged = new signals.Signal();

    Signal.prototype.colorStateChanged = new signals.Signal();

    Signal.prototype.timelineStateChanged = new signals.Signal();

    Signal.prototype.pauseContent = new signals.Signal();

    Signal.prototype.thumbChoosed = new signals.Signal();

    Signal.prototype.captureUploadCompleted = new signals.Signal();

    Signal.prototype.captureStarted = new signals.Signal();

    Signal.prototype.captureDataEnded = new signals.Signal();

    Signal.prototype.resetExperience = new signals.Signal();

    Signal.prototype.changeHeaderState = new signals.Signal();

    Signal.prototype.continuePredefinedEditor = new signals.Signal();

    Signal.prototype.startNewXPSession = new signals.Signal();

    Signal.prototype.instruments = {};

    function Signal() {}

    return Signal;

  })();
  return Signal;
});
