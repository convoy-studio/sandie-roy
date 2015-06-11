var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["PartsPage"], function(PartsPage) {
  "use strict";
  var About;
  About = (function(_super) {
    __extends(About, _super);

    function About(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.positionWrappers = __bind(this.positionWrappers, this);
      this.positionPersons = __bind(this.positionPersons, this);
      this.getPersonScopeByTarget = __bind(this.getPersonScopeByTarget, this);
      this.transitionOutCompleted = __bind(this.transitionOutCompleted, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.onPersonClicked = __bind(this.onPersonClicked, this);
      this.onPersonMouseLeave = __bind(this.onPersonMouseLeave, this);
      this.onPersonMouseEnter = __bind(this.onPersonMouseEnter, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      this.getPersonHolderHTML = __bind(this.getPersonHolderHTML, this);
      var i, k, parentId, v, _ref, _ref1;
      scope.pathId = id;
      scope.imagePath = "image/page/" + scope.pathId + "/";
      scope.equipePromo = scope["equipe-promo"];
      scope.agencePromo = scope["agence-promo"];
      i = 0;
      _ref = scope.equipe;
      for (k in _ref) {
        v = _ref[k];
        parentId = "equipe";
        v.rawEl = this.getPersonHolderHTML(k, v, scope.imagePath, parentId);
        v.index = i;
        i += 1;
      }
      _ref1 = scope.agence;
      for (k in _ref1) {
        v = _ref1[k];
        parentId = "agence";
        v.rawEl = this.getPersonHolderHTML(k, v, scope.imagePath, parentId);
        v.index = i;
        i += 1;
      }
      About.__super__.constructor.call(this, id, scope);
    }

    About.prototype.getPersonHolderHTML = function(id, scope, imagePath, parentId) {
      var html, imgURL;
      imgURL = imagePath + id + ".jpg";
      html = '\
                <div data-parentid="' + parentId + '" id="' + id + '" class="person-holder btn">\
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
      this.personBaseSize = Model.personBaseSize;
      this.mobile = Model.mobile;
      return About.__super__.init.call(this, cb);
    };

    About.prototype.ready = function() {
      var $holder, $img, $infoContainer, $infoP, $lines, $personHolders, holder, id, parentId, scope, tl, _i, _len;
      this.holderWrappers = this.element.find(".holder-wrapper");
      $personHolders = this.element.find(".person-holder");
      $personHolders.on("mouseenter", this.onPersonMouseEnter);
      $personHolders.on("mouseleave", this.onPersonMouseLeave);
      $personHolders.on("click", this.onPersonClicked);
      for (_i = 0, _len = $personHolders.length; _i < _len; _i++) {
        holder = $personHolders[_i];
        $holder = $(holder);
        id = holder.id;
        parentId = holder.getAttribute("data-parentid");
        scope = this.scope[parentId][id];
        scope.parentId = parentId;
        scope.el = holder;
        scope.parentEl = $holder.parent();
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
          force3D: true,
          transformOrigin: "50% 100%",
          ease: Expo.easeInOut
        }, 0);
        tl.from($lines[1], 1, {
          scaleX: 0,
          opacity: 1,
          force3D: true,
          transformOrigin: "0% 50%",
          ease: Expo.easeInOut
        }, 0);
        tl.from($lines[2], 1, {
          scaleY: 0,
          opacity: 1,
          force3D: true,
          transformOrigin: "50% 0%",
          ease: Expo.easeInOut
        }, 0);
        tl.from($lines[3], 1, {
          scaleX: 0,
          opacity: 1,
          force3D: true,
          transformOrigin: "100% 50%",
          ease: Expo.easeInOut
        }, 0);
        tl.to($img, 1, {
          scale: 0.96,
          opacity: 0,
          force3D: true,
          ease: Expo.easeInOut
        }, 0.1);
        tl.from($infoContainer, 1, {
          opacity: 0,
          force3D: true,
          ease: Expo.easeInOut
        }, 0.2);
        tl.from($infoP, 1, {
          scale: 1.04,
          opacity: 0,
          force3D: true,
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

    About.prototype.onPersonClicked = function(e) {
      var index, item, k, parentId, scope, slideshowScope, v, _ref;
      scope = this.getPersonScopeByTarget(e.currentTarget);
      index = scope.index;
      parentId = scope.parentId;
      slideshowScope = [];
      _ref = this.scope[parentId];
      for (k in _ref) {
        v = _ref[k];
        item = {};
        item.id = k;
        item.text = "<p>" + v.name + " – " + v.position.replace("<br>", " ") + "</p>";
        slideshowScope.push(item);
      }
      Signal.slideshowOpen.dispatch(index, slideshowScope, this.scope.imagePath + "hd/");
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
      var parentId;
      parentId = target.getAttribute("data-parentid");
      return this.scope[parentId][target.id];
    };

    About.prototype.positionPersons = function() {
      var alignH, alignV, i, k, margin, personCss, personH, personVisualCss, personW, scale, v, _ref, _ref1;
      scale = (Model.windowW / 1360) * 1;
      scale = Math.max(scale, 0.5);
      personW = this.personBaseSize.w * scale;
      personH = this.personBaseSize.h * scale;
      i = 0;
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
          if (Model.windowW < this.mobile) {
            alignV = (v.height * i) + (i * margin * 2.6);
          } else {
            alignV = Model.windowH * (parseInt(v.align[1], 10) * 0.01);
          }
          alignH = Model.windowW < this.mobile ? "center" : v.align[0];
          if (alignH === "left") {
            personCss.left = (Model.windowW >> 1) - (v.width >> 1) - v.width - margin;
          } else if (alignH === "right") {
            personCss.left = (Model.windowW >> 1) + (v.width >> 1) + margin;
          } else {
            personCss.left = (Model.windowW >> 1) - (v.width >> 1);
          }
          personCss.top = alignV;
          TweenMax.set(v.visualEl, personVisualCss);
          TweenMax.set(v.el, personCss);
          i += 1;
        }
      }
      _ref1 = this.scope.agence;
      for (k in _ref1) {
        v = _ref1[k];
        if (v.el != null) {
          personVisualCss = {
            width: personW,
            height: personH
          };
          v.width = personW;
          v.height = personH;
          personCss = {};
          margin = 20;
          if (Model.windowW < this.mobile) {
            alignV = (v.height * i) + (i * margin * 2.6);
          } else {
            alignV = Model.windowH * (parseInt(v.align[1], 10) * 0.01);
          }
          alignH = Model.windowW < this.mobile ? "center" : v.align[0];
          if (alignH === "left") {
            personCss.left = (Model.windowW >> 1) - (v.width >> 1) - v.width - margin;
          } else if (alignH === "right") {
            personCss.left = (Model.windowW >> 1) + (v.width >> 1) + margin;
          } else {
            personCss.left = (Model.windowW >> 1) - (v.width >> 1);
          }
          personCss.top = alignV;
          TweenMax.set(v.visualEl, personVisualCss);
          TweenMax.set(v.el, personCss);
          i += 1;
        }
      }
    };

    About.prototype.positionWrappers = function() {
      var $wrapper, child, children, h, wrapper, _i, _j, _len, _len1, _ref;
      _ref = this.holderWrappers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        wrapper = _ref[_i];
        $wrapper = $(wrapper);
        if (Model.windowW < this.mobile) {
          h = 0;
          children = $wrapper.children();
          for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
            child = children[_j];
            h += child.offsetHeight;
          }
          $wrapper.css({
            top: (Model.windowH >> 1) - (h >> 1)
          });
        } else {
          $wrapper.css({
            top: "auto"
          });
        }
      }
    };

    About.prototype.resize = function() {
      this.resizePartsHolder();
      this.positionCurrentSection();
      this.subSideMenu.resize();
      this.resizePhotoParts();
      this.positionPersons();
      this.positionWrappers();
    };

    About.prototype.destroy = function() {
      About.__super__.destroy.call(this);
    };

    return About;

  })(PartsPage);
  return About;
});
