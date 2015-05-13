define ["View"], (View) ->

    class <%= className %> extends View

        constructor: (id, scope) ->
            super(id, scope)

        init: =>

        destroy: =>
            super()

    return <%= className %>
