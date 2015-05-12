define [], () ->

    class VideoLayer

        videoIsReady: false
        videoLoopOnce: false
        videoUrl: undefined
        autoplay: true
        onReadyCallback: undefined

        constructor: (holder) ->
            @holder = holder

        init: =>
            
            if Model.isDesktop then @setupVideo() else @setupFallback()                
            Signal.onResize.add @resize, @

            return

        setupFallback: =>

            urlParts = @videoUrl.split("/")
            id = urlParts[urlParts.length-1]
            imgUrlBase = Model.imageBasePath + "/page/home/" + id + ".jpg"

            html = '
                <div id="project-video">
                    <img src="' + imgUrlBase + '">
                </div>     
            '
            @element = $(html)
            @holder.append @element
            @videoEl = @element
            @videoEl.css 
                display: "none"

            @proceedToOnReady()
            return

        setupVideo: =>
            html = '
                <video id="project-video" loop>
                    <source id="mp4_src" src="' + @videoUrl + '.mp4' + '" type="video/mp4">
                    <source id="ogg_src" src="' + @videoUrl + '.ogv' + '" type="video/ogg">
                    <source id="webm_src" src="' + @videoUrl + '.webm' + '" type="video/webm">
                </video>     
            '
            @element = $(html)

            # Solve Firefox issue that don't like to not have preload attribute
            if Model.browser is "Firefox"
                @element.attr "preload", ""

            @holder.append @element

            @videoEl = @element
            @videoEl.css 
                display: "none"
                
            @video = @videoEl.get()[0]
            @onVideoReady @proceedToOnReady
            @video.load()
            return

        onVideoReady: (cb)=>
            if Model.isDesktop
                @videoIntervalID = window.setInterval =>
                    if @video.readyState is 4
                        window.clearInterval @videoIntervalID
                        cb()
                , 100
            else
                cb()
            return

        proceedToOnReady: =>
            if @videoIntervalID? then window.clearInterval @videoIntervalID
            @onReady()
            return

        onReady: =>
            if Transition.type isnt G.VIDEO_TRANSITION
                @videoEl.css "display", "inline"
            @videoIsReady = true
            if @video?
                @video.pause()
                @video.currentTime = 0
                if @autoplay then @video.play()
            if !@videoLoopOnce then @resize()
            if @onReadyCallback?
                @onReadyCallback()
                @onReadyCallback = undefined
            return

        getCurrentTime: =>
            return @video.currentTime

        seek: (time) =>
            try
                @video.currentTime = time
            catch e
                return false
            return

        play: =>
            if @video?
                @video.play()
            return

        restart: =>
            if @video?
                @pause()
                @seek(0)
                @video.play()
            return

        pause: =>
            if @video?
                @video.pause()
            return

        resize: =>
            if @videoIsReady 
                resizeParams = Util.GetAdjustmentContainerSize(Model.windowW, Model.windowH, Model.mediaW, Model.mediaH)
                # Change width and height
                videoW = if resizeParams.type is "landscape" then resizeParams.holderW else resizeParams.originalW * resizeParams.scaleY
                videoH = if resizeParams.type is "landscape" then resizeParams.originalH * resizeParams.scaleX else resizeParams.holderH
                @videoEl.css 
                    width: videoW
                    height: videoH
                videoElCss = 
                    left: (Model.windowW >> 1) - (@videoEl.width() >> 1)
                    top: (Model.windowH >> 1) - (@videoEl.height() >> 1)
                @videoEl.css videoElCss
            return

        destroy: =>
            if @videoIntervalID? then window.clearInterval @videoIntervalID
            Signal.onResize.remove @resize, @
            
            if @videoEl? and @video?
                @video.src = ""
                @videoEl.children('source').prop('src', '')
                @videoEl.remove()
                @element.remove()
            @holder.remove()
            return

    return VideoLayer
