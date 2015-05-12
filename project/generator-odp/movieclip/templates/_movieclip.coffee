define ["Movieclip"], (Movieclip) ->

    class <%= className %> extends Movieclip

        constructor: () ->

        init: =>
            super()

            @ready()

        ready: =>
            super()

        onUpdate: =>

        onUpdateTransitionOut: =>

        destroy: =>
            super()

    return <%= className %>
