var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var InitialLoadController;
  InitialLoadController = (function() {
    InitialLoadController.prototype.callback = void 0;

    function InitialLoadController(cb) {
      this.loadImagesAndTexts = __bind(this.loadImagesAndTexts, this);
      this.callback = cb;
      this.loadImagesAndTexts();
    }

    InitialLoadController.prototype.loadImagesAndTexts = function() {
      var basePath, manifest;
      basePath = Model.imageBasePath;
      manifest = [
        {
          id: "slideshow-partial",
          src: "partial/slideshow.html"
        }, {
          id: "sub-side-menu-partial",
          src: "partial/sub-side-menu.html"
        }, {
          id: "contact-partial",
          src: "partial/layout/contact.html"
        }, {
          id: "footer-partial",
          src: "partial/layout/footer.html"
        }, {
          id: "header-partial",
          src: "partial/layout/header.html"
        }, {
          id: "pages-loader-partial",
          src: "partial/layout/pages-loader.html"
        }, {
          id: "timeline-menu-partial",
          src: "partial/layout/timeline-menu.html"
        }, {
          id: "about-partial",
          src: "partial/page/about.html"
        }, {
          id: "home-partial",
          src: "partial/page/home.html"
        }, {
          id: "production-partial",
          src: "partial/page/production.html"
        }, {
          id: "relations-presse-partial",
          src: "partial/page/relations-presse.html"
        }, {
          id: "relations-publiques-partial",
          src: "partial/page/relations-publiques.html"
        }, {
          id: "circle-svg",
          src: "svg/circle.svg",
          type: createjs.LoadQueue.TEXT
        }, {
          id: "close-svg",
          src: "svg/close.svg",
          type: createjs.LoadQueue.TEXT
        }, {
          id: "logo-svg",
          src: "svg/logo.svg",
          type: createjs.LoadQueue.TEXT
        }, {
          id: "blank-image",
          src: "image/global/blank.gif"
        }
      ];
      return Loader.load(manifest, this.callback);
    };

    return InitialLoadController;

  })();
  return InitialLoadController;
});
