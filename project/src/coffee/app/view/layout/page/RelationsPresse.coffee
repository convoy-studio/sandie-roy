define ["PartsPage"], (PartsPage) ->

    "use strict"
    
    class RelationsPresse extends PartsPage

        constructor: (id, scope) ->

            # scope.blank = Loader.getImageURL("blank")
            # scope.imgA = Loader.getImageURL(id + "-imageA")

            scope.pathId = id

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
            super()
            return

        destroy: =>
            super()
            return

    return RelationsPresse

