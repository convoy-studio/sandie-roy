
define ["View"], (View) ->

    class <%= className %> extends View

        constructor: (id, scope) ->
            super(id, scope)

        init: =>
            super()
            @ready()

        ready: =>
            super()

        destroy: =>
            super()

    return <%= className %>
