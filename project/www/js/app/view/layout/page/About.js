var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["PartsPage"], function(PartsPage) {
  "use strict";
  var About;
  About = class About extends PartsPage {
    constructor(id, scope) {
      var getPersonHolderHTML, i, k, parentId, ref, ref1, sandie, v;
      scope.pathId = id;
      scope.imagePath = "image/page/" + scope.pathId + "/";
      scope.equipePromo = scope["equipe-promo"];
      scope.agencePromo = scope["agence-promo"];
      getPersonHolderHTML = function(id, scope, imagePath, parentId) {
        var html, imgURL;
        imgURL = imagePath + parentId + "/nd/" + id + ".jpg";
        html = '<div data-parentid="' + parentId + '" id="' + id + '" class="person-holder btn"> <div class="person-visual"> <img lazy-src="' + imgURL + '" src="' + Model.blankImg + '"> </div> <div class="bottom-titles"> <p><span class="bold">' + scope.name + '</span><br>' + scope.position + '</p> </div> </div>';
        return html;
      };
      i = 0;
      ref = scope.equipe;
      for (k in ref) {
        v = ref[k];
        parentId = "equipe";
        v.rawEl = getPersonHolderHTML(k, v, scope.imagePath, parentId);
        v.index = i;
        i += 1;
      }
      i = 0;
      ref1 = scope.agence;
      for (k in ref1) {
        v = ref1[k];
        parentId = "agence";
        v.rawEl = getPersonHolderHTML(k, v, scope.imagePath, parentId);
        v.index = i;
        i += 1;
      }
      sandie = scope.equipe.sandie;
      scope.equipePromo.description = sandie.name + ' – ' + sandie.position;
      super(id, scope);
      this.init = this.init.bind(this);
      this.ready = this.ready.bind(this);
      this.onAccordionPartClicked = this.onAccordionPartClicked.bind(this);
      this.openAccordion = this.openAccordion.bind(this);
      this.updateAccordionInternalHeight = this.updateAccordionInternalHeight.bind(this);
      this.onPersonClicked = this.onPersonClicked.bind(this);
      this.addAnimations = this.addAnimations.bind(this);
      this.transitionIn = this.transitionIn.bind(this);
      this.transitionOut = this.transitionOut.bind(this);
      this.transitionInCompleted = this.transitionInCompleted.bind(this);
      this.transitionOutCompleted = this.transitionOutCompleted.bind(this);
      this.getPersonScopeByTarget = this.getPersonScopeByTarget.bind(this);
      this.positionPersons = this.positionPersons.bind(this);
      this.positionWrappers = this.positionWrappers.bind(this);
      this.positionSandieBlock = this.positionSandieBlock.bind(this);
      this.resizeAccordion = this.resizeAccordion.bind(this);
      this.resize = this.resize.bind(this);
    }

    init(cb) {
      boundMethodCheck(this, About);
      this.personBaseSize = Model.personBaseSize;
      this.mobile = Model.mobile;
      this.accordionIsHere = false;
      super.init(cb);
    }

    ready() {
      var $description, $holder, $personHolders, $photo, holder, id, j, k, l, len, len1, parentId, photo, ref, ref1, ref2, scope, v;
      boundMethodCheck(this, About);
      this.holderWrappers = this.element.find(".holder-wrapper");
      this.sandieBlock = this.element.find(".sandie-block");
      $personHolders = this.element.find(".person-holder");
      $personHolders.on("click", this.onPersonClicked);
      for (j = 0, len = $personHolders.length; j < len; j++) {
        holder = $personHolders[j];
        $holder = $(holder);
        id = holder.id;
        parentId = holder.getAttribute("data-parentid");
        scope = this.scope[parentId][id];
        scope.parentId = parentId;
        scope.el = holder;
        scope.parentEl = $holder.parent();
        scope.img = $holder.find('img');
        scope.visualEl = $holder.find(".person-visual");
        scope.width = holder.offsetWidth;
        scope.height = holder.offsetHeight;
      }
      this.mergedScope = {};
      ref = this.scope.equipe;
      for (k in ref) {
        v = ref[k];
        this.mergedScope[k] = v;
      }
      ref1 = this.scope.agence;
      for (k in ref1) {
        v = ref1[k];
        this.mergedScope[k] = v;
      }
      super.ready();
      ref2 = this.photoParts;
      for (l = 0, len1 = ref2.length; l < len1; l++) {
        photo = ref2[l];
        $photo = $(photo.el);
        $description = $photo.find(".description");
        if ($photo.hasClass("sandie-block")) {
          this.sandiePhotoPart = photo;
          this.sandiePhotoPart.descriptionEl = $description.get()[0];
          break;
        }
      }
      TweenMax.delayedCall(0, () => {
        var $accordion, $accordionParts, $body, $title, accordion, len2, m, part;
        this.accordionWrapper = this.element.find(".accordion-wrapper");
        $accordionParts = this.element.find(".accordion-part");
        $accordionParts.on("click", this.onAccordionPartClicked);
        this.accordionParts = [];
        for (m = 0, len2 = $accordionParts.length; m < len2; m++) {
          accordion = $accordionParts[m];
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
          this.accordionParts.push(part);
        }
        this.accordionIsHere = true;
        return this.openAccordion("mode");
      });
    }

    onAccordionPartClicked(e) {
      var id, target;
      boundMethodCheck(this, About);
      e.preventDefault();
      target = e.currentTarget;
      id = target.id;
      this.openAccordion(id);
    }

    openAccordion(id) {
      boundMethodCheck(this, About);
      this.currentOpenAccordion = id;
      this.updateAccordionInternalHeight();
    }

    updateAccordionInternalHeight() {
      var accordion, j, len, ref;
      boundMethodCheck(this, About);
      this.currentAccordionH = 0;
      ref = this.accordionParts;
      for (j = 0, len = ref.length; j < len; j++) {
        accordion = ref[j];
        accordion.titleH = $(accordion.title).outerHeight(true) + 2;
        accordion.bodyH = $(accordion.body).outerHeight(true);
        if (accordion.id === this.currentOpenAccordion) {
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
      this.currentAccordionH += 10;
      this.resizeAccordion();
    }

    onPersonClicked(e) {
      var index, item, k, parentId, ref, scope, separator, slideshowScope, v;
      boundMethodCheck(this, About);
      scope = this.getPersonScopeByTarget(e.currentTarget);
      index = scope.index;
      parentId = scope.parentId;
      slideshowScope = [];
      ref = this.scope[parentId];
      for (k in ref) {
        v = ref[k];
        item = {};
        item.id = k;
        separator = v.position.length > 1 ? " – " : " ";
        item.text = "<p>" + v.name + separator + v.position + "</p>";
        slideshowScope.push(item);
      }
      Signal.slideshowOpen.dispatch(index, slideshowScope, this.scope.imagePath + parentId + "/hd/");
    }

    addAnimations() {
      boundMethodCheck(this, About);
      super.addAnimations();
    }

    transitionIn() {
      boundMethodCheck(this, About);
      super.transitionIn();
    }

    transitionOut() {
      boundMethodCheck(this, About);
      super.transitionOut();
    }

    transitionInCompleted() {
      boundMethodCheck(this, About);
      super.transitionInCompleted();
    }

    transitionOutCompleted() {
      boundMethodCheck(this, About);
      super.transitionOutCompleted();
    }

    getPersonScopeByTarget(target) {
      var parentId;
      boundMethodCheck(this, About);
      parentId = target.getAttribute("data-parentid");
      return this.scope[parentId][target.id];
    }

    positionPersons() {
      var alignH, alignV, i, imgScale, k, margin, personCss, personH, personVisualCss, personW, ref, scale, v;
      boundMethodCheck(this, About);
      scale = (Model.windowW / 1360) * 1;
      scale = Math.max(scale, 0.5);
      personW = this.personBaseSize.w * scale;
      personH = this.personBaseSize.h * scale;
      i = 0;
      ref = this.mergedScope;
      for (k in ref) {
        v = ref[k];
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
          if (Model.isDesktop === false) {
            personCss.left = 0;
            personCss.top = 0;
            personCss.margin = '40px 0';
            personCss.position = 'relative';
            personVisualCss.width = '100%';
            personVisualCss.height = "auto";
            v.img.css({
              position: "relative"
            });
          }
          TweenMax.set(v.visualEl, personVisualCss);
          TweenMax.set(v.el, personCss);
          i += 1;
        }
      }
    }

    positionWrappers() {
      var $wrapper, child, children, h, j, l, len, len1, ref, wrapper;
      boundMethodCheck(this, About);
      ref = this.holderWrappers;
      for (j = 0, len = ref.length; j < len; j++) {
        wrapper = ref[j];
        $wrapper = $(wrapper);
        if (Model.windowW < this.mobile) {
          h = 0;
          children = $wrapper.children();
          for (l = 0, len1 = children.length; l < len1; l++) {
            child = children[l];
            h += child.offsetHeight;
          }
          if (Model.isDesktop === true) {
            $wrapper.css({
              top: (Model.windowH >> 1) - (h >> 1)
            });
          }
        } else {
          $wrapper.css({
            top: "auto"
          });
        }
      }
    }

    positionSandieBlock() {
      var bottomVisualPos, descriptionH, descriptionW, descriptionX, descriptionY, moreLines, paragraphFontSize, paragraphH, paragraphLineNum, paragraphY, phoOffset, photo, photoH, photoScale, photoW, scale, titleH, titleY, visualH, visualX, visualY;
      boundMethodCheck(this, About);
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
      if (Model.isDesktop === true) {
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
      } else {
        photo.visualContainerEl.style.width = "100%";
        photo.visualContainerEl.style.height = "auto";
      }
    }

    resizeAccordion() {
      var accordionCss;
      boundMethodCheck(this, About);
      if (Model.isDesktop === true) {
        accordionCss = {
          y: (Model.windowH >> 1) - (this.currentAccordionH >> 1)
        };
        TweenMax.set(this.accordionWrapper, accordionCss);
      }
    }

    resize() {
      boundMethodCheck(this, About);
      this.resizePartsHolder();
      this.positionCurrentSection();
      if (Model.isDesktop === true) {
        this.subSideMenu.resize();
      }
      this.resizePhotoParts();
      this.positionPersons();
      this.positionWrappers();
      this.positionSandieBlock();
      if (this.accordionIsHere) {
        this.updateAccordionInternalHeight();
      }
    }

  };
  return About;
});
