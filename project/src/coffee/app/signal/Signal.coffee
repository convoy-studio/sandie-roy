define ["signals"], (signals) ->

    "use strict"
    
    class Signal

        # Notifications

        onResize: new signals.Signal()
        onRouteChanged: new signals.Signal()
        cameraStateChanged: new signals.Signal()
        colorStateChanged: new signals.Signal()
        timelineStateChanged: new signals.Signal()
        pauseContent: new signals.Signal()
        thumbChoosed: new signals.Signal()
        captureUploadCompleted: new signals.Signal()

        # Actions
        captureStarted: new signals.Signal()
        captureDataEnded: new signals.Signal()
        resetExperience: new signals.Signal()
        changeHeaderState: new signals.Signal()
        continuePredefinedEditor: new signals.Signal()
        startNewXPSession: new signals.Signal()

        # Midi Instruments

        instruments: {}

        constructor: () ->

    return Signal
