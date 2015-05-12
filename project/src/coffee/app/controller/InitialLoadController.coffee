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
                { id: "relations-presse-partial", src: "partial/page/relations-presse.html" }
                { id: "relations-publiques-partial", src: "partial/page/relations-publiques.html" }
                { id: "awwwards-logo-svg", src: "svg/awwwards-logo.svg", type:createjs.LoadQueue.TEXT }
                { id: "blank-image", src: "image/global/blank.gif" }
                # Partials end

            ]

            Loader.load manifest, @callback

    return InitialLoadController
