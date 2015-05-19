define ["Page", "signals", "MouseWheel"], (Page, signals, wheel) ->

    "use strict"
    
    class PartsPage extends Page

        currentZIndex: 0
        currentSection: 0
        transitionRunning: false

        constructor: (id, scope) ->
            super(id, scope)

        init: (cb)=>
            super(cb)
            return

        ready: =>
            super()
            @parts = @element.find(".part-holder")
            @currentZIndex = @parts.length-1
            @partsTweens = []
            for part, i in @parts
                o = {}
                o.el = part
                o.tweenTop = undefined
                o.tweenDown = undefined
                o.tweenCenter = undefined
                @partsTweens[i] = o
            return

        transitionIn: =>
            @reArrangeIndex()
            $(window).on 'mousewheel', @onMouseWheel
            super()
            return

        transitionOut: =>
            $(window).off 'mousewheel', @onMouseWheel
            super()
            return

        addAnimations: =>
            @tl.fromTo @element, 0.6, { opacity:0 }, { opacity:1, force3D:true, ease:Expo.easeInOut }, 0
            @tl.fromTo @element, 1, { y:Model.windowH + 10 }, { y:0, force3D:true, ease:Expo.easeInOut }, 0.3
            @tl.pause(0)
            return

        reArrangeIndex: =>
            j = @parts.length-1
            for part, i in @parts
                $part = $(part)
                $part.css
                    "z-index": j
                j -= 1
            return

        onMouseWheel: (e)=>
            e.preventDefault()
            if @transitionRunning then return
            dir = if e.deltaY < 0 then 1 else -1
            @changeSection(dir)
            return

        changeSection: (dir)=>
            @currentSection += dir
            if @currentSection < 0 then @currentSection = @partsTweens.length-1
            if @currentSection > @partsTweens.length-1 then @currentSection = 0
            @transitionRunning = true

            if dir is 1
                inTweenIndex = @currentSection
                outTweenIndex = if @currentSection-1 < 0 then @partsTweens.length-1 else @currentSection-1
            else 
                inTweenIndex = @currentSection
                outTweenIndex = if @currentSection+1 > @partsTweens.length-1 then 0 else @currentSection+1

            if dir is 1
                inEl = @partsTweens[inTweenIndex].el
                outEl = @partsTweens[outTweenIndex].el
                outEl.style.zIndex = 4
                inEl.style.zIndex = 5
                TweenMax.fromTo outEl, 1, { y:0 }, { y:Model.windowH, force3D:true, ease:Expo.easeInOut }
                TweenMax.fromTo inEl, 1, { y:Model.windowH }, { y:0, force3D:true, ease:Expo.easeOut, onComplete: =>
                    @transitionRunning = false
                }
            else
                inEl = @partsTweens[inTweenIndex].el
                outEl = @partsTweens[outTweenIndex].el
                outEl.style.zIndex = 4
                inEl.style.zIndex = 5
                TweenMax.fromTo outEl, 1, { y:0 }, { y:-Model.windowH, force3D:true, ease:Expo.easeInOut }
                TweenMax.fromTo inEl, 1, { y:-Model.windowH }, { y:0, force3D:true, ease:Expo.easeOut, onComplete: =>
                    @transitionRunning = false
                }

            return

        resize: =>

            baseLineNum = 3
            basePhotoH = 670
            maxVisualH = 1020
            offset = 50

            for photo in @photoParts
                paragraphH = photo.paragraphEl.clientHeight
                titleH = photo.titleEl.clientHeight
                paragraphFontSize = parseInt $(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, '')
                paragraphLineNum = parseInt paragraphH / paragraphFontSize
                moreLines = paragraphLineNum - baseLineNum
                visualH = basePhotoH - (moreLines * paragraphFontSize)
                visualH = (Model.windowH / maxVisualH) * visualH
                visualH -= offset + 60
                visualY = (Model.windowH >> 1) - (visualH >> 1) + offset - 20
                titleY = (visualY >> 1) - (titleH >> 1) + offset
                bottomVisualPos = visualY + visualH
                paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1)

                photo.visualContainerEl.style.height = visualH + "px"
                photo.visualContainerEl.style.top = visualY + "px"
                photo.titleEl.style.top = titleY + "px"
                photo.paragraphEl.style.top = paragraphY + "px"

            partHolderCss =  
                width: Model.windowW
                height: Model.windowH

            @partHolders.css partHolderCss

            # bottomContainerH = @partHolders.length * Model.windowH
            bottomContainerH = 0
            Model.parentEl.css
                height: bottomContainerH

            return

        destroy: =>
            super()
            return

    return PartsPage
