define ["require", "Context", "Browser", "InitialLoadController", "Detector"], (require, Context, Browser, InitialLoadController, Detector) ->

    "use strict"
    
    class App

        constructor: () ->

            # Browser configs
            b = new Browser().init()
            Model.isDesktop = b.isDesktop
            Model.browser = b.browser
            Model.browserVersion = parseInt(b.version, 10)
            Model.isOldBrowser = if Model.browser is "Explorer" and Model.browserVersion is 9 then true else false
            Model.lang = JS_Lang

            if Model.isDesktop then $('html').addClass('is-desktop') else $('html').addClass('is-mobile')
            # Model.isDesktop = false

            @init()
            return

        init: =>
            @loadInitialData()
            return

        loadInitialData: =>
            contentUrl = Model.lang + ".json"

            manifest = [
                { id: "data", src: "data/data.json", type:createjs.LoadQueue.JSON }
                { id: "content", src: "data/" + contentUrl, type:createjs.LoadQueue.JSON }
            ]
            Loader.load(manifest, @dataCompleted )
            return

        dataCompleted: (e) =>
            # Global Content
            data = Loader.queue.getResult("data")
            c = Loader.queue.getResult("content")
            content = c.global
            pageScope = c.page
            Model.pageScope = pageScope
            Model.content = content
            Model.parentEl = $(data.initialData.app_parent)
            Model.routing = data.routing

            @loadAppData()
            return

        loadAppData: =>
            loadController = new InitialLoadController(@appDataCompleted)
            return

        appDataCompleted: =>
            context = new Context()
            return

    return App
