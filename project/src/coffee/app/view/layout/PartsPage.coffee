define ["Page", "signals", "MouseWheel", "Hammer", "SubSideMenu"], (Page, signals, wheel, Hammer, SubSideMenu) ->

    "use strict"
    
    class PartsPage extends Page

        transitionRunning: false
        currentSection: 0

        constructor: (id, scope) ->
            super(id, scope)

        init: (cb)=>
            super(cb)
            return

        ready: =>
            super()

            @hammertime.get("swipe").set
                direction: Hammer.DIRECTION_VERTICAL
                threshold: 5
                velocity: 0.5
            @hammertime.on "swipeup swipedown", @onSwipe

            @parts = @element.find(".part-holder")
            @partsTweens = []
            for part, i in @parts
                o = {}
                o.el = part
                @partsTweens[i] = o

            subSideScope = {num:@partsTweens.length}
            @subSideMenu = new SubSideMenu("sub-side-menu", subSideScope)
            @element.parent().append @subSideMenu.element
            @subSideMenu.onSideMenuClicked = @onSideMenuClicked
            @subSideMenu.init()

            return

        transitionIn: =>
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
            @tl.to @subSideMenu.element, 1, { x:40, force3D:true, ease:Expo.easeInOut }, 1
            @tl.pause(0)
            return

        onSwipe: (e)=>
            e.preventDefault()
            switch e.type
                when "swipeup"
                    @increaseSectionIndex()
                    break
                when "swipedown"
                    @decreaseSectionIndex()
                    break
            @changeSection()    
            return

        increaseSectionIndex: =>
            @currentSection += 1
            return

        decreaseSectionIndex: =>
            @currentSection -= 1
            return

        onMouseWheel: (e)=>
            e.preventDefault()
            if @transitionRunning then return
            if e.deltaY < 0 then @increaseSectionIndex() else @decreaseSectionIndex()
            @changeSection()
            return

        changeSection: =>
            # if @currentSection < 0 then @currentSection = @partsTweens.length-1
            # if @currentSection > @partsTweens.length-1 then @currentSection = 0
            @transitionRunning = true

            if @currentSection < 0
                @currentSection = 0
                @launchBounceForceTween(0)
                @runScrollDelayedCall()
            else if @currentSection > @partsTweens.length-1
                @currentSection = @partsTweens.length-1
                @launchBounceForceTween(@currentPageYPos)
                @runScrollDelayedCall()
            else
                @runScrollDelayedCall()
                TweenMax.to @element, 0.8, { y:-Model.windowH * @currentSection, force3D:true, ease:Expo.easeInOut }

            @currentPageYPos = -Model.windowH * @currentSection
            @subSideMenu.updateMenu(@currentSection)

            return

        onSideMenuClicked: (index)=>
            @currentSection = index
            @changeSection()
            return

        launchBounceForceTween: (yPos)=>
            offset = 40
            TweenMax.to @element, 0.4, { y:yPos - offset, force3D:true, ease:Expo.easeOut }
            TweenMax.to @element, 0.4, { delay:0.2, y:yPos, force3D:true, ease:Back.easeOut}
            return

        runScrollDelayedCall: =>
            TweenMax.killDelayedCallsTo @activateScroll
            TweenMax.delayedCall 1.2, @activateScroll
            return

        activateScroll: =>
            @transitionRunning = false
            return

        resize: =>

            baseLineNum = 3
            basePhotoW = 1400
            basePhotoH = 934
            offset = 60

            for part, i in @partHolders
                $part = $(part)
                partHolderCss =  
                    top: Model.windowH * i
                    width: Model.windowW
                    height: Model.windowH
                $part.css partHolderCss

            bottomContainerH = 0
            Model.parentEl.css
                height: bottomContainerH

            TweenMax.set @element, { y:-@currentSection*Model.windowH, force3D:true }

            scale = (Model.windowH / basePhotoW) * 1
            ratio = Model.windowW / Model.windowH

            for photo in @photoParts
                paragraphH = photo.paragraphEl.clientHeight
                titleH = photo.titleEl.clientHeight

                paragraphFontSize = parseInt $(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, '')
                paragraphLineNum = parseInt paragraphH / paragraphFontSize
                moreLines = paragraphLineNum - baseLineNum

                photoH = basePhotoH * scale
                photoW = basePhotoW * scale
                visualH = photoH
                visualX = (Model.windowW >> 1) - (photoW >> 1)
                visualY = if Model.windowH < basePhotoH then 100 else (Model.windowH >> 1) - (photoH >> 1) - offset
                titleY = ((visualY) + (visualH >> 1) - (titleH >> 1))
                bottomVisualPos = visualY + photoH
                paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1)

                TweenMax.set photo.visualContainerEl, { scale:scale, force3D: true, transformOrigin:"0% 0%" }
                photo.visualContainerEl.style.left = visualX + "px"
                photo.visualContainerEl.style.top = visualY + "px"
                photo.titleEl.style.top = titleY + "px"
                photo.paragraphEl.style.top = paragraphY + "px"

            @subSideMenu.resize()

            return

        destroy: =>
            @subSideMenu.destroy()
            super()
            return

    return PartsPage
