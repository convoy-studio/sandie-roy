define ["View"], (View) ->

    class TimelineMenu extends View

        previews: undefined
        slideDelay: 4
        currentSlide: -1
        firstLoad: true

        constructor: (id, scope) ->
            scope = {}
            scope.previews = Model.routing.slice(0, Model.routing.length-1)

            super(id, scope)

        init: =>
            TweenMax.delayedCall 0.1, @ready
            return

        ready: =>
            @li = @element.find("li")
            @li.on "mouseenter", @onEnter
            @li.on "mouseleave", @onLeave
            @li.on "click", @onClick

            @titlesLinesTop = $("#timeline-menu-view .menu-title, #timeline-menu-view .line")
            @slideTitles = $(".pages-preview-container .title")

            @items = []
            for item, i in @li
                o = {}
                o.preview = @previews[i]
                $item = $(item)
                $titleTop = $item.find(".title-top")
                $menuTitles = $item.find(".menu-title")
                $lines = $item.find(".line")
                titleW = $titleTop.width()
                titleH = $titleTop.height()

                o.color = o.preview.el.getAttribute("color")
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

            
            @addAnimations()
            @changeSlide()
            # @onResize()

            return

        addAnimations: =>

            for item, i in @items

                tl = new TimelineMax()
                item.tl = tl

                elInTween = TweenMax.from item.preview.el, 1, { x:Model.windowW, scaleX:0.6, transformOrigin:"0% 0%", force3D:true, ease:Expo.easeInOut }
                elOutTween = TweenMax.to item.preview.el, 1, { x:-Model.windowW, transformOrigin:"0% 100%", force3D:true, ease:Expo.easeInOut }

                item.elInTween = elInTween
                item.elOutTween = elOutTween

                tl.add "transition-in"
                tl.add elInTween, 0
                tl.from item.lines[0], @slideDelay, { scaleX:0, transformOrigin:"0% 0%", force3D:true, ease:Linear.easeNone }, 0
                tl.from item.lines[1], @slideDelay, { scaleX:0, transformOrigin:"0% 0%", force3D:true, ease:Linear.easeNone }, 0
                tl.fromTo item.titles[0], @slideDelay, { clip:@getRect(0, 0, item.titleH, 0) }, { clip:@getRect(0, item.titleW, item.titleH, 0), force3D:true, ease:Linear.easeNone }, 0
                tl.add "transition-out"
                tl.add elOutTween, "transition-out"
                tl.to item.lines[0], 1, { scaleX:0, transformOrigin:"100% 0%", force3D:true, ease:Expo.easeOut }, "transition-out"
                tl.to item.lines[1], 1, { scaleX:0, transformOrigin:"100% 0%", force3D:true, ease:Expo.easeOut }, "transition-out"
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

            previous = @items[@currentSlide-1]
            next = @items[@currentSlide]

            @updateColorState next.color

            if !previous?
                previous = @items[@items.length-1]

            if @firstLoad
                previous.tl.pause("transition-finished")
                next.tl.pause("transition-out")
                TweenMax.delayedCall @slideDelay*0.5, @changeSlide
            else
                TweenMax.delayedCall 0.1, =>
                    if previous? then previous.tl.tweenFromTo("transition-out", "transition-finished")
                next.tl.tweenFromTo("transition-in", "transition-out")
                TweenMax.delayedCall @slideDelay, @changeSlide

            @firstLoad = false

            return

        updateColorState: (color)=>
            Model.colorState = color

            switch color
                when "white"
                    @titlesLinesTop.addClass("black")
                    @slideTitles.addClass("black")
                    break
                when "black"
                    @titlesLinesTop.removeClass("black")
                    @slideTitles.removeClass("black")
                    break

            Signal.onColorStateChanged.dispatch()
            return

        onEnter: (e) =>
            e.preventDefault()
            $target = $(e.currentTarget)
            id = $target.attr("id")
            return

        onLeave: (e) =>
            e.preventDefault()
            $target = $(e.currentTarget)
            id = $target.attr("id")
            return

        onClick: (e) =>
            e.preventDefault()
            $target = $(e.currentTarget)
            id = $target.attr("id")
            Router.sendTo id
            return

        onResize: =>

            # if @items?
            #     # update the x pos value 
            #     for item, i in @items
            #         item.elInTween.updateTo {x:Model.windowW}, true
            #         item.elOutTween.updateTo {x:-Model.windowW}, true
            
            elementCss = 
                left: (Model.windowW >> 1) - (@element.width() >> 1)
                top: Model.windowH - @element.height() - 40

            @element.css elementCss

            # TweenMax.killDelayedCallsTo @addAnimations
            # TweenMax.delayedCall 0.6, @addAnimations
            return

        destroy: =>
            TweenMax.killDelayedCallsTo @changeSlide
            for item, i in @items
                item.tl.clear()
            @li.off "mouseenter", @onEnter
            @li.off "mouseleave", @onLeave
            @li.off "click", @onClick
            super()
            return

    return TimelineMenu
