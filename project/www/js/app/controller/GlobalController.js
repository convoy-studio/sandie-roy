define(["Header", "hasher", "Contact", "Slideshow"], function(Header, hasher, Contact, Slideshow) {
  "use strict";
  var GlobalController;
  GlobalController = class GlobalController {
    constructor() {
      this.setupViews = this.setupViews.bind(this);
      this.setupRenderer = this.setupRenderer.bind(this);
      this.startRouting = this.startRouting.bind(this);
    }

    setupViews() {
      var contact, header, slideshow;
      // Header
      header = new Header("header");
      Model.parentEl.append(header.element);
      header.init();
      Model.parentEl.append("<div id='main-container'>");
      Model.mainEl = Model.parentEl.find("#main-container");
      contact = new Contact("contact", Model.content.contact);
      Model.parentEl.append(contact.element);
      contact.init();
      slideshow = new Slideshow("slideshow");
      Model.parentEl.append(slideshow.element);
      slideshow.init();
    }

    setupRenderer() {
      Renderer.init();
    }

    startRouting() {
      // All ready for routing
      Router.configHasher();
    }

  };
  return GlobalController;
});
