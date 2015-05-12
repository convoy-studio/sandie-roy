define [], () ->

    "use strict"
        
    class DatEvent

        param: undefined
        call: undefined
        id: undefined
        parentId: undefined

        constructor: (p, id, c, parentId) ->
            @param = p
            @call = c
            @id = id
            @parentId = parentId

            @param.onChange @onChanged

        onChanged: (value) =>
            @call(@id, value, @parentId)

    return DatEvent
