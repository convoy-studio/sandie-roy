define ["PartsPage"], (PartsPage) ->

    "use strict"
    
    class About extends PartsPage


        constructor: (id, scope) ->

            scope.pathId = id
            scope.imagePath = "image/page/" + scope.pathId + "/"
            scope.equipePromo = scope["equipe-promo"]
            scope.agencePromo = scope["agence-promo"]

            i = 0
            for k, v of scope.equipe
                parentId = "equipe"
                v.rawEl = @getPersonHolderHTML(k, v, scope.imagePath, parentId)
                v.index = i
                i += 1

            for k, v of scope.agence
                parentId = "agence"
                v.rawEl = @getPersonHolderHTML(k, v, scope.imagePath, parentId)
                v.index = i
                i += 1

            super(id, scope)

        getPersonHolderHTML: (id, scope, imagePath, parentId)=>
            imgURL = imagePath + id + ".jpg"
            html = '
                <div data-parentid="' + parentId + '" id="' + id + '" class="person-holder btn">
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
            @personBaseSize = Model.personBaseSize
            @mobile = Model.mobile

            super(cb)

        ready: =>

            @holderWrappers = @element.find(".holder-wrapper")

            $personHolders = @element.find(".person-holder")
            $personHolders.on "mouseenter", @onPersonMouseEnter
            $personHolders.on "mouseleave", @onPersonMouseLeave
            $personHolders.on "click", @onPersonClicked
            for holder in $personHolders
                $holder = $(holder)
                id = holder.id
                parentId = holder.getAttribute("data-parentid")
                scope = @scope[parentId][id]
                scope.parentId = parentId
                scope.el = holder
                scope.parentEl = $holder.parent()
                scope.visualEl = $holder.find(".person-visual")
                scope.width = holder.offsetWidth
                scope.height = holder.offsetHeight
                scope.tl = tl = new TimelineMax()

                $lines = $holder.find(".lines-holder .line")
                $infoContainer = $holder.find(".info-container")
                $infoP = $infoContainer.find("p")
                $img = $holder.find("img")

                tl.from $lines[0], 1, { scaleY:0, opacity:1, force3D:true, transformOrigin: "50% 100%", ease:Expo.easeInOut }, 0
                tl.from $lines[1], 1, { scaleX:0, opacity:1, force3D:true, transformOrigin: "0% 50%", ease:Expo.easeInOut }, 0
                tl.from $lines[2], 1, { scaleY:0, opacity:1, force3D:true, transformOrigin: "50% 0%", ease:Expo.easeInOut }, 0
                tl.from $lines[3], 1, { scaleX:0, opacity:1, force3D:true, transformOrigin: "100% 50%", ease:Expo.easeInOut }, 0
                tl.to $img, 1, { scale:0.96, opacity:0, force3D:true, ease:Expo.easeInOut }, 0.1
                tl.from $infoContainer, 1, { opacity:0, force3D:true, ease:Expo.easeInOut }, 0.2
                tl.from $infoP, 1, { scale:1.04, opacity:0, force3D:true, ease:Expo.easeInOut }, 0.4

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

        onPersonClicked: (e)=>
            scope = @getPersonScopeByTarget(e.currentTarget)
            index = scope.index
            parentId = scope.parentId

            slideshowScope = []
            for k, v of @scope[parentId]
                item = {}
                item.id = k
                item.text = "<p>" + v.name + " – " + v.position.replace("<br>", " ") + "</p>"
                slideshowScope.push item

            Signal.slideshowOpen.dispatch index, slideshowScope, @scope.imagePath + "hd/"
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
            parentId = target.getAttribute("data-parentid")
            return @scope[parentId][target.id]

        positionPersons: =>

            scale = (Model.windowW / 1360) * 1
            scale = Math.max(scale, 0.5)
            personW = @personBaseSize.w * scale
            personH = @personBaseSize.h * scale

            i = 0
            for k, v of @scope.equipe
                if v.el?
                    personVisualCss = 
                        width: personW
                        height: personH
                    v.width = personW
                    v.height = personH

                    personCss = {}  
                    margin = 20
                    if Model.windowW < @mobile
                        alignV = (v.height * i) + (i * margin * 2.6)
                    else
                        alignV = Model.windowH * (parseInt(v.align[1], 10) * 0.01)
                    alignH = if Model.windowW < @mobile then "center" else v.align[0]

                    if alignH is "left"
                        personCss.left = (Model.windowW >> 1) - (v.width >> 1) - (v.width) - margin
                    else if alignH is "right"
                        personCss.left = (Model.windowW >> 1) + (v.width >> 1) + margin
                    else 
                        personCss.left = (Model.windowW >> 1) - (v.width >> 1)

                    personCss.top = alignV

                    TweenMax.set v.visualEl, personVisualCss
                    TweenMax.set v.el, personCss
                    i += 1

            for k, v of @scope.agence
                if v.el?
                    personVisualCss = 
                        width: personW
                        height: personH
                    v.width = personW
                    v.height = personH

                    personCss = {}  
                    margin = 20
                    if Model.windowW < @mobile
                        alignV = (v.height * i) + (i * margin * 2.6)
                    else
                        alignV = Model.windowH * (parseInt(v.align[1], 10) * 0.01)
                    alignH = if Model.windowW < @mobile then "center" else v.align[0]

                    if alignH is "left"
                        personCss.left = (Model.windowW >> 1) - (v.width >> 1) - (v.width) - margin
                    else if alignH is "right"
                        personCss.left = (Model.windowW >> 1) + (v.width >> 1) + margin
                    else 
                        personCss.left = (Model.windowW >> 1) - (v.width >> 1)

                    personCss.top = alignV

                    TweenMax.set v.visualEl, personVisualCss
                    TweenMax.set v.el, personCss
                    i += 1
            return

        positionWrappers: =>
            for wrapper in @holderWrappers
                $wrapper = $(wrapper)
                if Model.windowW < @mobile
                    h = 0
                    children = $wrapper.children()
                    for child in children
                        h += child.offsetHeight
                    $wrapper.css
                        top: (Model.windowH >> 1) - (h >> 1)
                else
                    $wrapper.css
                        top: "auto"
            return

        resize: =>
            @resizePartsHolder()
            @positionCurrentSection()
            @subSideMenu.resize()
            @resizePhotoParts()
            @positionPersons()
            @positionWrappers()
            return

        destroy: =>
            super()
            return

    return About