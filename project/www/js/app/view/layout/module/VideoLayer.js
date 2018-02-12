define([], function() {
  var VideoLayer;
  VideoLayer = (function() {
    class VideoLayer {
      constructor(holder) {
        this.init = this.init.bind(this);
        this.setupFallback = this.setupFallback.bind(this);
        this.setupVideo = this.setupVideo.bind(this);
        this.onVideoReady = this.onVideoReady.bind(this);
        this.proceedToOnReady = this.proceedToOnReady.bind(this);
        this.onReady = this.onReady.bind(this);
        this.getCurrentTime = this.getCurrentTime.bind(this);
        this.seek = this.seek.bind(this);
        this.play = this.play.bind(this);
        this.restart = this.restart.bind(this);
        this.pause = this.pause.bind(this);
        this.resize = this.resize.bind(this);
        this.destroy = this.destroy.bind(this);
        this.holder = holder;
      }

      init() {
        if (Model.isDesktop) {
          this.setupVideo();
        } else {
          this.setupFallback();
        }
        Signal.onResize.add(this.resize, this);
      }

      setupFallback() {
        var html, id, imgUrlBase, urlParts;
        urlParts = this.videoUrl.split("/");
        id = urlParts[urlParts.length - 1];
        imgUrlBase = Model.imageBasePath + "/page/home/" + id + ".jpg";
        html = '<div id="project-video"> <img src="' + imgUrlBase + '"> </div>';
        this.element = $(html);
        this.holder.append(this.element);
        this.videoEl = this.element;
        this.videoEl.css({
          display: "none"
        });
        this.proceedToOnReady();
      }

      setupVideo() {
        var html;
        html = '<video id="project-video" loop> <source id="mp4_src" src="' + this.videoUrl + '.mp4' + '" type="video/mp4"> <source id="ogg_src" src="' + this.videoUrl + '.ogv' + '" type="video/ogg"> <source id="webm_src" src="' + this.videoUrl + '.webm' + '" type="video/webm"> </video>';
        this.element = $(html);
        // Solve Firefox issue that don't like to not have preload attribute
        if (Model.browser === "Firefox") {
          this.element.attr("preload", "");
        }
        this.holder.append(this.element);
        this.videoEl = this.element;
        this.videoEl.css({
          display: "none"
        });
        this.video = this.videoEl.get()[0];
        this.onVideoReady(this.proceedToOnReady);
        this.video.load();
      }

      onVideoReady(cb) {
        if (Model.isDesktop) {
          this.videoIntervalID = window.setInterval(() => {
            if (this.video.readyState === 4) {
              window.clearInterval(this.videoIntervalID);
              return cb();
            }
          }, 100);
        } else {
          cb();
        }
      }

      proceedToOnReady() {
        if (this.videoIntervalID != null) {
          window.clearInterval(this.videoIntervalID);
        }
        this.onReady();
      }

      onReady() {
        if (Transition.type !== G.VIDEO_TRANSITION) {
          this.videoEl.css("display", "inline");
        }
        this.videoIsReady = true;
        if (this.video != null) {
          this.video.pause();
          this.video.currentTime = 0;
          if (this.autoplay) {
            this.video.play();
          }
        }
        if (!this.videoLoopOnce) {
          this.resize();
        }
        if (this.onReadyCallback != null) {
          this.onReadyCallback();
          this.onReadyCallback = void 0;
        }
      }

      getCurrentTime() {
        return this.video.currentTime;
      }

      seek(time) {
        var e;
        try {
          this.video.currentTime = time;
        } catch (error) {
          e = error;
          return false;
        }
      }

      play() {
        if (this.video != null) {
          this.video.play();
        }
      }

      restart() {
        if (this.video != null) {
          this.pause();
          this.seek(0);
          this.video.play();
        }
      }

      pause() {
        if (this.video != null) {
          this.video.pause();
        }
      }

      resize() {
        var resizeParams, videoElCss, videoH, videoW;
        if (this.videoIsReady) {
          resizeParams = Util.GetAdjustmentContainerSize(Model.windowW, Model.windowH, Model.mediaW, Model.mediaH);
          // Change width and height
          videoW = resizeParams.type === "landscape" ? resizeParams.holderW : resizeParams.originalW * resizeParams.scaleY;
          videoH = resizeParams.type === "landscape" ? resizeParams.originalH * resizeParams.scaleX : resizeParams.holderH;
          this.videoEl.css({
            width: videoW,
            height: videoH
          });
          videoElCss = {
            left: (Model.windowW >> 1) - (this.videoEl.width() >> 1),
            top: (Model.windowH >> 1) - (this.videoEl.height() >> 1)
          };
          this.videoEl.css(videoElCss);
        }
      }

      destroy() {
        if (this.videoIntervalID != null) {
          window.clearInterval(this.videoIntervalID);
        }
        Signal.onResize.remove(this.resize, this);
        if ((this.videoEl != null) && (this.video != null)) {
          this.video.src = "";
          this.videoEl.children('source').prop('src', '');
          this.videoEl.remove();
          this.element.remove();
        }
        this.holder.remove();
      }

    };

    VideoLayer.prototype.videoIsReady = false;

    VideoLayer.prototype.videoLoopOnce = false;

    VideoLayer.prototype.videoUrl = void 0;

    VideoLayer.prototype.autoplay = true;

    VideoLayer.prototype.onReadyCallback = void 0;

    return VideoLayer;

  }).call(this);
  return VideoLayer;
});
