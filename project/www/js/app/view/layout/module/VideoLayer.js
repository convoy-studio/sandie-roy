var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  var VideoLayer;
  VideoLayer = (function() {
    VideoLayer.prototype.videoIsReady = false;

    VideoLayer.prototype.videoLoopOnce = false;

    VideoLayer.prototype.videoUrl = void 0;

    VideoLayer.prototype.autoplay = true;

    VideoLayer.prototype.onReadyCallback = void 0;

    function VideoLayer(holder) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.pause = __bind(this.pause, this);
      this.restart = __bind(this.restart, this);
      this.play = __bind(this.play, this);
      this.seek = __bind(this.seek, this);
      this.getCurrentTime = __bind(this.getCurrentTime, this);
      this.onReady = __bind(this.onReady, this);
      this.proceedToOnReady = __bind(this.proceedToOnReady, this);
      this.onVideoReady = __bind(this.onVideoReady, this);
      this.setupVideo = __bind(this.setupVideo, this);
      this.setupFallback = __bind(this.setupFallback, this);
      this.init = __bind(this.init, this);
      this.holder = holder;
    }

    VideoLayer.prototype.init = function() {
      if (Model.isDesktop) {
        this.setupVideo();
      } else {
        this.setupFallback();
      }
      Signal.onResize.add(this.resize, this);
    };

    VideoLayer.prototype.setupFallback = function() {
      var html, id, imgUrlBase, urlParts;
      urlParts = this.videoUrl.split("/");
      id = urlParts[urlParts.length - 1];
      imgUrlBase = Model.imageBasePath + "/page/home/" + id + ".jpg";
      html = '\
                <div id="project-video">\
                    <img src="' + imgUrlBase + '">\
                </div>     \
            ';
      this.element = $(html);
      this.holder.append(this.element);
      this.videoEl = this.element;
      this.videoEl.css({
        display: "none"
      });
      this.proceedToOnReady();
    };

    VideoLayer.prototype.setupVideo = function() {
      var html;
      html = '\
                <video id="project-video" loop>\
                    <source id="mp4_src" src="' + this.videoUrl + '.mp4' + '" type="video/mp4">\
                    <source id="ogg_src" src="' + this.videoUrl + '.ogv' + '" type="video/ogg">\
                    <source id="webm_src" src="' + this.videoUrl + '.webm' + '" type="video/webm">\
                </video>     \
            ';
      this.element = $(html);
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
    };

    VideoLayer.prototype.onVideoReady = function(cb) {
      var _this = this;
      if (Model.isDesktop) {
        this.videoIntervalID = window.setInterval(function() {
          if (_this.video.readyState === 4) {
            window.clearInterval(_this.videoIntervalID);
            return cb();
          }
        }, 100);
      } else {
        cb();
      }
    };

    VideoLayer.prototype.proceedToOnReady = function() {
      if (this.videoIntervalID != null) {
        window.clearInterval(this.videoIntervalID);
      }
      this.onReady();
    };

    VideoLayer.prototype.onReady = function() {
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
    };

    VideoLayer.prototype.getCurrentTime = function() {
      return this.video.currentTime;
    };

    VideoLayer.prototype.seek = function(time) {
      var e;
      try {
        this.video.currentTime = time;
      } catch (_error) {
        e = _error;
        return false;
      }
    };

    VideoLayer.prototype.play = function() {
      if (this.video != null) {
        this.video.play();
      }
    };

    VideoLayer.prototype.restart = function() {
      if (this.video != null) {
        this.pause();
        this.seek(0);
        this.video.play();
      }
    };

    VideoLayer.prototype.pause = function() {
      if (this.video != null) {
        this.video.pause();
      }
    };

    VideoLayer.prototype.resize = function() {
      var resizeParams, videoElCss, videoH, videoW;
      if (this.videoIsReady) {
        resizeParams = Util.GetAdjustmentContainerSize(Model.windowW, Model.windowH, Model.mediaW, Model.mediaH);
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
    };

    VideoLayer.prototype.destroy = function() {
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
    };

    return VideoLayer;

  })();
  return VideoLayer;
});
