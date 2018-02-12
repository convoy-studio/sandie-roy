define(["Mustache"], function(Mustache) {
  "use strict";
  var View;
  View = (function() {
    class View {
      constructor(id, scope) {
        var rawPartial, render;
        this.destroy = this.destroy.bind(this);
        this.scope = scope;
        this.id = id;
        // Assign directly a jquery element
        if (id instanceof jQuery) {
          rawPartial = Util.JqueryObjToString(this.id);
          if (this.scope != null) {
            this.element = $(Mustache.render(rawPartial, this.scope));
          } else {
            this.element = id;
          }
        } else {
          this.partialId = this.id + "-partial";
          rawPartial = Loader.getContentById(this.partialId);
          // If view has a loaded partial assigned
          if (rawPartial != null) {
            if (this.scope != null) {
              // Multiple children render
              while (rawPartial.indexOf("{{") >= 0) {
                render = Mustache.render(rawPartial, this.scope);
                rawPartial = render;
              }
              this.element = $(render);
            } else {
              this.element = $(rawPartial);
            }
          }
        }
        return;
      }

      destroy() {
        this.element.remove();
      }

    };

    View.prototype.element = void 0;

    View.prototype.id = void 0;

    View.prototype.partialId = void 0;

    View.prototype.scope = {};

    return View;

  }).call(this);
  return View;
});
