define ["View"], (View) ->

    "use strict"
    
    class Header extends View

        menuOpenTime: 2

        constructor: (id, scope) ->

            scope = {}
            scope.logo = Loader.getSvg "logo"
            scope.fr = Model.content.fr
            scope.en = Model.content.en
            scope.menuBtnTxt = Model.content.menu

            previews = Model.routing.slice(0, Model.routing.length-1)
            menu = []
            for page in previews
                l = {}
                l.id = page.id
                console.log l
                l.name = page.scope.title
                l.isLast = false
                menu.push l

            menu[menu.length-1].isLast = true
            scope.menu = menu

            share = []
            i = 0
            for k, v of Model.content.social
                v.id = Util.ConvertToSlug v.name
                v.name = Util.CapitalizeFirstLetter v.name
                v.btnMode = if i is 0 then false else true
                share.push v
                i += 1
            scope.share = share

            super(id, scope)

        init: =>

            @menuIsOpened = false

            Signal.onResize.add(@onResize)
            TweenMax.delayedCall 0.1, @ready

            return

        ready: =>
            CSSPlugin.defaultTransformPerspective = 600

            @linkMenu = @element.find("ul.link-menu")
            @shareMenu = @element.find("ul.share-menu")

            @menuLi = @element.find(".menu-container .link-menu li")
            @menuContainer = @element.find(".menu-container")

            $menuBtn = @element.find(".menu-btn")
            $background = @element.find(".background")
            $lines = @element.find(".line")
            $logoPath = @element.find(".logo svg path")
            $langContainer = @element.find(".lang-container")
            $menuTxt = $menuBtn.find(".menu-txt")
            $linksName = Util.TranformArrayFromMiddleAndOut @element.find(".link-menu .name")
            $linksSeparator = Util.TranformArrayFromMiddleAndOut @element.find(".link-menu .separator")
            $sharerName = Util.TranformArrayFromMiddleAndOut @element.find(".share-menu .name")
            backgroundH = $background.height()

            delay = 0.1
            @menuTl = new TimelineMax({onReverseComplete:@onMenuReverseComplete})
            @menuTl.from $background, 1, { y:-backgroundH, force3D:true, ease:Expo.easeInOut }, 0
            @menuTl.staggerFrom $linksName, 1, { y:-20, opacity:0, rotationX:-90, transformOrigin: "50% 50% -30px", force3D:true, ease:Power2.easeInOut }, 0.02, delay + 0.1
            @menuTl.staggerFrom $linksSeparator, 1, { y:0, rotationX:-90, transformOrigin: "50% 50% -30px", force3D:true, ease:Power2.easeInOut }, 0.02, delay + 0.1
            @menuTl.staggerFrom $sharerName, 1, { y:-20, rotationX:-90, transformOrigin: "50% 50% -30px", opacity:0, force3D:true, ease:Power2.easeInOut }, 0.02, delay + 0.1
            @menuTl.pause(0)

            burgerDelay = 0.1
            posY = 8
            @burgerTl = new TimelineMax()
            @burgerTl.to $lines.first(), 1, { directionalRotation:{rotation:"-135_ccw"}, y:posY, force3D: true, transformOrigin: "50% 50%", ease:Expo.easeInOut }, burgerDelay + 0
            @burgerTl.to $lines.last(), 1, { directionalRotation:{rotation:"135_cw"}, y:-posY, force3D: true, transformOrigin: "50% 50%", ease:Expo.easeInOut }, burgerDelay + 0
            @burgerTl.to $lines[1], 1, { scaleX:0, force3D:true, transformOrigin: "50% 50%", ease:Expo.easeInOut }, burgerDelay + 0
            @burgerTl.to $menuTxt, 0.8, { y:-20, opacity:0, rotationX:-90, transformOrigin: "50% 50% -30px", force3D:true, ease:Expo.easeInOut }, burgerDelay + 0
            @burgerTl.pause(0)

            @stateTl = new TimelineMax()
            @stateTl.to $menuBtn, 1, { color: "#000", force3D:true, ease:Power2.easeInOut }, 0
            @stateTl.to $lines, 1, { backgroundColor: "#000", force3D:true, ease:Power2.easeInOut }, 0
            @stateTl.to $logoPath, 1, { fill: "#000", force3D:true, ease:Power2.easeInOut }, 0
            @stateTl.to $langContainer, 1, { color: "#000", force3D:true, ease:Power2.easeInOut }, 0
            @stateTl.pause(0)

            $contact = @element.find("li#contact")
            $contact.on "click", (e)=>
                e.preventDefault()
                Signal.contactClicked.dispatch()
                @closeMenu()
                return

            $menuBtn.on "click", @onMenuClicked
            Signal.onRouteChanged.add @onRouteChanged
            @onRouteChanged()

            @onResize()

            @menuContainer.css
                "display": "none"

            TweenMax.fromTo @element, 1, {opacity:0, y:-100 }, { opacity:1, y:0, force3D:true, ease:Expo.easeInOut }
            return

        onRouteChanged: =>
            $background = @element.find(".background")
            if @menuIsOpened
                @closeMenu()
                @menuIsOpened = false
            if Model.newHash is "home"
                @stateTl.reverse()
            else 
                @stateTl.play()

            @resetLiHightlight()
            @hightlightLi()
            return

        resetLiHightlight: =>
            for li in @menuLi
                li.classList.remove "mouse-over"
                li.classList.remove "active"
            return

        hightlightLi: =>
            for li in @menuLi
                id = li.id
                if id is Model.newHash
                    li.classList.add "mouse-over"
                    li.classList.add "active"
                    break
            return

        onMenuClicked: (e)=>
            e.preventDefault()
            @toggleMenu()
            return

        toggleMenu: =>
            if @menuIsOpened
                @closeMenu()
            else
                @openMenu()
            return

        openMenu: =>
            @menuContainer.css
                "display": "block"
            @onResize()
            @menuIsOpened = true
            @menuTl.timeScale(1.2).play()
            @stateTl.timeScale(1.2).play()
            @burgerTl.timeScale(1).play()

            @element.on "mouseenter", @menuContainerMouseEnter
            @element.on "mouseleave", @menuContainerMouseLeft
            return

        closeMenu: =>
            TweenMax.killDelayedCallsTo @closeMenu
            @element.off "mouseleave", @menuContainerMouseLeft
            @element.off "mouseenter", @menuContainerMouseEnter
            @menuIsOpened = false
            @menuTl.timeScale(1.6).reverse()
            if Model.newHash is "home"
                @stateTl.timeScale(1.6).reverse()
            @burgerTl.timeScale(1.4).reverse()
            return

        menuContainerMouseLeft: (e)=>
            e.preventDefault()
            TweenMax.killDelayedCallsTo @closeMenu
            TweenMax.delayedCall @menuOpenTime, @closeMenu
            return

        menuContainerMouseEnter: (e)=>
            e.preventDefault()
            TweenMax.killDelayedCallsTo @closeMenu
            return

        onMenuReverseComplete: =>
            @menuContainer.css
                "display": "none"
            return

        onResize: =>

            linkMenuCss = 
                left: (Model.windowW >> 1) - (@linkMenu.width() >> 1)
            shareMenuCss = 
                left: (Model.windowW >> 1) - (@shareMenu.outerWidth(true) >> 1) - 10

            @linkMenu.css linkMenuCss
            @shareMenu.css shareMenuCss

            return

    return Header
