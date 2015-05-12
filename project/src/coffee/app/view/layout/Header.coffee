define ["View"], (View) ->

    "use strict"
    
    class Header extends View

        constructor: (id, scope) ->

            scope = {}
            scope.headerTitle = Model.content["header-title"]
            scope.awwwardsLogo = Loader.getSvg "awwwards-logo"
            

            super(id, scope)

        init: =>

    return Header
