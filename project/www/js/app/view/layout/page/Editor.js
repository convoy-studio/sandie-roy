var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page", "Slider", "PosterHolder"], function(Page, Slider, PosterHolder) {
  var Editor;
  Editor = (function(_super) {
    __extends(Editor, _super);

    Editor.prototype.currentClickedPosterId = void 0;

    Editor.prototype.currentStepId = void 0;

    Editor.prototype.hasPopin = false;

    function Editor(id, scope) {
      this.validsubmit = __bind(this.validsubmit, this);
      this.hidePosterLoader = __bind(this.hidePosterLoader, this);
      this.showPosterLoader = __bind(this.showPosterLoader, this);
      this.setupPoster = __bind(this.setupPoster, this);
      this.removeStep3Events = __bind(this.removeStep3Events, this);
      this.addStep3Events = __bind(this.addStep3Events, this);
      this.setupStep3 = __bind(this.setupStep3, this);
      this.removeStep2Events = __bind(this.removeStep2Events, this);
      this.addStep2Events = __bind(this.addStep2Events, this);
      this.setupStep2 = __bind(this.setupStep2, this);
      this.removeStep1Events = __bind(this.removeStep1Events, this);
      this.addStep1Events = __bind(this.addStep1Events, this);
      this.setupStep1 = __bind(this.setupStep1, this);
      this.gotoStep = __bind(this.gotoStep, this);
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.onRecommencerBtnClicked = __bind(this.onRecommencerBtnClicked, this);
      this.predefineFolderGenerated = __bind(this.predefineFolderGenerated, this);
      this.continuePredefinedEditor = __bind(this.continuePredefinedEditor, this);
      this.setupSteps = __bind(this.setupSteps, this);
      this.onThumpChoosed = __bind(this.onThumpChoosed, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope.logoSimple = Loader.getSvg("logo-simple");
      scope.progressArc = Loader.getSvg("progress-arc");
      scope.diesi = Loader.getSvg("diesi");
      scope.translateIcon = Loader.getSvg("translate-icon");
      scope.rotateIcon = Loader.getSvg("rotate-icon");
      scope.concours = Model.content.concours;
      scope.checkmark = Loader.getSvg("checkmark-icon");
      scope.spinner = Loader.getSvg("spinner-icon");
      scope.changeColorIcon = Loader.getSvg("change-color-icon");
      scope.plusIcon = Loader.getSvg("plus-icon");
      scope.minusIcon = Loader.getSvg("minus-icon");
      scope.downloadIcon = Loader.getSvg("download-circle-icon");
      scope.twitterIcon = Loader.getSvg("twitter-circle-icon");
      scope.facebookIcon = Loader.getSvg("facebook-circle-icon");
      scope.emailIcon = Loader.getSvg("email-circle-icon");
      Editor.__super__.constructor.call(this, id, scope);
    }

    Editor.prototype.init = function(cb) {
      Editor.__super__.init.call(this, cb);
      this.posterRatio = Model.posterW / Model.posterH;
    };

    Editor.prototype.ready = function() {
      this.setupSteps();
      this.bottom = this.element.find("#bottom");
      Editor.__super__.ready.call(this);
    };

    Editor.prototype.onThumpChoosed = function(e, id) {
      this.currentClickedPosterId = id;
      this.gotoStep(1);
    };

    Editor.prototype.setupSteps = function() {
      this.step1tl = new TimelineMax();
      this.step2tl = new TimelineMax();
      this.step3tl = new TimelineMax();
      this.posterTl = new TimelineMax();
      this.poster = this.element.find('#poster');
      this.tools = this.poster.find('ul');
      this.send = this.element.find('#send');
      this.$step1Container = this.element.find('#step1');
      this.$step2Container = this.element.find('#step2');
      this.$step3Container = this.element.find('#step3');
      this.$step2Compositor = this.$step2Container.find("#compositor");
      this.$step3Compositor = this.$step3Container.find("#compositor");
      this.congratsTitle = this.element.find(".congrats");
      this.resetBtn = this.element.find(".start-xp-btn");
      this.$sliderContainer = this.element.find(".slider_container");
      this.$draggableContainer = this.$sliderContainer.find("#draggable-container");
      this.$sliderLine = this.$sliderContainer.find(".slider_line");
      this.$posterSendSpinner = this.$step2Compositor.find(".spinner-loader");
      this.setupStep1();
      this.setupStep2();
      this.setupStep3();
      this.setupPoster();
    };

    Editor.prototype.continuePredefinedEditor = function() {
      $.ajax({
        type: "POST",
        url: "php/predefine_generator.php",
        data: {
          uuid: Model.userSessionUUID
        }
      }).done(this.predefineFolderGenerated);
    };

    Editor.prototype.predefineFolderGenerated = function(data) {
      data = JSON.parse(data);
      Capture.captures = data;
      this.hasPopin = false;
      this.setupSteps();
      this.resize();
      this.gotoStep(0);
    };

    Editor.prototype.onRecommencerBtnClicked = function() {
      Router.sendTo("home");
    };

    Editor.prototype.transitionIn = function() {
      Signal.thumbChoosed.add(this.onThumpChoosed, this);
      Editor.__super__.transitionIn.call(this);
    };

    Editor.prototype.transitionOut = function() {
      if (this.posterHolder != null) {
        this.posterHolder.transitionOut();
      }
      Signal.thumbChoosed.remove(this.onThumpChoosed);
      Editor.__super__.transitionOut.call(this);
    };

    Editor.prototype.transitionInCompleted = function() {
      if (!this.hasPopin) {
        this.gotoStep(0);
      }
      return Editor.__super__.transitionInCompleted.call(this);
    };

    Editor.prototype.resize = function() {
      var bottomCss, footerH, footerSliderOffset, headerLogoH, posterCss, sliderContainerH, sliderContainerY, step2CompositorCss, step3CompositorCss, titleCss, titleH, topBound;
      if (this.hasPopin) {
        return;
      }
      if (this.posterHolder != null) {
        this.posterHolder.onResize();
      }
      if (this.slider != null) {
        headerLogoH = $("header .logo").height();
        footerH = $("footer").height();
        sliderContainerY = this.$sliderContainer.offset().top;
        sliderContainerH = this.$sliderContainer.height();
        titleH = this.congratsTitle.height();
        footerSliderOffset = Model.windowH - footerH - (sliderContainerY + sliderContainerH);
        titleCss = {
          y: headerLogoH + ((sliderContainerY - headerLogoH) >> 1) - (titleH >> 1)
        };
        TweenMax.set(this.congratsTitle, titleCss);
        this.$sliderContainer;
        topBound = sliderContainerY + sliderContainerH;
        bottomCss = {
          top: topBound + ((Model.windowH - $("#footer").height() - topBound) >> 1) - (this.bottom.height() >> 1) + 8
        };
        this.bottom.css(bottomCss);
        this.slider.resize();
      }
      footerH = $("footer#footer").height();
      posterCss = {
        height: Model.windowH - footerH,
        width: (Model.windowH - footerH) * this.posterRatio,
        x: Model.windowW >> 1
      };
      step2CompositorCss = {
        x: (this.poster.offset().left >> 1) - (this.$step2Compositor.width() >> 1),
        y: (Model.windowH >> 1) - (this.$step2Compositor.height() >> 1) - 40
      };
      step3CompositorCss = {
        x: (this.poster.offset().left >> 1) - (this.$step3Compositor.width() >> 1),
        y: (Model.windowH >> 1) - (this.$step3Compositor.height() >> 1) - 40
      };
      TweenMax.set(this.poster, posterCss);
      TweenMax.set(this.$step2Compositor, step2CompositorCss);
      TweenMax.set(this.$step3Compositor, step3CompositorCss);
      Editor.__super__.resize.call(this);
    };

    Editor.prototype.destroy = function() {
      Editor.__super__.destroy.call(this);
      if (this.slider != null) {
        this.slider.destroy();
      }
      if (this.posterHolder != null) {
        this.posterHolder.destroy();
      }
      if (this.step1tl != null) {
        this.step1tl.clear();
      }
      if (this.step2tl != null) {
        this.step2tl.clear();
      }
      if (this.step3tl != null) {
        this.step3tl.clear();
      }
      if (this.posterTl != null) {
        this.posterTl.clear();
      }
      this.step1tl = null;
      this.step2tl = null;
      this.step3tl = null;
      this.posterTl = null;
    };

    Editor.prototype.gotoStep = function(id) {
      var _this = this;
      switch (id) {
        case 0:
          this.$step1Container.css("display", "initial");
          this.resize();
          this.addStep1Events();
          if (this.step2tl.time() === 0) {
            this.step1tl.timeScale(1).play(0);
          } else {
            this.step2tl.timeScale(2).reverse();
            this.posterTl.timeScale(2).reverse();
            this.step2tl.eventCallback("onReverseComplete", function() {
              _this.posterHolder.clear();
              _this.$step2Container.css("display", "none");
              _this.poster.css("display", "none");
              _this.step1tl.timeScale(1).play(0);
              return _this.step2tl.eventCallback("onReverseComplete", null);
            });
          }
          break;
        case 1:
          this.$step2Container.css("display", "initial");
          this.step1tl.timeScale(2).reverse();
          this.addStep2Events();
          this.removeStep1Events();
          this.step1tl.eventCallback("onReverseComplete", function() {
            _this.$step1Container.css("display", "none");
            _this.poster.css("display", "initial");
            _this.resize();
            _this.step2tl.timeScale(1).play(0);
            _this.posterTl.timeScale(1).play(0);
            _this.step1tl.eventCallback("onReverseComplete", null);
            return _this.step2tl.eventCallback("onComplete", function() {
              _this.posterHolder.loadCapture(_this.currentClickedPosterId, function() {
                return _this.hidePosterLoader();
              });
              return _this.step2tl.eventCallback("onComplete", null);
            });
          });
          break;
        case 2:
          this.removeStep2Events();
          this.posterHolder.disableEvents();
          this.showPosterLoader();
          this.$posterSendSpinner.addClass("enable");
          this.posterHolder.grabCapture(this.name, this.mail, this.element.find(".allow-contact-checkbox").hasClass("enable"), this.currentClickedPosterId, function() {
            var imgUrl;
            imgUrl = Util.GetPosterUrl(Model.userSessionUUID, _this.currentClickedPosterId);
            return Util.ShortenUrl(imgUrl, function(data) {
              var $copieParagraphA;
              Model.shortUrl = data.id;
              Util.UpdateSocialLinks(Model.shortUrl, Router.getBaseURL(), _this.socials);
              $copieParagraphA = _this.$step3Container.find(".copie-paragraph a");
              $copieParagraphA.attr("href", Model.shortUrl);
              $copieParagraphA.html(Model.shortUrl);
              _this.$posterSendSpinner.removeClass("enable");
              _this.hidePosterLoader();
              _this.addStep3Events();
              _this.$step3Container.css("display", "initial");
              _this.step2tl.timeScale(2).reverse();
              return _this.step2tl.eventCallback("onReverseComplete", function() {
                _this.$step2Container.css("display", "none");
                _this.resize();
                _this.step3tl.timeScale(1).play(0);
                return _this.step2tl.eventCallback("onReverseComplete", null);
              });
            });
          });
          break;
      }
    };

    Editor.prototype.setupStep1 = function() {
      var $poster, $recommencerBtnCircle, $recommencerBtnTitle, $slider, $slider_gallery, $slider_gallery_li, $subtitle, $title, i, poster, time, yOffset, _i, _len, _ref;
      $slider = this.$step1Container.find(".slider");
      $slider_gallery = this.$step1Container.find("ul.gallery");
      $slider_gallery_li = $slider_gallery.find("li");
      this.slider = new Slider();
      this.slider.nbItems = $slider_gallery_li.length;
      this.slider.element = $slider;
      this.slider.init();
      this.nextPosterBtn = this.$step1Container.find(".btn.right");
      this.prevPosterBtn = this.$step1Container.find(".btn.left");
      $title = this.congratsTitle.find("h1");
      $subtitle = this.congratsTitle.find("p");
      $recommencerBtnCircle = this.resetBtn.find("#resetbtn");
      $recommencerBtnTitle = this.resetBtn.find(".aline");
      time = 1;
      yOffset = 10;
      this.step1tl.from($title, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0);
      this.step1tl.from(this.$sliderLine, time, {
        scaleX: 0,
        transformOrigin: "0% 50%",
        ease: Expo.easeInOut
      }, 0);
      this.step1tl.from($subtitle, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.2);
      _ref = this.slider.$postersLi;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        poster = _ref[i];
        $poster = $(poster);
        this.step1tl.from($poster, time, {
          y: yOffset,
          opacity: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 0.3 + (0.1 * i));
      }
      this.step1tl.from($recommencerBtnCircle, time, {
        scaleX: 0,
        scaleY: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.4);
      this.step1tl.from($recommencerBtnTitle, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.5);
      this.step1tl.from(this.nextPosterBtn, time, {
        x: 50,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.7);
      this.step1tl.from(this.prevPosterBtn, time, {
        x: -50,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.7);
      this.step1tl.pause(0);
    };

    Editor.prototype.addStep1Events = function() {
      this.nextPosterBtn.on('click', this.slider.next);
      this.prevPosterBtn.on('click', this.slider.prev);
    };

    Editor.prototype.removeStep1Events = function() {
      this.nextPosterBtn.off('click', this.slider.next);
      this.prevPosterBtn.off('click', this.slider.prev);
    };

    Editor.prototype.setupStep2 = function() {
      var $backIcon, $backText, $checkbox, $composer, $email, $headTitle, $paragraph, $signature, $submit, time, yOffset;
      this.posterHolder = new PosterHolder(this.poster);
      this.posterHolder.init();
      $backIcon = this.$step2Container.find("i.left-arrow-icon");
      $backText = this.$step2Container.find(".back-text");
      $headTitle = this.$step2Container.find(".headtitle");
      $paragraph = this.$step2Container.find("p");
      $composer = this.$step2Container.find(".set-composer");
      $signature = this.$step2Container.find(".set-signature");
      $email = this.$step2Container.find(".set-email");
      $submit = this.$step2Container.find(".set-submit");
      $checkbox = this.$step2Container.find(".allow-contact-checkbox");
      time = 1;
      yOffset = 10;
      this.step2tl.from($backIcon, time, {
        x: yOffset,
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0);
      this.step2tl.from($backText, time, {
        x: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.1);
      this.step2tl.from($headTitle, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0);
      this.step2tl.from($paragraph, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.1);
      this.step2tl.from($composer, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.2);
      this.step2tl.from($signature, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.3);
      this.step2tl.from($email, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.4);
      this.step2tl.from($checkbox, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.5);
      this.step2tl.from($submit, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.6);
      this.step2tl.pause(0);
    };

    Editor.prototype.addStep2Events = function() {
      var $checkbox, $input, $mail, $selectionBackBtn, $target,
        _this = this;
      $selectionBackBtn = this.$step2Container.find(".selection-back");
      $input = this.$step2Container.find('#pseudo');
      $target = this.poster.find("#name");
      $mail = this.$step2Container.find("#mail");
      $checkbox = this.$step2Container.find(".allow-contact-checkbox");
      $checkbox.on("click", function(e) {
        e.preventDefault();
        $checkbox.toggleClass("enable");
      });
      $selectionBackBtn.on("mouseenter", function(e) {
        e.preventDefault();
        $selectionBackBtn.addClass("hovered");
      });
      $selectionBackBtn.on("mouseleave", function(e) {
        e.preventDefault();
        $selectionBackBtn.removeClass("hovered");
      });
      $selectionBackBtn.on("click", function(e) {
        e.preventDefault();
        _this.gotoStep(0);
      });
      this.send.on("click", function(e) {
        e.preventDefault();
        _this.mail = _this.element.find("#mail").val();
        _this.name = _this.element.find("#pseudo").val();
        if (_this.element.find(".submit").hasClass('good')) {
          _this.gotoStep(2);
        }
      });
      this.poster.on('click scroll', function(e) {
        e.preventDefault();
        _this.$step2Container.find("#instruct1").addClass('good');
        _this.validsubmit();
      });
      $input.on("input", function(e) {
        e.preventDefault();
        $target.html($input.val());
        if ($input.val().length) {
          $input.parent('fielset').addClass('good');
        } else {
          $input.parent('fielset').removeClass('good');
        }
        _this.validsubmit();
      });
      $mail.on("input", function(e) {
        e.preventDefault();
        if (Util.ValidateEmail($mail.val())) {
          $mail.parent('fielset').addClass('good');
          $mail.removeClass('error');
        } else {
          $mail.addClass('error');
          $mail.parent('fielset').removeClass('good');
        }
        _this.validsubmit();
      });
    };

    Editor.prototype.removeStep2Events = function() {
      var $checkbox, $input, $mail, $selectionBackBtn;
      $input = this.$step2Container.find('#pseudo');
      $mail = this.$step2Container.find("#mail");
      $checkbox = this.$step2Container.find(".allow-contact-checkbox");
      $selectionBackBtn = this.$step2Container.find(".selection-back");
      $selectionBackBtn.off("mouseenter");
      $selectionBackBtn.off("mouseleave");
      $selectionBackBtn.off("click");
      $input.off("input");
      $mail.off("blur");
      this.poster.off('click scroll');
      this.send.off("click");
      $checkbox.off("click");
    };

    Editor.prototype.setupStep3 = function() {
      var $concours, $copieParagraph, $endParagraph, $galleryBtn, $headParagraph, $headTitle, $learnMoreBtn, $panning, $partageP, $rotate, $shareBtn, $shareBtns, $switch, $zoomin, $zoomout, i, shareBtn, time, yOffset, _i, _len;
      this.socials = this.$step3Container.find(".socials li");
      $concours = this.$step3Container.find(".concours-wrapper");
      $headTitle = this.$step3Container.find(".headtitle");
      $headParagraph = this.$step3Container.find(".head-paragraph");
      $galleryBtn = this.$step3Container.find(".go-gallery-btn");
      $partageP = this.$step3Container.find(".partage-paragraph");
      $shareBtns = this.$step3Container.find(".socials li");
      $copieParagraph = this.$step3Container.find(".copie-paragraph");
      $endParagraph = this.$step3Container.find(".end-paragraph");
      $learnMoreBtn = this.$step3Container.find(".learn-more-btn");
      $panning = this.poster.find("#panning");
      $rotate = this.poster.find("#rotate");
      $switch = this.poster.find("#switch-letter");
      $zoomin = this.poster.find("#zoom-in");
      $zoomout = this.poster.find("#zoom-out");
      time = 1;
      yOffset = 10;
      this.step3tl.from($headTitle, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0);
      this.step3tl.from($headParagraph, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.1);
      this.step3tl.from($concours, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.1);
      this.step3tl.from($galleryBtn, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.2);
      this.step3tl.from($partageP, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.3);
      for (i = _i = 0, _len = $shareBtns.length; _i < _len; i = ++_i) {
        shareBtn = $shareBtns[i];
        $shareBtn = $(shareBtn);
        this.step3tl.from($shareBtn, time, {
          y: yOffset,
          opacity: 0,
          force3D: true,
          ease: Expo.easeInOut
        }, 0.4 + (0.1 * i));
      }
      this.step3tl.from($copieParagraph, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.5);
      this.step3tl.from($endParagraph, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.6);
      this.step3tl.from($learnMoreBtn, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 0.7);
      this.step3tl.to($panning, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, 0);
      this.step3tl.to($rotate, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, 0.1);
      this.step3tl.to($switch, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, 0.2);
      this.step3tl.to($zoomin, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, 0.3);
      this.step3tl.to($zoomout, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, 0.4);
      this.step3tl.pause(0);
    };

    Editor.prototype.addStep3Events = function() {
      var $galleryBtn,
        _this = this;
      $galleryBtn = this.$step3Container.find(".go-gallery-btn");
      $galleryBtn.on("click", function(e) {
        e.preventDefault();
        Router.sendTo("gallery");
      });
    };

    Editor.prototype.removeStep3Events = function() {
      var $galleryBtn;
      $galleryBtn = this.$step3Container.find(".go-gallery-btn");
      $galleryBtn.off("click");
    };

    Editor.prototype.setupPoster = function() {
      var $canvas, $captureLoader, $name, $panning, $rotate, $switch, $title, $user, $zoomin, $zoomout, delay, time, yOffset;
      $title = this.poster.find(".song-title");
      $name = this.poster.find(".song-name");
      $user = this.poster.find(".song-user");
      $panning = this.poster.find("#panning");
      $rotate = this.poster.find("#rotate");
      $switch = this.poster.find("#switch-letter");
      $zoomin = this.poster.find("#zoom-in");
      $zoomout = this.poster.find("#zoom-out");
      $canvas = this.poster.find("canvas");
      $captureLoader = this.poster.find(".spinner-loader");
      time = 1;
      yOffset = 10;
      delay = 0.1;
      this.posterTl.from($canvas, time, {
        opacity: 0,
        ease: Expo.easeInOut
      }, 0);
      this.posterTl.from($title, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0);
      this.posterTl.from($name, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0.1);
      this.posterTl.from($user, time, {
        y: yOffset,
        opacity: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0.2);
      this.posterTl.from($panning, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0.3);
      this.posterTl.from($rotate, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0.4);
      this.posterTl.from($switch, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0.5);
      this.posterTl.from($zoomin, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0.6);
      this.posterTl.from($zoomout, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0.7);
      this.posterTl.from($captureLoader, time, {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
        ease: Expo.easeInOut
      }, delay + 0.1);
      this.posterTl.pause(0);
    };

    Editor.prototype.showPosterLoader = function() {
      TweenMax.to(this.poster.find(".spinner-loader"), 0.8, {
        delay: 0.5,
        scaleX: 1,
        scaleY: 1,
        transformOrigin: "50% 50%",
        opacity: 1,
        ease: Expo.easeInOut
      });
    };

    Editor.prototype.hidePosterLoader = function() {
      TweenMax.to(this.poster.find(".spinner-loader"), 0.8, {
        delay: 0.5,
        scaleX: 0,
        scaleY: 0,
        transformOrigin: "50% 50%",
        opacity: 0,
        ease: Expo.easeInOut
      });
    };

    Editor.prototype.validsubmit = function() {
      var $submit;
      $submit = this.element.find(".submit");
      if (this.element.find('.instruct.good').length === 3) {
        $submit.addClass('good');
      } else {
        $submit.removeClass('good');
      }
    };

    return Editor;

  })(Page);
  return Editor;
});
