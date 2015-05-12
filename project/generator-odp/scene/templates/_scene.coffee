
define ["Scene"], (Scene) ->

    class <%= className %> extends Scene

        constructor: ->

        init: =>
            super()
            @ready()

        ready: =>
            super()
            @addEditorScene()

        addEditorScene: =>
            # EditorScene --generated content--- start
            
            # EditorScene --generated content--- end

        destroy: =>
            super()

    return <%= className %>
