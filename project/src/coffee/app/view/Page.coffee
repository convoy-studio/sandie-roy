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
            # console.log "transitionOutCompleted", Model.newHash
            @transitionOutComplete.dispatch()
            return

        resize: =>
            return

        destroy: =>
            console.log "destroy"
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
