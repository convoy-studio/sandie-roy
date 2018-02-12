define([], function() {
  "use strict";
  var DatEvent;
  DatEvent = (function() {
    class DatEvent {
      constructor(p, id, c, parentId) {
        this.onChanged = this.onChanged.bind(this);
        this.param = p;
        this.call = c;
        this.id = id;
        this.parentId = parentId;
        this.param.onChange(this.onChanged);
      }

      onChanged(value) {
        return this.call(this.id, value, this.parentId);
      }

    };

    DatEvent.prototype.param = void 0;

    DatEvent.prototype.call = void 0;

    DatEvent.prototype.id = void 0;

    DatEvent.prototype.parentId = void 0;

    return DatEvent;

  }).call(this);
  return DatEvent;
});
