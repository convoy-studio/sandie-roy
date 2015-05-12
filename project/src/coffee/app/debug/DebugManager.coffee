define ["SoundHelper", "SceneHelper", "Stats", "GUI"], (SoundHelper, SceneHelper, Stats, GUI) ->

    "use strict"
    
    class DebugManager

        gui: undefined
        stats: undefined
        currentScene: undefined
        soundhelper: undefined

        constructor: () ->
            @gui = new dat.GUI()

        init: =>
            @ready()

        ready: =>

            debugContainer = $(".debug-container")

            @stats = new Stats()
            debugContainer.append @stats.domElement

            # @initSceneHelper()
            # @initSoundHelper()

        initSoundHelper: =>
            @soundhelper = new SoundHelper()
            @soundhelper.init()

        initSceneHelper: =>
            scenehelper = new SceneHelper()
            scenehelper.init()

        onUpdate: =>
            if @stats? then @stats.update()
            if @soundhelper? then @soundhelper.onUpdate()

    return DebugManager
