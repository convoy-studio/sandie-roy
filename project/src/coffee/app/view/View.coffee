define ["Mustache"], (Mustache) ->

    "use strict"
    
    class View

        element: undefined
        id: undefined
        partialId: undefined
        scope: {}

        constructor: (id, scope) ->
            @scope = scope
            @id = id

            # Assign directly a jquery element
            if id instanceof jQuery
                rawPartial = Util.JqueryObjToString @id
                if @scope?
                    @element = $(Mustache.render(rawPartial, @scope))
                else
                    @element = id
            else
                @partialId = @id + "-partial"
                rawPartial = Loader.getContentById(@partialId)

                # If view has a loaded partial assigned
                if rawPartial?
                    if @scope?
                        # Multiple children render
                        while rawPartial.indexOf("{{") >= 0
                            render = Mustache.render(rawPartial, @scope)
                            rawPartial = render
                        @element = $(render)
                    else
                        @element = $(rawPartial)
            return

        destroy: =>
            @element.remove()
            return

    return View
