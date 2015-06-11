define ["Header", "hasher", "Contact", "Slideshow"], (Header, hasher, Contact, Slideshow) ->

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

            slideshow = new Slideshow("slideshow")
            Model.parentEl.append slideshow.element
            slideshow.init()

            return

        setupRenderer: =>
            Renderer.init()
            return

        startRouting: =>
            # All ready for routing
            Router.configHasher()
            return

    return GlobalController

