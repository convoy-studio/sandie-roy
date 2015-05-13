define [], () ->
    class GlobalEvents

        "use strict"
        
        constructor: () ->

        init: =>
            $(window).resize @onResizeHandler
            @onResizeHandler()
            return

        onResizeHandler: =>
            Model.windowW = window.innerWidth
            Model.windowH = window.innerHeight
            Signal.onResize.dispatch()
            return

    return GlobalEvents
