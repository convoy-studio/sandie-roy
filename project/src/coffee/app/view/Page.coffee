define ["View", "signals"], (View, signals) ->

    "use strict"
    
    class Page extends View

        transitionInComplete: undefined
        transitionOutComplete: undefined
        tl: undefined
        initCb: undefined

        constructor: (id, scope) ->
            super(id, scope)

        init: (cb)=>
            @initCb = cb
            Signal.onResize.add(@resize)

            @tl = new TimelineMax({onComplete: @transitionInCompleted, onReverseComplete: @transitionOutCompleted})

            @transitionInComplete = new signals.Signal()
            @transitionOutComplete = new signals.Signal()

            TweenMax.delayedCall 0, @ready
            return

        ready: =>
            @initCb()
            return

        addAnimations: =>
            @tl.fromTo(@element, 1, { opacity:0 }, { opacity:1 }, 0)
            @tl.pause(0)
            return

        transitionIn: =>
            @tl.timeScale(1.2)
            @tl.tweenTo(@tl.duration())
            return

        transitionOut: =>
            @continueToTransitionOut()
            return

        continueToTransitionOut: =>
            @tl.timeScale(1.6)
            @tl.tweenTo(0)
            return

        transitionInCompleted: =>
            @transitionInComplete.dispatch()
            return

        transitionOutCompleted: =>
            @transitionOutComplete.dispatch()
            return

        resize: =>

            elementCss = 
                y: Model.windowH
                force3D: true

            TweenMax.set @element, elementCss

            return

        destroy: =>
            super()
            Signal.onResize.remove(@resize)
            @transitionInComplete.removeAll()
            @transitionOutComplete.removeAll()
            @transitionInComplete = null
            @transitionOutComplete = null
            @tl.clear()
            @tl = null
            return

    return Page
