define ["Header", "Footer", "hasher", "Contact"], (Header, Footer, hasher, Contact) ->

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

            contact = new Contact("contact", Model.content.contact)
            Model.parentEl.append contact.element
            contact.init()

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

