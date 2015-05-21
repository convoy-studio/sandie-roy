define ["View"], (View) ->

    class Contact extends View

        isOpened: false

        constructor: (id, scope) ->
            scope.logo = Loader.getSvg "logo"
            scope.closeIcon = Loader.getSvg "close"
            super(id, scope)

        init: =>
            TweenMax.delayedCall 0.1, @ready
            return

        ready: =>
            @middleContainer = @element.find(".middle-container")
            $back = @element.find(".back")
            $logo = @element.find(".logo")
            $closeBtn = @element.find(".close-btn")
            @toCloseEl = @element.find(".close-btn, .back")

            @tl = new TimelineMax({ onComplete:@onComplete, onReverseComplete: @onReverseComplete })
            @tl.from $back, 1, { opacity:0, ease:Expo.easeInOut }, 0
            @tl.from @middleContainer, 1, { scale:1.2, opacity:0, force3D:true, ease:Expo.easeInOut }, 0.2
            @tl.from $logo, 1, { opacity:0, force3D:true, ease:Expo.easeInOut }, 0.4
            @tl.from $closeBtn, 1, { scale:1.2, opacity:0, force3D:true, ease:Expo.easeInOut }, 0.4
            @tl.pause(0)

            $(window).on "resize", @onResize
            @onResize()

            @element.css "display": "none"

            Signal.contactClicked.add @contactClicked
            return

        contactClicked: =>
            @toggle()
            return

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
            @tl.timeScale(1.2).play()
            return

        close: =>
            @isOpened = false
            @toCloseEl.off "click", @onCloseClicked
            @tl.timeScale(1.6).reverse()
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

        onResize: =>
            
            mContainerCss =
                left: (Model.windowW >> 1) - (@middleContainer.width() >> 1)
                top: (Model.windowH >> 1) - (@middleContainer.height() >> 1)

            @middleContainer.css mContainerCss
            return

    return Contact
