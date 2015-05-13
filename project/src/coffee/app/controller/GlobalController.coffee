define ["Header", "Footer", "hasher", "TopContainer"], (Header, Footer, hasher, TopContainer) ->

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

            Model.mainEl.append("<div id='top-static-container'>")
            Model.topEl = Model.mainEl.find("#top-static-container")

            topContainer = new TopContainer("top-container")
            Model.topEl.append topContainer.element
            topContainer.element = Model.topEl
            topContainer.init()

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
