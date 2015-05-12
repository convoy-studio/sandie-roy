define [], () ->
    class GlobalEvents

        "use strict"
        
        constructor: () ->

        init: =>
            $(window).resize @onResizeHandler
            $(window).on "mousemove", @onMouseMoveHandler
            @onResizeHandler()

        onResizeHandler: =>
            Model.windowW = window.innerWidth
            Model.windowH = window.innerHeight
            Signal.onResize.dispatch()

        onMouseMoveHandler: (e)=>
            e.preventDefault()
            Model.mouseX = e.pageX
            Model.mouseY = e.pageY

    return GlobalEvents
