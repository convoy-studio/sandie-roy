define ["View"], (View) ->

    class TimelineMenu extends View

        previews: undefined
        slideDelay: 6
        currentSlide: -1

        constructor: (id, scope) ->
            scope = {}
            scope.previews = Model.routing

            super(id, scope)

        init: =>
            Signal.onPartPageTransitionIn.add @onPartPageTransitionIn
            Signal.onPartPageTransitionOut.add @onPartPageTransitionOut
            Signal.onHomePage.add @onHomePage

            $li = @element.find("li")
            $li.on "mouseenter", @onEnter
            $li.on "mouseleave", @onLeave
            $li.on "click", @onClick

            @items = []
            for item, i in $li
                o = {}
                o.preview = @previews[i]
                $item = $(item)
                $titleTop = $item.find(".title-top")
                $menuTitles = $item.find(".menu-title")
                $lines = $item.find(".line")
                titleW = $titleTop.width()
                titleH = $titleTop.height()

                o.liEl = item
                o.titleW = $titleTop.width()
                o.titleH = $titleTop.height()
                o.titlesHolder = $item.find(".menu-titles-holder")
                o.titles = $menuTitles
                o.lines = $lines

                o.titlesHolder.css
                    width: titleW
                    height: titleH
                $menuTitles.css
                    position: "absolute"

                @items[i] = o

            console.log @items

            @addAnimations()
            @changeSlide()

            return

        addAnimations: =>

            for item, i in @items

                tl = new TimelineMax()
                item.tl = tl
                tl.add "transition-in"
                tl.from item.preview.el, 1, { x:Model.windowW, scaleX:0, transformOrigin:"0% 0%", force3D:true, ease:Expo.easeInOut }, 0
                tl.from item.lines[0], @slideDelay, { scaleX:0, transformOrigin:"0% 0%", force3D:true, ease:Linear.easeNone }, 0
                tl.fromTo item.titles[0], @slideDelay, { clip:@getRect(0, 0, item.titleH, 0) }, { clip:@getRect(0, item.titleW, item.titleH, 0), force3D:true, ease:Linear.easeNone }, 0
                tl.add "transition-out"
                tl.to item.preview.el, 1, { scaleX:0, transformOrigin:"0% 100%", force3D:true, ease:Expo.easeInOut }, "transition-out"
                tl.to item.lines[0], 1, { scaleX:0, transformOrigin:"100% 0%", force3D:true, ease:Expo.easeOut }, "transition-out"
                tl.to item.titles[0], 1, { clip:@getRect(0, item.titleW, item.titleH, item.titleW), force3D:true, ease:Expo.easeOut }, "transition-out"
                tl.add "transition-finished"
                tl.pause(0)

            return

        getRect: (top, right, bottom, left)=>
            return "rect(" + top + "px " + right + "px " + bottom + "px " + left + "px" + ")"

        changeSlide: =>
            @currentSlide += 1
            if @currentSlide > @items.length-1 then @currentSlide = 0
            if @currentSlide < 0 then @currentSlide = @items.length-1

            TweenMax.delayedCall @slideDelay, @changeSlide

            previous = @items[@currentSlide-1]
            next = @items[@currentSlide]

            if !previous?
                previous = @items[@items.length-1]

            TweenMax.delayedCall 0.1, =>
                if previous? then previous.tl.tweenFromTo("transition-out", "transition-finished")
            next.tl.tweenFromTo("transition-in", "transition-out")

            return

        onPartPageTransitionIn: =>
            console.log "onPartPageTransitionIn", Model.newHash
            TweenMax.killDelayedCallsTo @changeSlide
            # for item, i in @items
            #     item.tl.pause(0)
            return

        onPartPageTransitionOut: =>
            console.log "onPartPageTransitionOut", Model.newHash
            return

        onHomePage: =>
            console.log "onHomePage", Model.newHash
            @changeSlide()
            return

        onEnter: (e) =>
            $target = $(e.currentTarget)
            id = $target.attr("id")
            return

        onLeave: (e) =>
            $target = $(e.currentTarget)
            id = $target.attr("id")
            return

        onClick: (e) =>
            $target = $(e.currentTarget)
            id = $target.attr("id")
            Router.sendTo id
            return

        onResize: =>

            # update the x pos value 
            for item, i in @items
                tween = item.tl.getTweensOf(item.preview.el)[1]
                # console.log tween
                tween.vars.x = Model.windowW

            elementCss = 
                left: (Model.windowW >> 1) - (@element.width() >> 1)
                top: Model.windowH - @element.height() - 40

            @element.css elementCss
            return

    return TimelineMenu
