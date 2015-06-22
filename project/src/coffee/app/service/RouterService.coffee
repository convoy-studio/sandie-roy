define ["hasher"], (hasher) ->

    "use strict"
    
    class RouterService

        constructor: () ->

        setupRouting: =>
            routes = []
            for k, v of Model.routing
                for ks, vs of Model.pageScope
                    if k is ks
                        scope = vs
                routes.push @createRoute(k, k, scope, v.files)
            Model.routing = routes
            return

        createRoute: (id, route, scope, files)=>
            r = {}
            r.id = id
            r.clazz = Util.ConvertToClassName id
            r.route = route
            r.scope = scope
            r.files = files
            return r

        configHasher: =>
            hasher.prependHash = '/'
            hasher.changed.add @onRouteChanged
            hasher.initialized.add @onRouteChanged
            hasher.init()
            return

        onRouteChanged: (newHash) =>
            Model.gallery = undefined
            newHashFounded = false

            for r in Model.routing
                if newHash is r.route
                    Model.newHash = r.route
                    newHashFounded = true
                    @pageChanged()

            if !newHashFounded
                @sendToDefault()

            return

        pageChanged: =>
            Signal.onRouteChanged.dispatch()
            return

        sendToDefault: =>
            hasher.setHash "home"
            return

        sendTo: (id)=>
            hasher.setHash id
            return

        getBaseURL: =>
            return document.URL.split("#")[0]

        getNewViewFromRoute: (newHash) =>
            view = undefined
            for r in Model.routing
                if r.route is newHash
                    view = r
                    return view
                    break
            return

    return RouterService
