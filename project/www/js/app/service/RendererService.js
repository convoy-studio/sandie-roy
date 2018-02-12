define([], function() {
  "use strict";
  var RendererService;
  RendererService = class RendererService {
    constructor() {
      this.init = this.init.bind(this);
      this.resize = this.resize.bind(this);
    }

    init() {
      this.resize();
    }

    resize() {}

  };
  return RendererService;
});
