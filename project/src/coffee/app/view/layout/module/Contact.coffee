define ["View"], (View) ->

    class Contact extends View

        constructor: (id, scope) ->
            super(id, scope)

        init: =>
            TweenMax.delayedCall 0.1, @ready
            return

        ready: =>
            console.log "go"
            return

    return Contact
