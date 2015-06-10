define ["PartsPage"], (PartsPage) ->

    "use strict"
    
    class About extends PartsPage

        constructor: (id, scope) ->

            scope.pathId = id
            scope.imagePath = "image/page/" + scope.pathId + "/"

            console.log scope



            super(id, scope)

        init: (cb)=>
            super(cb)

        ready: =>
            super()
            return

        addAnimations: =>
            super()
            return

        transitionIn: =>
            super()
            return

        transitionOut: =>
            super()
            return
            
        transitionInCompleted: =>
            super()
            return

        transitionOutCompleted: =>
            super()
            return

        resize: =>
            @resizePartsHolder()
            @positionCurrentSection()
            @subSideMenu.resize()
            return

        destroy: =>
            super()
            return

    return About