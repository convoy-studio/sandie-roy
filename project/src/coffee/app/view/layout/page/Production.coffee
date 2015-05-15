define ["Page"], (Page) ->

    "use strict"
    
    class Production extends Page

        constructor: (id, scope) ->

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

    return Production

