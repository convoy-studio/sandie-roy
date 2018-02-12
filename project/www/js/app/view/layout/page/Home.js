var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["Page", "TimelineMenu"], function(Page, TimelineMenu) {
  var Home;
  Home = class Home extends Page {
    constructor(id, scope) {
      scope = {};
      scope.previews = Model.routing.slice(0, Model.routing.length - 1);
      super(id, scope);
      this.ready = this.ready.bind(this);
      this.resize = this.resize.bind(this);
      this.destroy = this.destroy.bind(this);
    }

    ready() {
      var $previewContainers, i, len, p, preview;
      boundMethodCheck(this, Home);
      this.timelineMenu = new TimelineMenu("timeline-menu");
      this.element.append(this.timelineMenu.element);
      this.previews = [];
      $previewContainers = this.element.find(".preview-container");
      for (i = 0, len = $previewContainers.length; i < len; i++) {
        preview = $previewContainers[i];
        p = {};
        p.el = preview;
        p.titleEl = $(preview).find(".title").get(0);
        this.previews.push(p);
      }
      this.timelineMenu.previews = this.previews;
      this.timelineMenu.init();
      super.ready();
    }

    resize() {
      var bottomContainerH, elementCss;
      boundMethodCheck(this, Home);
      elementCss = {
        width: Model.windowW,
        height: Model.windowH
      };
      this.element.css(elementCss);
      setTimeout(() => {
        var i, len, preview, ref, results, titleCss;
        this.timelineMenu.onResize();
        ref = this.previews;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          preview = ref[i];
          titleCss = {
            top: (Model.windowH >> 1) - (preview.titleEl.offsetHeight >> 1),
            left: (Model.windowW >> 1) - (preview.titleEl.offsetWidth >> 1)
          };
          results.push(TweenMax.set(preview.titleEl, titleCss));
        }
        return results;
      }, 10);
      bottomContainerH = 0;
      Model.parentEl.css({
        height: bottomContainerH
      });
    }

    destroy() {
      boundMethodCheck(this, Home);
      this.timelineMenu.destroy();
      super.destroy();
    }

  };
  return Home;
});
