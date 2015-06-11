var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["PartsPage", "Slideshow"], function(PartsPage, Slideshow) {
  "use strict";
  var About;
  About = (function(_super) {
    __extends(About, _super);

    function About(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.positionPersons = __bind(this.positionPersons, this);
      this.getPersonScopeByTarget = __bind(this.getPersonScopeByTarget, this);
      this.transitionOutCompleted = __bind(this.transitionOutCompleted, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.onPersonMouseLeave = __bind(this.onPersonMouseLeave, this);
      this.onPersonMouseEnter = __bind(this.onPersonMouseEnter, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      this.getPersonHolderHTML = __bind(this.getPersonHolderHTML, this);
      var k, v, _ref;
      scope.pathId = id;
      scope.imagePath = "image/page/" + scope.pathId + "/";
      _ref = scope.equipe;
      for (k in _ref) {
        v = _ref[k];
        v.rawEl = this.getPersonHolderHTML(k, v, scope.imagePath);
      }
      About.__super__.constructor.call(this, id, scope);
    }

    About.prototype.getPersonHolderHTML = function(id, scope, imagePath) {
      var html, imgURL;
      imgURL = imagePath + id + ".jpg";
      html = '\
                <div id="' + id + '" class="person-holder btn">\
                    <div class="person-visual">\
                        <img src="' + imgURL + '">\
                        <div class="lines-holder">\
                            <div class="line left"></div>\
                            <div class="line top"></div>\
                            <div class="line right"></div>\
                            <div class="line bottom"></div>\
                        </div>\
                        <div class="info-container centered-text-parent">\
                            <p class="centered-text-child">' + scope.infos + '</p>\
                        </div>\
                    </div>\
                    <div class="bottom-titles">\
                        <p><span class="bold">' + scope.name + '</span><br>' + scope.position + '</p>\
                    </div>\
                </div>\
            ';
      return html;
    };

    About.prototype.init = function(cb) {
      this.personBaseSize = {
        w: 400,
        h: 320
      };
      return About.__super__.init.call(this, cb);
    };

    About.prototype.ready = function() {
      var $holder, $img, $infoContainer, $infoP, $lines, $personHolders, holder, id, scope, tl, _i, _len;
      this.slideshow = new Slideshow("slideshow");
      this.element.append(this.slideshow.element);
      this.slideshow.init();
      $personHolders = this.element.find(".person-holder");
      $personHolders.on("mouseenter", this.onPersonMouseEnter);
      $personHolders.on("mouseleave", this.onPersonMouseLeave);
      for (_i = 0, _len = $personHolders.length; _i < _len; _i++) {
        holder = $personHolders[_i];
        $holder = $(holder);
        id = holder.id;
        scope = this.scope.equipe[id];
        scope.el = holder;
        scope.visualEl = $holder.find(".person-visual");
        scope.width = holder.offsetWidth;
        scope.height = holder.offsetHeight;
        scope.tl = tl = new TimelineMax();
        $lines = $holder.find(".lines-holder .line");
        $infoContainer = $holder.find(".info-container");
        $infoP = $infoContainer.find("p");
        $img = $holder.find("img");
        tl.from($lines[0], 1, {
          scaleY: 0,
          opacity: 1,
          transformOrigin: "50% 100%",
          ease: Expo.easeInOut
        }, 0);
        tl.from($lines[1], 1, {
          scaleX: 0,
          opacity: 1,
          transformOrigin: "0% 50%",
          ease: Expo.easeInOut
        }, 0);
        tl.from($lines[2], 1, {
          scaleY: 0,
          opacity: 1,
          transformOrigin: "50% 0%",
          ease: Expo.easeInOut
        }, 0);
        tl.from($lines[3], 1, {
          scaleX: 0,
          opacity: 1,
          transformOrigin: "100% 50%",
          ease: Expo.easeInOut
        }, 0);
        tl.to($img, 1, {
          scale: 0.96,
          opacity: 0,
          ease: Expo.easeInOut
        }, 0.1);
        tl.from($infoContainer, 1, {
          opacity: 0,
          ease: Expo.easeInOut
        }, 0.2);
        tl.from($infoP, 1, {
          scale: 1.04,
          opacity: 0,
          ease: Expo.easeInOut
        }, 0.4);
        tl.pause(0);
      }
      About.__super__.ready.call(this);
    };

    About.prototype.onPersonMouseEnter = function(e) {
      var scope;
      scope = this.getPersonScopeByTarget(e.currentTarget);
      scope.tl.timeScale(1.4).play();
    };

    About.prototype.onPersonMouseLeave = function(e) {
      var scope;
      scope = this.getPersonScopeByTarget(e.currentTarget);
      scope.tl.timeScale(1.8).reverse();
    };

    About.prototype.addAnimations = function() {
      About.__super__.addAnimations.call(this);
    };

    About.prototype.transitionIn = function() {
      About.__super__.transitionIn.call(this);
    };

    About.prototype.transitionOut = function() {
      About.__super__.transitionOut.call(this);
    };

    About.prototype.transitionInCompleted = function() {
      About.__super__.transitionInCompleted.call(this);
    };

    About.prototype.transitionOutCompleted = function() {
      About.__super__.transitionOutCompleted.call(this);
    };

    About.prototype.getPersonScopeByTarget = function(target) {
      return this.scope.equipe[target.id];
    };

    About.prototype.positionPersons = function() {
      var h, k, margin, personCss, personH, personVisualCss, personW, scale, v, _ref;
      scale = (Model.windowW / 1360) * 1;
      scale = Math.max(scale, 0.98);
      personW = this.personBaseSize.w * scale;
      personH = this.personBaseSize.h * scale;
      _ref = this.scope.equipe;
      for (k in _ref) {
        v = _ref[k];
        if (v.el != null) {
          personVisualCss = {
            width: personW,
            height: personH
          };
          v.width = personW;
          v.height = personH;
          personCss = {};
          margin = 20;
          h = Model.windowH * (parseInt(v.align[1], 10) * 0.01);
          if (v.align[0] === "left") {
            personCss.left = (Model.windowW >> 1) - (v.width >> 1) - v.width - margin;
          } else if (v.align[0] === "right") {
            personCss.left = (Model.windowW >> 1) + (v.width >> 1) + margin;
          } else {
            personCss.left = (Model.windowW >> 1) - (v.width >> 1);
          }
          personCss.top = h;
          TweenMax.set(v.visualEl, personVisualCss);
          TweenMax.set(v.el, personCss);
        }
      }
    };

    About.prototype.resize = function() {
      this.resizePartsHolder();
      this.positionCurrentSection();
      this.subSideMenu.resize();
      this.positionPersons();
    };

    About.prototype.destroy = function() {
      About.__super__.destroy.call(this);
    };

    return About;

  })(PartsPage);
  return About;
});
