define [], () ->
    
    "use strict"

    class Context

        constructor: () ->
            @launchApp()

        launchApp: =>

            Switcher.init()
            
            # Init DOM
            Controller.setupViews()

            # Setup Global 3D Objects
            Controller.setupRenderer()

            # Routing
            Controller.startRouting()

            return

    return Context
