var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["DatEvent"], function(DatEvent) {
  "use strict";
  var DatParser;
  DatParser = (function() {
    DatParser.prototype.gui = void 0;

    DatParser.prototype.name = void 0;

    DatParser.prototype.rootFolder = void 0;

    function DatParser(g, clazz) {
      this.addSubFolderItems = __bind(this.addSubFolderItems, this);
      this.addToGui = __bind(this.addToGui, this);
      this.createFolder = __bind(this.createFolder, this);
      this.getMinMaxValues = __bind(this.getMinMaxValues, this);
      this.parse = __bind(this.parse, this);
      this.parseV2 = __bind(this.parseV2, this);
      this.parseV3 = __bind(this.parseV3, this);
      this.parseColor = __bind(this.parseColor, this);
      this.parseVal = __bind(this.parseVal, this);
      this.parsePRS = __bind(this.parsePRS, this);
      this.name = clazz.constructor.name;
      this.gui = g;
      this.rootFolder = this.gui.addFolder(this.name);
    }

    DatParser.prototype.parsePRS = function(folderName, obj, isOpen, call) {
      var subFolder;
      subFolder = this.createFolder(folderName);
      this.parseV3("position", obj.position, null, isOpen, call, subFolder);
      this.parseV3("rotation", obj.rotation, null, isOpen, call, subFolder);
      return this.parseV3("scale", obj.scale, null, isOpen, call, subFolder);
    };

    DatParser.prototype.parseVal = function(folderName, value, minMax, isOpen, call) {
      var mM, o, p, subFolder;
      o = {};
      o[folderName] = value;
      subFolder = this.createFolder(folderName);
      if (isOpen) {
        subFolder.open();
      } else {
        subFolder.close();
      }
      mM = this.getMinMaxValues(minMax, o[folderName]);
      p = subFolder.add(o, folderName, mM.min, mM.max);
      return new DatEvent(p, folderName, call);
    };

    DatParser.prototype.parseColor = function(folderName, value, minMax, isOpen, call) {
      var o, p, subFolder;
      o = {};
      o[folderName] = [Util.UnitToRGB(value.r), Util.UnitToRGB(value.g), Util.UnitToRGB(value.b)];
      subFolder = this.createFolder(folderName);
      if (isOpen) {
        subFolder.open();
      } else {
        subFolder.close();
      }
      p = subFolder.addColor(o, folderName);
      return new DatEvent(p, folderName, call);
    };

    DatParser.prototype.parseV3 = function(folderName, obj, minMax, isOpen, call, folder) {
      var mMx, mMy, mMz, o, subFolder;
      o = {};
      o["x"] = obj.x;
      o["y"] = obj.y;
      o["z"] = obj.z;
      subFolder = this.createFolder(folderName, folder);
      if (isOpen) {
        subFolder.open();
      } else {
        subFolder.close();
      }
      mMx = this.getMinMaxValues(minMax, o["x"]);
      mMy = this.getMinMaxValues(minMax, o["y"]);
      mMz = this.getMinMaxValues(minMax, o["z"]);
      return this.addSubFolderItems(["x", "y", "z"], o, [mMx, mMy, mMz], subFolder, folderName, call);
    };

    DatParser.prototype.parseV2 = function(folderName, obj, minMax, isOpen, call) {
      var mMx, mMy, o, subFolder;
      o = {};
      o["x"] = obj.x;
      o["y"] = obj.y;
      subFolder = this.createFolder(folderName);
      if (isOpen) {
        subFolder.open();
      } else {
        subFolder.close();
      }
      mMx = this.getMinMaxValues(minMax, o["x"]);
      mMy = this.getMinMaxValues(minMax, o["y"]);
      return this.addSubFolderItems(["x", "y"], o, [mMx, mMy], subFolder, folderName, call);
    };

    DatParser.prototype.parse = function(folderName, obj, minMax, isOpen, call) {
      var datFolder, k, v, _results;
      datFolder = this.createFolder(folderName);
      if (isOpen) {
        datFolder.open();
      } else {
        datFolder.close();
      }
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push(this.addToGui(k, v, obj, datFolder, minMax, call));
      }
      return _results;
    };

    DatParser.prototype.getMinMaxValues = function(minMax, v) {
      var mM, max, min, val;
      mM = {};
      if (minMax != null) {
        mM = {
          min: minMax[0],
          max: minMax[1]
        };
      } else {
        min = 0;
        max = 0;
        if (Util.IsInt(v)) {
          if (v === 0) {
            min = -100;
            max = 100;
          } else {
            val = Math.abs(v) * 4;
            min = -val;
            max = val;
          }
        } else {
          val = Math.abs(v) * 4;
          min = -val;
          max = val;
        }
        mM = {
          min: min,
          max: max
        };
      }
      return mM;
    };

    DatParser.prototype.createFolder = function(folderName, parentFolder) {
      var folder, rootF;
      rootF = parentFolder == null ? this.rootFolder : parentFolder;
      folder = rootF.addFolder(folderName);
      return folder;
    };

    DatParser.prototype.addToGui = function(k, v, obj, folder, minMax, call) {
      var mM, o, p;
      if (Util.ToType(v) === "function" || Util.ToType(v) === "undefined" || Util.ToType(v) === "null" || Util.ToType(v) === "string" || Util.ToType(v) === "array") {
        return;
      }
      if (v == null) {
        return;
      }
      if (k == null) {
        return;
      }
      if (v.type === "f" || v.type === "i") {
        o = {};
        o[k] = v.value;
        mM = this.getMinMaxValues(minMax, v.value);
        p = folder.add(o, k, mM.min, mM.max);
        new DatEvent(p, k, call);
      }
      if (v.type === "c") {
        o = {};
        o[k] = [Util.UnitToRGB(v.value.r), Util.UnitToRGB(v.value.g), Util.UnitToRGB(v.value.b)];
        p = folder.addColor(o, k);
        return new DatEvent(p, k, call);
      }
    };

    DatParser.prototype.addSubFolderItems = function(items, obj, minMax, subFolder, parentId, call) {
      var i, item, j, _i, _len, _results;
      j = 0;
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        i = items[_i];
        item = subFolder.add(obj, i, minMax[j].min, minMax[j].max);
        new DatEvent(item, i, call, parentId);
        _results.push(j++);
      }
      return _results;
    };

    return DatParser;

  })();
  return DatParser;
});
