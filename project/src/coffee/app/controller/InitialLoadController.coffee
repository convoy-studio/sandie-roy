define [], () ->

    "use strict"

    class InitialLoadController

        callback: undefined

        constructor: (cb) ->
            @callback = cb
            @loadImagesAndTexts()

        loadImagesAndTexts: =>

            basePath = Model.imageBasePath

            manifest = [
                
                # Partials start
                # Generated from updateLoadFiles.py
                { id: "sub-side-menu-partial", src: "partial/sub-side-menu.html" }
                { id: "slideshow-partial", src: "partial/slideshow.html" }
                { id: "home-partial", src: "partial/page/home.html" }
                { id: "about-partial", src: "partial/page/about.html" }
                { id: "relations-publiques-partial", src: "partial/page/relations-publiques.html" }
                { id: "production-partial", src: "partial/page/production.html" }
                { id: "relations-presse-partial", src: "partial/page/relations-presse.html" }
                { id: "pages-loader-partial", src: "partial/layout/pages-loader.html" }
                { id: "timeline-menu-partial", src: "partial/layout/timeline-menu.html" }
                { id: "contact-partial", src: "partial/layout/contact.html" }
                { id: "footer-partial", src: "partial/layout/footer.html" }
                { id: "header-partial", src: "partial/layout/header.html" }
                { id: "circle-svg", src: "svg/circle.svg", type:createjs.LoadQueue.TEXT }
                { id: "close-svg", src: "svg/close.svg", type:createjs.LoadQueue.TEXT }
                { id: "logo-svg", src: "svg/logo.svg", type:createjs.LoadQueue.TEXT }
                { id: "blank-image", src: "image/global/blank.gif" }
                # Partials end

            ]

            Loader.load manifest, @callback

    return InitialLoadController
