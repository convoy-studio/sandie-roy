define ["Page"], (Page) ->

    "use strict"
    
    class About extends Page

        constructor: (id, scope) ->

            scope.pathId = id
            scope.imagePath = "image/page/" + scope.pathId + "/"
            console.log scope.pathId

            super(id, scope)

        init: (cb)=>
            super(cb)

        ready: =>

            @personPhoto = @element.find(".equipe img")
            @personInfos = @element.find(".equipe .person-info")


            # console.log @personInfos, @personPhoto

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

            # for photo, i in @personPhoto
            #     $photo = $(photo)
            #     $info = $(@personInfos[i])

            #     infoCss = 
            #         left: $photo.position().left
            #         top: $photo.position().top + $photo.height() + 10
            #         width: $photo.width()

            #     $info.css infoCss

            #     # console.log $info.width()

            return

        destroy: =>
            super()
            return

    return About

