define ["Header", "Footer", "hasher"], (Header, Footer, hasher) ->

    "use strict"
    
    class GlobalController

        constructor: () ->

        setupViews: =>
            # Header
            header = new Header("header")
            Model.parentEl.append header.element
            header.init()

            Model.parentEl.append("<div id='main-container'>")
            Model.mainEl = Model.parentEl.find("#main-container")

            # # Footer
            # footer = new Footer("footer")
            # Model.parentEl.append footer.element
            # footer.init()

            return

        setupRenderer: =>
            Renderer.init()
            return

        startRouting: =>
            # All ready for routing
            Router.configHasher()
            return

    return GlobalController

