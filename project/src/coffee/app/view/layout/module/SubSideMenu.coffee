define ["View"], (View) ->

    class SubSideMenu extends View

        onSideMenuClicked: undefined

        constructor: (id, scope) ->

            menu = []
            for i in [0..scope.num-1]
                m = {}
                m.id = "m-" + i
                menu.push m

            scope.circle = Loader.getSvg "circle"
            scope.menu = menu

            super(id, scope)

        init: =>
            @ready()
            return

        ready: =>
            @circleWrappers = @element.find(".circle-wrapper")
            @circleWrappers.on "click", @onItemClicked
            for item, i in @circleWrappers
                c = {}
                c.id = item.id
                @scope.menu[i].el = item

            @updateMenu(0)
            return

        onItemClicked: (e)=>
            target = e.currentTarget
            id = target.id
            index = parseInt(id.substr(id.length - 1), 10)
            @onSideMenuClicked(index)
            @updateMenu index
            return

        updateMenu: (index) =>
            item = @getItemByIndex(index)
            @resetAllItems()
            item.el.classList.add "active"
            return

        resetAllItems: =>
            for m in @scope.menu
                m.el.classList.remove "active"
            return

        getItemByIndex: (index) =>
            return @scope.menu[index]

        resize: =>
            elementCss = 
                top: (Model.windowH >> 1) - (@element.height() >> 1) - 20

            @element.css elementCss
            return

        destroy: =>
            super()
            @circleWrappers.off "click", @onItemClicked
            return

    return SubSideMenu
