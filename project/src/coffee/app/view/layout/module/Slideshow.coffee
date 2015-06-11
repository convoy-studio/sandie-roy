define ["View"], (View) ->

    class Slideshow extends View

        constructor: (id, scope) ->
            super(id, scope)

        init: =>
            @ready()
            return

        ready: =>
            console.log "slideshow"
            return

    return Slideshow
