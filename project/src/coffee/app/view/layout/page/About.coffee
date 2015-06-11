define ["PartsPage", "Slideshow"], (PartsPage, Slideshow) ->

    "use strict"
    
    class About extends PartsPage


        constructor: (id, scope) ->

            scope.pathId = id
            scope.imagePath = "image/page/" + scope.pathId + "/"

            for k, v of scope.equipe
                v.rawEl = @getPersonHolderHTML(k, v, scope.imagePath)

            super(id, scope)

        getPersonHolderHTML: (id, scope, imagePath)=>
            imgURL = imagePath + id + ".jpg"
            html = '
                <div id="' + id + '" class="person-holder btn">
                    <div class="person-visual">
                        <img src="' + imgURL + '">
                        <div class="lines-holder">
                            <div class="line left"></div>
                            <div class="line top"></div>
                            <div class="line right"></div>
                            <div class="line bottom"></div>
                        </div>
                        <div class="info-container centered-text-parent">
                            <p class="centered-text-child">' + scope.infos + '</p>
                        </div>
                    </div>
                    <div class="bottom-titles">
                        <p><span class="bold">' + scope.name + '</span><br>' + scope.position + '</p>
                    </div>
                </div>
            '
            return html

        init: (cb)=>
            @personBaseSize =
                w:400
                h:320

            # 1360

            super(cb)

        ready: =>

            @slideshow = new Slideshow("slideshow")
            @element.append @slideshow.element
            @slideshow.init()

            $personHolders = @element.find(".person-holder")
            $personHolders.on "mouseenter", @onPersonMouseEnter
            $personHolders.on "mouseleave", @onPersonMouseLeave
            for holder in $personHolders
                $holder = $(holder)
                id = holder.id
                scope = @scope.equipe[id]
                scope.el = holder
                scope.visualEl = $holder.find(".person-visual")
                scope.width = holder.offsetWidth
                scope.height = holder.offsetHeight
                scope.tl = tl = new TimelineMax()

                $lines = $holder.find(".lines-holder .line")
                $infoContainer = $holder.find(".info-container")
                $infoP = $infoContainer.find("p")
                $img = $holder.find("img")

                tl.from $lines[0], 1, { scaleY:0, opacity:1, transformOrigin: "50% 100%", ease:Expo.easeInOut }, 0
                tl.from $lines[1], 1, { scaleX:0, opacity:1, transformOrigin: "0% 50%", ease:Expo.easeInOut }, 0
                tl.from $lines[2], 1, { scaleY:0, opacity:1, transformOrigin: "50% 0%", ease:Expo.easeInOut }, 0
                tl.from $lines[3], 1, { scaleX:0, opacity:1, transformOrigin: "100% 50%", ease:Expo.easeInOut }, 0
                tl.to $img, 1, { scale:0.96, opacity:0, ease:Expo.easeInOut }, 0.1
                tl.from $infoContainer, 1, { opacity:0, ease:Expo.easeInOut }, 0.2
                tl.from $infoP, 1, { scale:1.04, opacity:0, ease:Expo.easeInOut }, 0.4

                tl.pause(0)

            super()
            return

        onPersonMouseEnter: (e)=>
            scope = @getPersonScopeByTarget(e.currentTarget)
            scope.tl.timeScale(1.4).play()
            return

        onPersonMouseLeave: (e)=>
            scope = @getPersonScopeByTarget(e.currentTarget)
            scope.tl.timeScale(1.8).reverse()
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

        getPersonScopeByTarget: (target) =>
            return @scope.equipe[target.id]

        positionPersons: =>

            scale = (Model.windowW / 1360) * 1
            scale = Math.max(scale, 0.98)
            personW = @personBaseSize.w * scale
            personH = @personBaseSize.h * scale

            for k, v of @scope.equipe
                if v.el?

                    personVisualCss = 
                        width: personW
                        height: personH
                    v.width = personW
                    v.height = personH

                    personCss = {}  
                    margin = 20
                    h = Model.windowH * (parseInt(v.align[1], 10) * 0.01)
                    if v.align[0] is "left"
                        personCss.left = (Model.windowW >> 1) - (v.width >> 1) - (v.width) - margin
                    else if v.align[0] is "right"
                        personCss.left = (Model.windowW >> 1) + (v.width >> 1) + margin
                    else 
                        personCss.left = (Model.windowW >> 1) - (v.width >> 1)

                    personCss.top = h

                    TweenMax.set v.visualEl, personVisualCss
                    TweenMax.set v.el, personCss
            return

        resize: =>
            @resizePartsHolder()
            @positionCurrentSection()
            @subSideMenu.resize()
            @positionPersons()
            return

        destroy: =>
            super()
            return

    return About