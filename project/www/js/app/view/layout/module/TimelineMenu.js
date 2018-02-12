var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["View"], function(View) {
  var TimelineMenu;
  TimelineMenu = (function() {
    class TimelineMenu extends View {
      constructor(id, scope) {
        scope = {};
        scope.previews = Model.routing.slice(0, Model.routing.length - 1);
        super(id, scope);
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        this.addAnimations = this.addAnimations.bind(this);
        this.changeSlide = this.changeSlide.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onResize = this.onResize.bind(this);
        this.resetSlides = this.resetSlides.bind(this);
        this.destroy = this.destroy.bind(this);
      }

      init() {
        boundMethodCheck(this, TimelineMenu);
        TweenMax.delayedCall(0.1, this.ready);
      }

      ready() {
        var $item, i, item, j, len, o, ref;
        boundMethodCheck(this, TimelineMenu);
        this.li = this.element.find("li");
        this.li.on("mouseenter", this.onEnter);
        this.li.on("mouseleave", this.onLeave);
        this.li.on("click", this.onClick);
        this.titlesLinesTop = $("#timeline-menu-view .menu-title, #timeline-menu-view .line");
        this.slideTitles = $(".pages-preview-container .title");
        this.items = [];
        ref = this.previews;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          item = ref[i];
          o = {};
          o.preview = this.previews[i];
          $item = $(item);
          o.color = o.preview.el.getAttribute("color");
          o.liEl = item;
          this.items[i] = o;
        }
        this.addAnimations();
        this.changeSlide();
        this.onResize();
      }

      addAnimations() {
        var counter, elInTween, elOutTween, i, item, j, len, ref, tl;
        boundMethodCheck(this, TimelineMenu);
        if (this.items == null) {
          return;
        }
        counter = this.items.length - 1;
        ref = this.items;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          item = ref[i];
          if (item.tl != null) {
            item.tl.clear();
          }
          tl = new TimelineMax();
          item.tl = tl;
          elInTween = TweenMax.fromTo(item.preview.el, 2.6, {
            x: Model.windowW,
            transformOrigin: "0% 0%"
          }, {
            x: 0,
            transformOrigin: "0% 0%",
            force3D: true,
            ease: Power3.easeInOut
          });
          elOutTween = TweenMax.fromTo(item.preview.el, 2.6, {
            x: 0,
            transformOrigin: "0% 100%"
          }, {
            x: -Model.windowW,
            transformOrigin: "0% 100%",
            force3D: true,
            ease: Power3.easeInOut
          });
          item.elInTween = elInTween;
          item.elOutTween = elOutTween;
          item.preview.el.style.zIndex = counter;
          tl.add("transition-in");
          tl.add(elInTween, 0);
          tl.add("transition-out");
          tl.add(elOutTween, "transition-out");
          tl.add("transition-finished");
          tl.pause(0);
          counter -= 1;
        }
      }

      changeSlide() {
        var next, previous;
        boundMethodCheck(this, TimelineMenu);
        this.currentSlide += 1;
        if (this.currentSlide > this.items.length - 1) {
          this.currentSlide = 0;
        }
        if (this.currentSlide < 0) {
          this.currentSlide = this.items.length - 1;
        }
        previous = this.items[this.currentSlide - 1];
        next = this.items[this.currentSlide];
        if (previous == null) {
          previous = this.items[this.items.length - 1];
        }
        if (this.firstLoad) {
          previous.tl.pause("transition-finished");
          next.tl.pause("transition-out");
          TweenMax.delayedCall(this.slideDelay * 0.5, this.changeSlide);
        } else {
          if (previous != null) {
            previous.tl.tweenFromTo("transition-out", "transition-finished");
          }
          next.tl.tweenFromTo("transition-in", "transition-out");
          TweenMax.delayedCall(this.slideDelay, this.changeSlide);
        }
        this.firstLoad = false;
      }

      onEnter(e) {
        var $target, id;
        boundMethodCheck(this, TimelineMenu);
        e.preventDefault();
        $target = $(e.currentTarget);
        id = $target.attr("id");
      }

      onLeave(e) {
        var $target, id;
        boundMethodCheck(this, TimelineMenu);
        e.preventDefault();
        $target = $(e.currentTarget);
        id = $target.attr("id");
      }

      onClick(e) {
        var $target, id;
        boundMethodCheck(this, TimelineMenu);
        e.preventDefault();
        $target = $(e.currentTarget);
        id = $target.attr("id");
        Router.sendTo(id);
      }

      onResize() {
        var elementCss;
        boundMethodCheck(this, TimelineMenu);
        elementCss = {
          left: (Model.windowW >> 1) - (this.element.width() >> 1),
          top: Model.windowH - this.element.height() - 40
        };
        this.element.css(elementCss);
        TweenMax.killDelayedCallsTo(this.resetSlides);
        TweenMax.delayedCall(0.1, this.resetSlides);
      }

      resetSlides() {
        boundMethodCheck(this, TimelineMenu);
        this.currentSlide = 0;
        this.addAnimations();
      }

      destroy() {
        var i, item, j, len, ref;
        boundMethodCheck(this, TimelineMenu);
        TweenMax.killDelayedCallsTo(this.changeSlide);
        ref = this.items;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          item = ref[i];
          item.tl.clear();
        }
        this.li.off("mouseenter", this.onEnter);
        this.li.off("mouseleave", this.onLeave);
        this.li.off("click", this.onClick);
        super.destroy();
      }

    };

    TimelineMenu.prototype.previews = void 0;

    TimelineMenu.prototype.slideDelay = 4;

    TimelineMenu.prototype.currentSlide = -1;

    TimelineMenu.prototype.firstLoad = true;

    TimelineMenu.prototype.firstReset = true;

    return TimelineMenu;

  }).call(this);
  return TimelineMenu;
});
