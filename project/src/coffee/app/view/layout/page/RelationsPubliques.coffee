define ["PartsPage"], (PartsPage) ->

    class RelationsPubliques extends PartsPage

        constructor: (id, scope) ->
            # scope.logoSimple = Loader.getSvg "logo-simple"
            # scope.progressArc = Loader.getSvg "progress-arc"
            # scope.titleBox = Loader.getSvg "title-box"
            # scope.heart = Loader.getSvg "heart"
            # scope.pictureIcon = Loader.getSvg "picture-icon"
            # scope.blankImg = Loader.getImageURL "blank-image"
            # scope.downloadIcon = Loader.getSvg "download-circle-icon"
            # scope.twitterIcon = Loader.getSvg "twitter-circle-icon"
            # scope.facebookIcon = Loader.getSvg "facebook-circle-icon"
            # scope.emailIcon = Loader.getSvg "email-circle-icon"

            scope.pathId = id
            
            super(id, scope)

        init: (cb)=>
            super(cb)

        ready: =>
            super()
            return

        addAnimations: =>
            super()
            return

        transitionIn: =>
            super()
            return

        transitionOut: =>
            super()
            return
            
        transitionInCompleted: =>
            super()
            return

        transitionOutCompleted: =>
            super()
            return

        resize: =>
            super()
            return

        destroy: =>
            super()
            return

    return RelationsPubliques

