define ["View"], (View) ->

    "use strict"
    
    class Header extends View

        constructor: (id, scope) ->

            scope = {}
            scope.logo = Loader.getSvg "logo"

            super(id, scope)

        init: =>

    return Header
