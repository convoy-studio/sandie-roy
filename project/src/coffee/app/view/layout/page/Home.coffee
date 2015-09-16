define ["Page", "TimelineMenu"], (Page, TimelineMenu) ->

    class Home extends Page

        constructor: (id, scope) ->
            scope = {}
            scope.previews = Model.routing.slice(0, Model.routing.length-1)
            super(id, scope)

        ready: =>
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

            super()

            return

        resize: =>
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

            bottomContainerH = 0
            Model.parentEl.css
                height: bottomContainerH
            return

        destroy: =>
            @timelineMenu.destroy()
            super()
            return

    return Home
