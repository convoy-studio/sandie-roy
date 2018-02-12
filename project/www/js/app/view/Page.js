var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["View", "signals", "Hammer"], function(View, signals, Hammer) {
  "use strict";
  var Page;
  Page = (function() {
    class Page extends View {
      constructor(id, scope) {
        super(id, scope);
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        this.addAnimations = this.addAnimations.bind(this);
        this.transitionIn = this.transitionIn.bind(this);
        this.transitionOut = this.transitionOut.bind(this);
        this.continueToTransitionOut = this.continueToTransitionOut.bind(this);
        this.transitionInCompleted = this.transitionInCompleted.bind(this);
        this.transitionOutCompleted = this.transitionOutCompleted.bind(this);
        this.resize = this.resize.bind(this);
        this.destroy = this.destroy.bind(this);
      }

      init(cb) {
        boundMethodCheck(this, Page);
        this.initCb = cb;
        Signal.onResize.add(this.resize);
        this.tl = new TimelineMax({
          onComplete: this.transitionInCompleted,
          onReverseComplete: this.transitionOutCompleted
        });
        this.transitionInComplete = new signals.Signal();
        this.transitionOutComplete = new signals.Signal();
        TweenMax.delayedCall(0, this.ready);
      }

      ready() {
        var $photoPart, $photoParts, i, j, len, p, photoPart;
        boundMethodCheck(this, Page);
        this.hammertime = new Hammer(this.element.get(0));
        this.partHolders = this.element.find(".part-holder");
        $photoParts = this.element.find(".part-photo");
        this.photoParts = [];
        for (i = j = 0, len = $photoParts.length; j < len; i = ++j) {
          photoPart = $photoParts[i];
          $photoPart = $(photoPart);
          p = {};
          p.el = $photoPart.get(0);
          p.align = Util.IsEven(i) ? "left" : "right";
          $photoPart.addClass(p.align);
          p.titleEl = $photoPart.find(".title").parent().get(0);
          p.visualContainerEl = $photoPart.find(".visual-container").get(0);
          p.paragraphEl = $photoPart.find(".paragraph").parent().get(0);
          this.photoParts.push(p);
        }
        this.centeredHolder = this.element.find(".centered-holder");
        this.initCb();
      }

      addAnimations() {
        boundMethodCheck(this, Page);
        this.tl.fromTo(this.element, 1, {
          opacity: 0
        }, {
          opacity: 1,
          ease: Expo.easeInOut
        }, 0);
        this.tl.pause(0);
      }

      transitionIn() {
        boundMethodCheck(this, Page);
        this.tl.timeScale(1.2);
        this.tl.tweenTo(this.tl.duration());
      }

      transitionOut() {
        boundMethodCheck(this, Page);
        this.continueToTransitionOut();
      }

      continueToTransitionOut() {
        boundMethodCheck(this, Page);
        this.tl.timeScale(1.6);
        this.tl.tweenTo(0);
      }

      transitionInCompleted() {
        boundMethodCheck(this, Page);
        this.transitionInComplete.dispatch();
      }

      transitionOutCompleted() {
        boundMethodCheck(this, Page);
        this.transitionOutComplete.dispatch();
      }

      resize() {
        boundMethodCheck(this, Page);
        if (Model.windowW > 901) {
          this.centeredHolder.css({
            "margin-left": -(this.centeredHolder.width() >> 1)
          });
        } else {
          this.centeredHolder.css({
            "margin-left": 0
          });
        }
      }

      destroy() {
        boundMethodCheck(this, Page);
        super.destroy();
        Signal.onResize.remove(this.resize);
        this.transitionInComplete.removeAll();
        this.transitionOutComplete.removeAll();
        this.transitionInComplete = null;
        this.transitionOutComplete = null;
        this.tl.clear();
        this.tl = null;
      }

    };

    Page.prototype.transitionInComplete = void 0;

    Page.prototype.transitionOutComplete = void 0;

    Page.prototype.tl = void 0;

    Page.prototype.initCb = void 0;

    return Page;

  }).call(this);
  return Page;
});
