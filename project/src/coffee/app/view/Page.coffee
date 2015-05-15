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
            @transitionOutComplete.dispatch()
            return

        resize: =>

            baseLineNum = 3
            basePhotoH = 670
            maxVisualH = 1020

            for photo in @photoParts
                paragraphH = photo.paragraphEl.clientHeight
                titleH = photo.titleEl.clientHeight
                paragraphFontSize = parseInt $(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, '')
                paragraphLineNum = parseInt paragraphH / paragraphFontSize
                moreLines = paragraphLineNum - baseLineNum
                visualH = basePhotoH - (moreLines * paragraphFontSize)
                visualH = (Model.windowH / maxVisualH) * visualH
                visualY = (Model.windowH >> 1) - (visualH >> 1) - 40
                titleY = (visualY >> 1) - (titleH >> 1)
                bottomVisualPos = visualY + visualH
                paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1)

                photo.visualContainerEl.style.height = visualH + "px"
                photo.visualContainerEl.style.top = visualY + "px"
                photo.titleEl.style.top = titleY + "px"
                photo.paragraphEl.style.top = paragraphY + "px"

            partHolderCss =  
                width: Model.windowW
                height: Model.windowH

            elementCss = 
                top: Model.windowH

            @partHolders.css partHolderCss
            @element.css elementCss

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
