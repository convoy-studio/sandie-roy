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
                { id: "footer-partial", src: "partial/layout/footer.html" }
                { id: "header-partial", src: "partial/layout/header.html" }
                { id: "pages-loader-partial", src: "partial/layout/pages-loader.html" }
                { id: "timeline-menu-partial", src: "partial/layout/timeline-menu.html" }
                { id: "about-partial", src: "partial/page/about.html" }
                { id: "home-partial", src: "partial/page/home.html" }
                { id: "production-partial", src: "partial/page/production.html" }
                { id: "relations-presse-partial", src: "partial/page/relations-presse.html" }
                { id: "relations-publiques-partial", src: "partial/page/relations-publiques.html" }
                { id: "awwwards-logo-svg", src: "svg/awwwards-logo.svg", type:createjs.LoadQueue.TEXT }
                { id: "logo-svg", src: "svg/logo.svg", type:createjs.LoadQueue.TEXT }
                { id: "about-hd-image", src: "image/global/about-hd.jpg" }
                { id: "blank-image", src: "image/global/blank.gif" }
                { id: "production-hd-image", src: "image/global/production-hd.jpg" }
                { id: "relations-presse-hd-image", src: "image/global/relations-presse-hd.jpg" }
                { id: "relations-publiques-hd-image", src: "image/global/relations-publiques-hd.jpg" }
                # Partials end

            ]

            Loader.load manifest, @callback

    return InitialLoadController
