define ["View"], (View) ->

    class TimelineMenu extends View

        previews: undefined
        slideDelay: 2
        currentSlide: -1
        firstLoad: true
        firstReset: true

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
            for item, i in @previews
                o = {}
                o.preview = @previews[i]
                $item = $(item)
                o.color = o.preview.el.getAttribute("color")
                o.liEl = item
                @items[i] = o
            
            @addAnimations()
            @changeSlide()
            @onResize()

            return

        addAnimations: =>
            if !@items? then return 
            counter = @items.length-1
            for item, i in @items

                if item.tl? then item.tl.clear()

                tl = new TimelineMax()
                item.tl = tl

                elInTween = TweenMax.fromTo item.preview.el, 1.8, { x:Model.windowW, transformOrigin:"0% 0%" }, { x:0, transformOrigin:"0% 0%", force3D:true, ease:Power3.easeInOut }
                elOutTween = TweenMax.fromTo item.preview.el, 1.8, { x:0, transformOrigin:"0% 100%" }, { x:-Model.windowW, transformOrigin:"0% 100%", force3D:true, ease:Power3.easeInOut }

                item.elInTween = elInTween
                item.elOutTween = elOutTween
                item.preview.el.style.zIndex = counter

                tl.add "transition-in"
                tl.add elInTween, 0
                tl.add "transition-out"
                tl.add elOutTween, "transition-out"
                tl.add "transition-finished"
                tl.pause(0)

                counter -= 1

            return

        changeSlide: =>

            @currentSlide += 1
            if @currentSlide > @items.length-1 then @currentSlide = 0
            if @currentSlide < 0 then @currentSlide = @items.length-1

            previous = @items[@currentSlide-1]
            next = @items[@currentSlide]

            if !previous?
                previous = @items[@items.length-1]

            if @firstLoad
                previous.tl.pause("transition-finished")
                next.tl.pause("transition-out")
                TweenMax.delayedCall @slideDelay*0.5, @changeSlide
            else
                if previous? then previous.tl.tweenFromTo("transition-out", "transition-finished")
                next.tl.tweenFromTo("transition-in", "transition-out")
                TweenMax.delayedCall @slideDelay, @changeSlide

            @firstLoad = false

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

            elementCss = 
                left: (Model.windowW >> 1) - (@element.width() >> 1)
                top: Model.windowH - @element.height() - 40

            @element.css elementCss


            TweenMax.killDelayedCallsTo @resetSlides
            TweenMax.delayedCall 0.1, @resetSlides

            return

        resetSlides: =>
            @currentSlide = 0
            @addAnimations()
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
