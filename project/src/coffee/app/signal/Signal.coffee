define ["signals"], (signals) ->

    "use strict"
    
    class Signal

        # Notifications

        onResize: new signals.Signal()
        onRouteChanged: new signals.Signal()
        onPartPageTransitionIn: new signals.Signal()
        onPartPageTransitionInCompleted: new signals.Signal()
        onPartPageTransitionOut: new signals.Signal()
        onHomePage: new signals.Signal()

        contactClicked: new signals.Signal()

        constructor: () ->

    return Signal
