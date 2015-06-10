define ["View", "signals", "Hammer"], (View, signals, Hammer) ->

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
            @hammertime = new Hammer(@element.get(0))

            @partHolders = @element.find(".part-holder")

            $photoParts = @element.find(".part-photo")
            @photoParts = []
            for photoPart, i in $photoParts
                $photoPart = $(photoPart)
                p = {}
                p.el = $photoPart.get(0) 
                p.align = if Util.IsEven(i) then "left" else "right"
                $photoPart.addClass p.align
                p.titleEl = $photoPart.find(".title").parent().get(0)
                p.visualContainerEl = $photoPart.find(".visual-container").get(0)
                p.paragraphEl = $photoPart.find(".paragraph").parent().get(0)
                @photoParts.push p

            @centeredHolder = @element.find(".centered-holder")
            @initCb()

            return

        addAnimations: =>
            @tl.fromTo @element, 1, { opacity:0 }, { opacity:1, ease:Expo.easeInOut }, 0
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

            if Model.windowW > 901
                @centeredHolder.css
                    "margin-left": -(@centeredHolder.width() >> 1)
            else
                @centeredHolder.css
                    "margin-left": 0

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
