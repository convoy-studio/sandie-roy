define ["View"], (View) ->

    "use strict"
    
    class Footer extends View

        constructor: (id, scope) ->

            scope = {}
            scope.footerTitle = Model.content["footer-title"]

            super(id, scope)

        init: =>

    return Footer
