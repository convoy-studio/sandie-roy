define ["View"], (View) ->

    class Slideshow extends View

        isOpened: false

        constructor: (id, scope) ->
            scope = scope || {}
            scope.logo = Loader.getSvg "logo"
            scope.closeIcon = Loader.getSvg "close"
            super(id, scope)

        init: =>
            TweenMax.delayedCall 0.1, @ready

            @itemBaseSize = 
                w: Model.personBaseSize.w * 2
                h: Model.personBaseSize.h * 2
            @mobile = Model.mobile

            return

        ready: =>
            @middleContainer = @element.find(".middle-container")
            $back = @element.find(".back")
            $logo = @element.find(".logo")
            $closeBtn = @element.find(".close-btn")
            @toCloseEl = $closeBtn

            @tl = new TimelineMax({ onComplete:@onComplete, onReverseComplete: @onReverseComplete })
            @tl.from $back, 1, { opacity:0, ease:Expo.easeInOut }, 0
            @tl.from @middleContainer, 1, { opacity:0, force3D:true, transformOrigin: "50% 50%", ease:Expo.easeInOut }, 0.2
            @tl.from $logo, 1, { opacity:0, force3D:true, ease:Expo.easeInOut }, 0.4
            @tl.from $closeBtn, 1, { scale:1.2, opacity:0, force3D:true, ease:Expo.easeInOut }, 0.4
            @tl.pause(0)

            $(window).on "resize", @onResize
            @element.css "display": "none"

            Signal.slideshowOpen.add @onSlideshowOpen
            return

        onSlideshowOpen: (index, items, folderUrl)=>

            @folderUrl = folderUrl
            @currentIndex = index
            @items = items
            $el = $(@getSlideshowRawHTML())
            @middleContainer.html $el

            $items = @middleContainer.find(".item-wrapper")
            for item, i in $items
                @items[i].el = item

            @open()
            return

        getSlideshowRawHTML: =>
            html = ''
            for item in @items
                html += '
                    <div class="item-wrapper btn">
                        <img lazy-src="' + @folderUrl + item.id + ".jpg" + '" src="' + Model.blankImg + '">
                        <div class="down-text">' + item.text + '</div>
                    </div>
                '
            return html

        toggle: =>
            if @isOpened
                @close()
            else 
                @open()
            return

        open: =>
            @isOpened = true
            @element.css
                display: "block"
                opacity: 1
            @onResize()
            @tl.timeScale(1.2).play()
            @tweenItemToIndex(true)
            @element.on "click", @onClicked
            return

        close: =>
            @isOpened = false
            @toCloseEl.off "click", @onCloseClicked
            @tl.timeScale(1.6).reverse()
            @element.off "click", @onClicked
            return

        updateImgSources: =>
            currentItem = @items[@currentIndex]
            previousItem = @items[@currentIndex-1]
            nextItem = @items[@currentIndex+1]
            @switchSrcs(currentItem)
            @switchSrcs(previousItem)
            @switchSrcs(nextItem)
            return

        switchSrcs: (item)=>
            if !item? then return
            $part = $(item.el)
            $imgSrcs = $part.find("img[lazy-src]")
            for imgSrc in $imgSrcs
                src = imgSrc.getAttribute("lazy-src")
                imgSrc.setAttribute("src", src)
            return

        onClicked: (e)=>
            if TweenMax.isTweening @middleContainer then return
            mouse = @getMousePosByClickEvent(e)
            if mouse.x > (Model.windowW >> 1) then @increase() else @decrease()
            @tweenItemToIndex()
            return

        increase: =>
            @currentIndex += 1
            if @currentIndex > @items.length-1
                @currentIndex = 0
            return

        decrease: =>
            @currentIndex -= 1
            if @currentIndex < 0
                @currentIndex = @items.length-1
            return

        tweenItemToIndex: (force)=>
            item = @items[@currentIndex]

            time = if force then 0 else 0.7
            @tween = TweenMax.to @middleContainer, time, { x:item.centerPosX, force3D:true, ease:Expo.easeInOut }
            @updateImgSources()
            return

        onComplete: =>
            @toCloseEl.on "click", @onCloseClicked
            return

        onReverseComplete: =>
            @element.css
                display: "none"
                opacity: 0
            return

        onCloseClicked: =>
            @close()
            return

        getMousePosByClickEvent: (e)=>
            if e.pageX or e.pageY
                x = e.pageX
                y = e.pageY
            else
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
            return {x:x, y:y}

        onResize: =>

            scale = (Model.windowW / 1360) * 1
            scale = Util.Limit 0.5, 1.4, scale
            itemW = @itemBaseSize.w * scale
            itemH = @itemBaseSize.h * scale
            itemRemainW = Model.windowW - itemW
            paddingBetween = (itemRemainW >> 1) - (itemW * 0.1)

            if @items? 
                for item, i in @items
                    itemCss = 
                        width: itemW
                        height: itemH
                        left: (itemW * i) + (paddingBetween * i)

                    item.centerPosX = (Model.windowW >> 1) - (itemCss.left + (itemW >> 1))

                    TweenMax.set item.el, itemCss

                mContainerCss =
                    top: (Model.windowH >> 1) - (itemH >> 1)

                @middleContainer.css mContainerCss

                @tweenItemToIndex(true)
            return

    return Slideshow
