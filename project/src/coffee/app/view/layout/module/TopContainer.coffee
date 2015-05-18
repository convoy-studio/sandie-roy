define ["View", "TimelineMenu"], (View, TimelineMenu) ->

    class TopContainer extends View

        constructor: (id, scope) ->
            scope = {}
            scope.previews = Model.routing
            super(id, scope)

        init: =>
            Signal.onResize.add @onResize, @
            TweenMax.delayedCall 0.1, @onReady
            return

        onReady: =>

            @timelineMenu = new TimelineMenu("timeline-menu")
            @element.append @timelineMenu.element

            @previews = []
            $previewContainers = @element.find(".preview-container")
            for preview in $previewContainers
                p = {}
                p.el = preview
                p.titleEl = $(preview).find(".title").get(0)
                @previews.push p

            @timelineMenu.previews = @previews
            @timelineMenu.init()

            @onResize()
            return

        onResize: =>

            elementCss = 
                width: Model.windowW
                height: Model.windowH
            @element.css elementCss

            @timelineMenu.onResize()

            for preview in @previews
                titleCss = 
                    top: (Model.windowH >> 1) - (preview.titleEl.offsetHeight >> 1)
                    left: (Model.windowW >> 1) - (preview.titleEl.offsetWidth >> 1)
                TweenMax.set preview.titleEl, titleCss
            return

        destroy: =>
            super()
            return

    return TopContainer
