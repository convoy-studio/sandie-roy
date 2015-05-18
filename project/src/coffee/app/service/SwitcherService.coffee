# Define start - generated content
define ["RelationsPresse", "RelationsPubliques", "About", "Production", "Home"], (RelationsPresse, RelationsPubliques, About, Production, Home) ->
# Define end - generated content

    class SwitcherService

        constructor: () ->
            newPage: undefined
            newView: undefined
            oldView: undefined
            hist: undefined

        init: =>
            @hist = []
            Signal.onRouteChanged.add @onRouteChanged
            return

        onRouteChanged: =>
            @prepareManifest()
            return

        prepareManifest: =>
            @newPage = Router.getNewViewFromRoute Model.newHash
            @prepareView()
            return

        prepareView: =>
            @pageLoaderTransitionInCompleted()
            return

        pageLoaderTransitionInCompleted: =>
            files = @newPage.files
            if files.length < 1 
                @pageFilesLoaded()
                return
            manifest = []
            id = @newPage.id
            for file, i in files
                url = file
                paths = file.split("/")
                f = paths[paths.length-1]
                name = f.split(".")[0]
                type = f.split(".")[1]
                manifest[i] = { id: @newPage.id+"-"+name, src: url }
            Loader.load manifest, @pageFilesLoaded
            return

        pageFilesLoaded: =>
            parent = Model.mainEl

            # Create Class from hash id 
            Class = require(@newPage.clazz)

            # Update old view
            if @newView?
                @oldView = @newView

            # Create view
            @newView = @createView @newPage.id, Class, @newPage.scope
            parent.append @newView.element
            
            @newView.init @onViewInitialized

            return

        onViewInitialized: =>
            TweenMax.delayedCall 0, @newView.resize
            TweenMax.delayedCall 0, @newView.addAnimations
            TweenMax.delayedCall 0, @startTransition
            return

        startTransition: =>
            if @oldView?
                if @oldView.transitionOutComplete?
                    @oldView.transitionOutComplete.addOnce(@continueNewViewTransition, @)
                    @oldView.transitionOut()
                else 
                    @continueNewViewTransition()
            else 
                @continueNewViewTransition()
            return

        continueNewViewTransition: =>
            @pageLoaderTransitionOutCompleted()
            return

        pageLoaderTransitionOutCompleted: =>
            @newView.transitionIn()
            @destroyViews()
            return

        createView: (id, Class, scope, assetsReadyCallback) =>
            view = new Class(id, scope, assetsReadyCallback)
            @hist.push(view)
            return view

        destroyViews: =>
            destroyArray = @hist.splice(0, @hist.length-1)
            for i in [0..destroyArray.length-1]
                view = destroyArray[i]
                if view?
                    view.destroy()
                    view.element.remove()
            return

    return SwitcherService
