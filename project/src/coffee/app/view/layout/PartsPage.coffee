define ["Page", "signals", "MouseWheel", "SubSideMenu", "WheelInerial"], (Page, signals, wheel, SubSideMenu, wi) ->

    "use strict"
    
    class PartsPage extends Page

        transitionRunning: false
        currentSection: 0
        baseLineNum: 3
        basePhotoW: 1400
        basePhotoH: 934
        photoOffset: 60

        constructor: (id, scope) ->
            scope.blankImg = Model.blankImg
            super(id, scope)

        init: (cb)=>
            super(cb)
            return

        ready: =>
            super()

            @parts = @element.find(".part-holder")
            @partsTweens = []
            for part, i in @parts
                o = {}
                o.el = part
                @partsTweens[i] = o

            if Model.isDesktop is true
                subSideScope = {num:@partsTweens.length}
                @subSideMenu = new SubSideMenu("sub-side-menu", subSideScope)
                @element.parent().append @subSideMenu.element
                @subSideMenu.onSideMenuClicked = @onSideMenuClicked
                @subSideMenu.init()

            @allCenteredHolders = @element.find(".part-holder .centered-holder")
            @allVisualParents = @element.find(".part-holder .visual-parent")

            @updateImgSources()

            if Model.isDesktop is true
                @inertia = new WheelInertia()
                @inertia.addCallback(@onWheelInertia)

            if Model.isDesktop is false
                allTitles = @element.find(".part-holder .title")
                allCenteredParagraph = @element.find(".part-holder.part-photo>div")
                accordionWrapper = @element.find(".part-holder .accordion-wrapper-title")

                allTitles.css 'color', "black"
                allCenteredParagraph.css 'position', 'relative'
                accordionWrapper.css 'top', 0

            return

        transitionIn: =>
            $(window).on 'mousewheel', @onMouseWheel
            if Model.isDesktop is false then @updateAllImgSources()
            super()
            return

        transitionOut: =>
            $(window).off 'mousewheel', @onMouseWheel
            super()
            return

        addAnimations: =>
            @tl.fromTo @element, 0.6, { opacity:0 }, { opacity:1, force3D:true, ease:Expo.easeInOut }, 0
            @tl.fromTo @element, 1, { y:Model.windowH + 10 }, { y:0, force3D:true, ease:Expo.easeInOut }, 0.3
            if Model.isDesktop is true then @tl.to @subSideMenu.element, 1, { x:40, force3D:true, ease:Expo.easeInOut }, 1
            @tl.pause(0)
            return

        increaseSectionIndex: =>
            @currentSection += 1
            return

        decreaseSectionIndex: =>
            @currentSection -= 1
            return

        onMouseWheel: (e)=>
            if @transitionRunning then return
            if Model.isDesktop is false then return
            e.preventDefault()
            delta = e.deltaY
            @inertia.update(delta)
            return

        onWheelInertia: (direction)=>
            if Model.isDesktop is false then return
            if direction < 0 then @increaseSectionIndex() else @decreaseSectionIndex()
            @changeSection()
            return

        changeSection: =>
            # if @currentSection < 0 then @currentSection = @partsTweens.length-1
            # if @currentSection > @partsTweens.length-1 then @currentSection = 0
            @transitionRunning = true

            if @currentSection < 0
                @currentSection = 0
                @launchBounceForceTween(0)
            else if @currentSection > @partsTweens.length-1
                @currentSection = @partsTweens.length-1
                @launchBounceForceTween(@currentPageYPos)
            else
                TweenMax.to @element, 0.8, { y:-Model.windowH * @currentSection, force3D:true, ease:Expo.easeInOut }

            @runScrollDelayedCall()
            @currentPageYPos = -Model.windowH * @currentSection
            @subSideMenu.updateMenu(@currentSection)

            @updateImgSources()

            return

        updateImgSources: =>
            currentItem = @parts[@currentSection]
            previousItem = @parts[@currentSection-1]
            nextItem = @parts[@currentSection+1]
            Util.SwitchImgLazySrcs(currentItem)
            Util.SwitchImgLazySrcs(previousItem)
            Util.SwitchImgLazySrcs(nextItem)
            return

        updateAllImgSources: =>
            for part in @parts
                Util.SwitchImgLazySrcs(part)
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
            TweenMax.delayedCall 0.6, @activateScroll
            return

        activateScroll: =>
            @transitionRunning = false
            return

        resizePartsHolder: => 
            for part, i in @partHolders
                $part = $(part)
                partHolderCss =  
                    top: Model.windowH * i
                    width: Model.windowW
                    height: Model.windowH

                if Model.isDesktop is false
                    partCss = 
                        position: "relative"
                        overflow: "visible"
                        margin: "40px 0"
                    if i is 0 then partCss['margin-top'] = Model.windowH * 0.2
                    $part.css partCss
                else
                    $part.css partHolderCss

            if Model.isDesktop is false
                @element.css
                    position: "relative"

                for holder in @allCenteredHolders
                    $holder = $(holder)
                    $holder.css
                        position: 'relative'

                for visual in @allVisualParents
                    $visual = $(visual)
                    $visual.css
                        position: 'relative'
            return

        positionCurrentSection: =>
            TweenMax.set @element, { y:-@currentSection*Model.windowH, force3D:true }
            return

        resizePhotoParts: =>
            scale = (Model.windowH / @basePhotoW) * 1
            for photo in @photoParts
                paragraphH = photo.paragraphEl.clientHeight
                titleH = photo.titleEl.clientHeight

                paragraphFontSize = parseInt $(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, '')
                paragraphLineNum = parseInt paragraphH / paragraphFontSize
                moreLines = paragraphLineNum - @baseLineNum

                photoH = @basePhotoH * scale
                photoW = @basePhotoW * scale
                visualH = photoH
                visualX = (Model.windowW >> 1) - (photoW >> 1)
                visualY = if Model.windowH < @basePhotoH then 100 else (Model.windowH >> 1) - (photoH >> 1) - @photoOffset
                titleY = ((visualY) + (visualH >> 1) - (titleH >> 1))
                bottomVisualPos = visualY + photoH
                paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1)

                if Model.isDesktop is true
                    TweenMax.set photo.visualContainerEl, { scale:scale, force3D: true, transformOrigin:"0% 0%" }
                    photo.visualContainerEl.style.left = visualX + "px"
                    photo.visualContainerEl.style.top = visualY + "px"
                    photo.titleEl.style.top = titleY + "px"
                    photo.paragraphEl.style.top = paragraphY + "px"
                else
                    photo.visualContainerEl.style.width = "100%"
                    photo.visualContainerEl.style.height = "auto"

                    # mobileVisualH = $(photo.visualContainerEl).height()
                    # photo.titleEl.style.top = (mobileVisualH >> 1) + ($(photo.titleEl).height() >> 1) + "px"

            return

        resize: =>
            @resizePartsHolder()
            @positionCurrentSection()
            @resizePhotoParts()
            if Model.isDesktop is true then @subSideMenu.resize()
            return

        destroy: =>
            if Model.isDesktop is true then @subSideMenu.destroy()
            super()
            return

    return PartsPage
