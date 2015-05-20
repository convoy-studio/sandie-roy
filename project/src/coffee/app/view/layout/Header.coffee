define ["View"], (View) ->

    "use strict"
    
    class Header extends View

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
                l.name = page.scope.title
                l.isLast = false
                menu.push l

            menu[menu.length-1].isLast = true
            scope.menu = menu

            share = []
            for k, v of Model.content.social
                v.name = Util.CapitalizeFirstLetter v.name
                share.push v

            scope.share = share

            super(id, scope)

        init: =>

            @menuIsOpened = false

            Signal.onResize.add(@onResize)
            Signal.onColorStateChanged.add(@onColorStateChanged)
            TweenMax.delayedCall 0.1, @ready

            return

        ready: =>
            CSSPlugin.defaultTransformPerspective = 600

            @linkMenu = @element.find("ul.link-menu")
            @shareMenu = @element.find("ul.share-menu")

            $menuBtn = @element.find(".menu-btn")
            $background = @element.find(".background")
            $backContainer = @element.find(".back-container")
            $lines = @element.find(".line")
            $logoPath = @element.find(".logo svg path")
            $langContainer = @element.find(".lang-container")
            $menuTxt = $menuBtn.find(".menu-txt")
            $linksName = Util.TranformArrayFromMiddleAndOut @element.find(".link-menu .name")
            $linksSeparator = Util.TranformArrayFromMiddleAndOut @element.find(".link-menu .separator")
            $sharerName = Util.TranformArrayFromMiddleAndOut @element.find(".share-menu .name")
            backgroundH = $background.height()

            delay = 0.1
            @menuTl = new TimelineMax()
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

            @backgroundTween = TweenMax.fromTo $backContainer, 1, { scaleY:0 }, { scaleY:1, transformOrigin:"50% 0%", force3D:true, ease:Expo.easeInOut }
            @backgroundTween.pause(0)

            $menuBtn.on "click", @onMenuClicked
            Signal.onRouteChanged.add @onRouteChanged
            @onRouteChanged()

            @onResize()

            TweenMax.fromTo @element, 1, {opacity:0, y:-100, }, { opacity:1, y:0, force3D:true, ease:Expo.easeInOut }
            return

        onRouteChanged: =>
            $background = @element.find(".background")
            if @menuIsOpened
                @closeMenu()
                @menuIsOpened = false
            if Model.newHash is "home"
                @backgroundTween.reverse()
                @stateTl.reverse()
            else 
                @backgroundTween.play()
                @stateTl.play()
            return

        onMenuClicked: (e)=>
            e.preventDefault()
            @toggleMenu()
            return

        onColorStateChanged: =>
            if @stateTl?
                switch Model.colorState
                    when "white"
                        @stateTl.play()
                        break
                    when "black"
                        if !@menuIsOpened then @stateTl.reverse()
                        break
            return

        toggleMenu: =>
            if @menuIsOpened
                @closeMenu()
                @menuIsOpened = false
            else
                @openMenu()
                @menuIsOpened = true
            return

        openMenu: =>
            @menuTl.timeScale(1.2).play()
            @stateTl.timeScale(1.2).play()
            @burgerTl.timeScale(1).play()
            return

        closeMenu: =>
            @menuTl.timeScale(1.6).reverse()
            if Model.newHash is "home"
                if Model.colorState is "white"
                    @stateTl.play()
                else
                    @stateTl.timeScale(1.6).reverse()
            @burgerTl.timeScale(1.4).reverse()
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
