var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["PartsPage"], function(PartsPage) {
  "use strict";
  var About;
  About = (function(_super) {
    __extends(About, _super);

    function About(id, scope) {
      this.resize = __bind(this.resize, this);
      this.resizeAccordion = __bind(this.resizeAccordion, this);
      this.positionSandieBlock = __bind(this.positionSandieBlock, this);
      this.positionWrappers = __bind(this.positionWrappers, this);
      this.positionPersons = __bind(this.positionPersons, this);
      this.getPersonScopeByTarget = __bind(this.getPersonScopeByTarget, this);
      this.transitionOutCompleted = __bind(this.transitionOutCompleted, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.onPersonClicked = __bind(this.onPersonClicked, this);
      this.openAccordion = __bind(this.openAccordion, this);
      this.onAccordionPartClicked = __bind(this.onAccordionPartClicked, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      this.getPersonHolderHTML = __bind(this.getPersonHolderHTML, this);
      var i, k, parentId, sandie, v, _ref, _ref1;
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
      i = 0;
      _ref1 = scope.agence;
      for (k in _ref1) {
        v = _ref1[k];
        parentId = "agence";
        v.rawEl = this.getPersonHolderHTML(k, v, scope.imagePath, parentId);
        v.index = i;
        i += 1;
      }
      sandie = scope.equipe.sandie;
      scope.equipePromo.description = sandie.name + ' – ' + sandie.position;
      About.__super__.constructor.call(this, id, scope);
    }

    About.prototype.getPersonHolderHTML = function(id, scope, imagePath, parentId) {
      var html, imgURL;
      imgURL = imagePath + parentId + "/nd/" + id + ".jpg";
      html = '\
                <div data-parentid="' + parentId + '" id="' + id + '" class="person-holder btn">\
                    <div class="person-visual">\
                        <img lazy-src="' + imgURL + '" src="' + Model.blankImg + '">\
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
      this.accordionIsHere = false;
      About.__super__.init.call(this, cb);
    };

    About.prototype.ready = function() {
      var $description, $holder, $personHolders, $photo, holder, id, k, parentId, photo, scope, v, _i, _j, _len, _len1, _ref, _ref1, _ref2,
        _this = this;
      this.holderWrappers = this.element.find(".holder-wrapper");
      this.sandieBlock = this.element.find(".sandie-block");
      $personHolders = this.element.find(".person-holder");
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
      }
      this.mergedScope = {};
      _ref = this.scope.equipe;
      for (k in _ref) {
        v = _ref[k];
        this.mergedScope[k] = v;
      }
      _ref1 = this.scope.agence;
      for (k in _ref1) {
        v = _ref1[k];
        this.mergedScope[k] = v;
      }
      About.__super__.ready.call(this);
      _ref2 = this.photoParts;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        photo = _ref2[_j];
        $photo = $(photo.el);
        $description = $photo.find(".description");
        if ($photo.hasClass("sandie-block")) {
          this.sandiePhotoPart = photo;
          this.sandiePhotoPart.descriptionEl = $description.get()[0];
          break;
        }
      }
      TweenMax.delayedCall(0, function() {
        var $accordion, $accordionParts, $body, $title, accordion, part, _k, _len2;
        _this.accordionWrapper = _this.element.find(".accordion-wrapper");
        $accordionParts = _this.element.find(".accordion-part");
        $accordionParts.on("click", _this.onAccordionPartClicked);
        _this.accordionParts = [];
        for (_k = 0, _len2 = $accordionParts.length; _k < _len2; _k++) {
          accordion = $accordionParts[_k];
          $accordion = $(accordion);
          $title = $accordion.find(".main-title");
          $body = $accordion.find(".main-body");
          part = {};
          part.el = accordion;
          part.id = accordion.id;
          part.title = $title.get(0);
          part.body = $body.get(0);
          part.titleH = $title.height();
          part.bodyH = $body.height();
          _this.accordionParts.push(part);
        }
        _this.accordionIsHere = true;
        _this.resizeAccordion();
        return _this.openAccordion("mode-femme");
      });
    };

    About.prototype.onAccordionPartClicked = function(e) {
      var id, target;
      e.preventDefault();
      target = e.currentTarget;
      id = target.id;
      this.openAccordion(id);
    };

    About.prototype.openAccordion = function(id) {
      var accordion, _i, _len, _ref;
      this.currentAccordionH = 0;
      _ref = this.accordionParts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        accordion = _ref[_i];
        if (accordion.id === id) {
          this.currentAccordionH += accordion.titleH + accordion.bodyH;
          TweenMax.set(accordion.el, {
            height: accordion.titleH + accordion.bodyH
          });
        } else {
          this.currentAccordionH += accordion.titleH;
          TweenMax.set(accordion.el, {
            height: accordion.titleH
          });
        }
      }
      this.resizeAccordion();
    };

    About.prototype.onPersonClicked = function(e) {
      var index, item, k, parentId, scope, separator, slideshowScope, v, _ref;
      scope = this.getPersonScopeByTarget(e.currentTarget);
      index = scope.index;
      parentId = scope.parentId;
      slideshowScope = [];
      _ref = this.scope[parentId];
      for (k in _ref) {
        v = _ref[k];
        item = {};
        item.id = k;
        separator = v.position.length > 1 ? " – " : " ";
        item.text = "<p>" + v.name + separator + v.position + "</p>";
        slideshowScope.push(item);
      }
      Signal.slideshowOpen.dispatch(index, slideshowScope, this.scope.imagePath + parentId + "/hd/");
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
      var alignH, alignV, i, imgScale, k, margin, personCss, personH, personVisualCss, personW, scale, v, _ref;
      scale = (Model.windowW / 1360) * 1;
      scale = Math.max(scale, 0.5);
      personW = this.personBaseSize.w * scale;
      personH = this.personBaseSize.h * scale;
      i = 0;
      _ref = this.mergedScope;
      for (k in _ref) {
        v = _ref[k];
        if (v.el != null) {
          imgScale = v.scale != null ? v.scale : 1;
          personVisualCss = {
            width: personW * imgScale,
            height: personH * imgScale
          };
          v.width = personW;
          v.height = personH;
          personCss = {};
          margin = 20;
          if (Model.windowW < this.mobile) {
            alignV = (v.height * i) + (i * margin * 2.6);
          } else {
            alignV = Model.windowH * (parseFloat(v.align[1]) * 0.01);
          }
          alignH = Model.windowW < this.mobile ? "center" : v.align[0];
          if (alignH === "left") {
            personCss.left = (Model.windowW >> 1) - (v.width >> 1) - v.width - margin;
          } else if (alignH === "right") {
            personCss.left = (Model.windowW >> 1) + (v.width >> 1) + margin;
          } else if (alignH === "center") {
            personCss.left = (Model.windowW >> 1) - (v.width >> 1);
          } else {
            personCss.left = Model.windowW * (parseFloat(v.align[0]) * 0.01) - (v.width >> 1);
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

    About.prototype.positionSandieBlock = function() {
      var bottomVisualPos, descriptionH, descriptionW, descriptionX, descriptionY, moreLines, paragraphFontSize, paragraphH, paragraphLineNum, paragraphY, phoOffset, photo, photoH, photoScale, photoW, scale, titleH, titleY, visualH, visualX, visualY;
      photoScale = Model.windowH < 900 ? 0.7 : 0.9;
      scale = (Model.windowH / this.basePhotoW * photoScale) * 1;
      photo = this.sandiePhotoPart;
      paragraphH = photo.paragraphEl.clientHeight;
      titleH = photo.titleEl.clientHeight;
      descriptionW = photo.descriptionEl.clientWidth;
      descriptionH = photo.descriptionEl.clientHeight;
      paragraphFontSize = parseInt($(photo.paragraphEl).css("font-size").replace(/[^-\d\.]/g, ''));
      paragraphLineNum = parseInt(paragraphH / paragraphFontSize);
      moreLines = paragraphLineNum - this.baseLineNum;
      photoH = this.basePhotoH * scale;
      photoW = this.basePhotoW * scale;
      phoOffset = this.photoOffset - 50;
      visualH = photoH;
      visualX = (Model.windowW >> 1) - (photoW >> 1);
      visualY = (Model.windowH >> 1) - (photoH >> 1) - phoOffset;
      titleY = visualY >> 1;
      descriptionX = (Model.windowW >> 1) - (descriptionW >> 1);
      descriptionY = visualY + visualH;
      bottomVisualPos = visualY + photoH;
      paragraphY = bottomVisualPos + ((Model.windowH - bottomVisualPos) >> 1) - (paragraphH >> 1);
      TweenMax.set(photo.visualContainerEl, {
        scale: scale,
        force3D: true,
        transformOrigin: "0% 0%"
      });
      photo.visualContainerEl.style.left = visualX + "px";
      photo.visualContainerEl.style.top = visualY + "px";
      photo.titleEl.style.top = titleY + "px";
      photo.paragraphEl.style.top = paragraphY + "px";
      photo.descriptionEl.style.left = descriptionX + "px";
      photo.descriptionEl.style.top = descriptionY + "px";
    };

    About.prototype.resizeAccordion = function() {
      var accordionCss;
      accordionCss = {
        y: (Model.windowH >> 1) - (this.currentAccordionH >> 1) + 20
      };
      TweenMax.set(this.accordionWrapper, accordionCss);
    };

    About.prototype.resize = function() {
      this.resizePartsHolder();
      this.positionCurrentSection();
      this.subSideMenu.resize();
      this.resizePhotoParts();
      this.positionPersons();
      this.positionWrappers();
      this.positionSandieBlock();
      if (this.accordionIsHere) {
        this.resizeAccordion();
      }
    };

    return About;

  })(PartsPage);
  return About;
});
