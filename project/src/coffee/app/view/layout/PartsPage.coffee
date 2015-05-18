define ["Page", "signals"], (Page, signals) ->

    "use strict"
    
    class PartsPage extends Page

        constructor: (id, scope) ->
            super(id, scope)

        init: (cb)=>
            super(cb)
            return

        ready: =>
            super()
            return

        addAnimations: =>
            @tl.fromTo @element, 1, { y:Model.windowH + 10 }, { y:0, force3D:true, ease:Expo.easeInOut }, 0
            @tl.pause(0)
            return

        # transitionIn: =>
        #     # @element.css
        #     #     "z-index": 6
        #     @tl.timeScale(1.2)
        #     @tl.tweenTo(@tl.duration())
        #     return

        # transitionOutCompleted: =>
        #     super()
        #     # @element.css
        #     #     "z-index": 4
        #     return

        resize: =>

            baseLineNum = 3
            basePhotoH = 670
            maxVisualH = 1020

            for photo in @photoParts
                paragraphH = photo.paragraphEl.clientHeight
                titleH = photo.titleEl.clientHeight
                paragraphFontSize = parseInt $(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, '')
                paragraphLineNum = parseInt paragraphH / paragraphFontSize
                moreLines = paragraphLineNum - baseLineNum
                visualH = basePhotoH - (moreLines * paragraphFontSize)
                visualH = (Model.windowH / maxVisualH) * visualH
                visualY = (Model.windowH >> 1) - (visualH >> 1) - 40
                titleY = (visualY >> 1) - (titleH >> 1)
                bottomVisualPos = visualY + visualH
                paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1)

                photo.visualContainerEl.style.height = visualH + "px"
                photo.visualContainerEl.style.top = visualY + "px"
                photo.titleEl.style.top = titleY + "px"
                photo.paragraphEl.style.top = paragraphY + "px"

            partHolderCss =  
                width: Model.windowW
                height: Model.windowH

            elementCss = 
                y: Model.windowH
                force3D: true

            @partHolders.css partHolderCss

            TweenMax.set @element, elementCss

            bottomContainerH = @partHolders.length * Model.windowH
            # bottomContainerH = 0
            Model.parentEl.css
                height: bottomContainerH

            return

        destroy: =>
            super()
            return

    return PartsPage
