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

            i = 0
            for k, v of scope.agence
                parentId = "agence"
                v.rawEl = @getPersonHolderHTML(k, v, scope.imagePath, parentId)
                v.index = i
                i += 1

            sandie = scope.equipe.sandie
            scope.equipePromo.description = sandie.name + ' – ' + sandie.position

            super(id, scope)

        getPersonHolderHTML: (id, scope, imagePath, parentId)=>
            imgURL = imagePath + parentId + "/nd/" + id + ".jpg"
            html = '
                <div data-parentid="' + parentId + '" id="' + id + '" class="person-holder btn">
                    <div class="person-visual">
                        <img lazy-src="' + imgURL + '" src="' + Model.blankImg + '">
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
            @accordionIsHere = false
            super(cb)
            return

        ready: =>

            @holderWrappers = @element.find(".holder-wrapper")
            @sandieBlock = @element.find(".sandie-block")

            $personHolders = @element.find(".person-holder")
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

            @mergedScope = {}
            for k, v of @scope.equipe
                @mergedScope[k] = v
            for k, v of @scope.agence
                @mergedScope[k] = v

            super()

            for photo in @photoParts
                $photo = $(photo.el)
                $description = $photo.find(".description")
                if $photo.hasClass("sandie-block")
                    @sandiePhotoPart = photo
                    @sandiePhotoPart.descriptionEl = $description.get()[0]
                    break

            TweenMax.delayedCall 0, =>
                @accordionWrapper = @element.find(".accordion-wrapper")
                $accordionParts = @element.find(".accordion-part")
                $accordionParts.on("click", @onAccordionPartClicked)
                @accordionParts = []
                for accordion in $accordionParts
                    $accordion = $(accordion)
                    $title = $accordion.find(".main-title")
                    $body = $accordion.find(".main-body")
                    part = {}
                    part.el = accordion
                    part.id = accordion.id
                    part.title = $title.get(0)
                    part.body = $body.get(0)
                    part.titleH = $title.height()
                    part.bodyH = $body.height()
                    @accordionParts.push(part)

                @accordionIsHere = true
                @openAccordion("mode")

            return

        onAccordionPartClicked: (e)=>
            e.preventDefault()
            target = e.currentTarget
            id = target.id
            @openAccordion(id)
            return

        openAccordion: (id)=>
            @currentOpenAccordion = id
            @updateAccordionInternalHeight()
            return

        updateAccordionInternalHeight: =>
            @currentAccordionH = 0
            for accordion in @accordionParts
                accordion.titleH = $(accordion.title).outerHeight(true) + 6
                accordion.bodyH = $(accordion.body).outerHeight(true)
                if accordion.id is @currentOpenAccordion
                    @currentAccordionH += accordion.titleH + accordion.bodyH
                    TweenMax.set accordion.el, {height: accordion.titleH + accordion.bodyH}
                else
                    @currentAccordionH += accordion.titleH
                    TweenMax.set accordion.el, {height: accordion.titleH}

            @currentAccordionH += 10

            @resizeAccordion()
            return

        onPersonClicked: (e)=>
            scope = @getPersonScopeByTarget(e.currentTarget)
            index = scope.index
            parentId = scope.parentId

            slideshowScope = []
            for k, v of @scope[parentId]
                item = {}
                item.id = k
                separator = if v.position.length > 1 then " – " else " "
                item.text = "<p>" + v.name + separator + v.position + "</p>"
                slideshowScope.push item

            Signal.slideshowOpen.dispatch index, slideshowScope, @scope.imagePath + parentId + "/hd/"
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
            for k, v of @mergedScope
                if v.el?

                    imgScale = if v.scale? then v.scale else 1

                    personVisualCss = 
                        width: personW * imgScale
                        height: personH * imgScale

                    v.width = personW
                    v.height = personH

                    personCss = {}  
                    margin = 20
                    
                    if Model.windowW < @mobile
                        alignV = (v.height * i) + (i * margin * 2.6)
                    else
                        alignV = Model.windowH * (parseFloat(v.align[1]) * 0.01)
                    alignH = if Model.windowW < @mobile then "center" else v.align[0]

                    if alignH is "left"
                        personCss.left = (Model.windowW >> 1) - (v.width >> 1) - (v.width) - margin
                    else if alignH is "right"
                        personCss.left = (Model.windowW >> 1) + (v.width >> 1) + margin
                    else if alignH is "center"
                        personCss.left = (Model.windowW >> 1) - (v.width >> 1)
                    else
                        personCss.left = Model.windowW * (parseFloat(v.align[0]) * 0.01) - (v.width >> 1)

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

        positionSandieBlock: =>
            photoScale = if Model.windowH < 900 then 0.7 else 0.9
            scale = (Model.windowH / @basePhotoW*photoScale) * 1
            photo = @sandiePhotoPart
            paragraphH = photo.paragraphEl.clientHeight
            titleH = photo.titleEl.clientHeight
            descriptionW = photo.descriptionEl.clientWidth
            descriptionH = photo.descriptionEl.clientHeight

            paragraphFontSize = parseInt $(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, '')
            paragraphLineNum = parseInt paragraphH / paragraphFontSize
            moreLines = paragraphLineNum - @baseLineNum

            photoH = @basePhotoH * scale
            photoW = @basePhotoW * scale
            phoOffset = @photoOffset - 50
            visualH = photoH
            visualX = (Model.windowW >> 1) - (photoW >> 1)
            visualY = (Model.windowH >> 1) - (photoH >> 1) - phoOffset
            titleY = (visualY >> 1)
            descriptionX = (Model.windowW >> 1) - (descriptionW >> 1)
            descriptionY = visualY + visualH
            bottomVisualPos = visualY + photoH
            paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1)

            TweenMax.set photo.visualContainerEl, { scale:scale, force3D: true, transformOrigin:"0% 0%" }
            photo.visualContainerEl.style.left = visualX + "px"
            photo.visualContainerEl.style.top = visualY + "px"
            photo.titleEl.style.top = titleY + "px"
            photo.paragraphEl.style.top = paragraphY + "px"
            photo.descriptionEl.style.left = descriptionX + "px"
            photo.descriptionEl.style.top = descriptionY + "px"
            return

        resizeAccordion: =>
            accordionCss = 
                y: (Model.windowH >> 1) - (@currentAccordionH >> 1)
            TweenMax.set @accordionWrapper, accordionCss
            return

        resize: =>
            @resizePartsHolder()
            @positionCurrentSection()
            @subSideMenu.resize()
            @resizePhotoParts()
            @positionPersons()
            @positionWrappers()
            @positionSandieBlock()
            if @accordionIsHere then @updateAccordionInternalHeight()
            return

    return About