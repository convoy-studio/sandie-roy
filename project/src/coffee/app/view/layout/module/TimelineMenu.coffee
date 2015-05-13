define ["View"], (View) ->

    class TimelineMenu extends View

        constructor: (id, scope) ->
            scope = {}
            scope.previews = Model.routing

            super(id, scope)

        init: =>

            $li = @element.find("li")
            $li.on "mouseenter", @onEnter
            $li.on "mouseleave", @onLeave
            $li.on "click", @onClick

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
            elementCss = 
                left: (Model.windowW >> 1) - (@element.width() >> 1)
                top: Model.windowH - @element.height() - 40
            @element.css elementCss
            return

    return TimelineMenu
