define(["DatEvent"], function(DatEvent) {
  "use strict";
  var DatParser;
  DatParser = (function() {
    class DatParser {
      constructor(g, clazz) {
        // position + rotation + scale
        this.parsePRS = this.parsePRS.bind(this);
        // Simple value
        this.parseVal = this.parseVal.bind(this);
        // color
        this.parseColor = this.parseColor.bind(this);
        // vector3
        this.parseV3 = this.parseV3.bind(this);
        // vector2
        this.parseV2 = this.parseV2.bind(this);
        // shader properties generator
        this.parse = this.parse.bind(this);
        this.getMinMaxValues = this.getMinMaxValues.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.addToGui = this.addToGui.bind(this);
        this.addSubFolderItems = this.addSubFolderItems.bind(this);
        this.name = clazz.constructor.name;
        this.gui = g;
        this.rootFolder = this.gui.addFolder(this.name);
      }

      parsePRS(folderName, obj, isOpen, call) {
        var subFolder;
        // console.log folderName, obj, minMax, isOpen
        subFolder = this.createFolder(folderName);
        this.parseV3("position", obj.position, null, isOpen, call, subFolder);
        this.parseV3("rotation", obj.rotation, null, isOpen, call, subFolder);
        return this.parseV3("scale", obj.scale, null, isOpen, call, subFolder);
      }

      parseVal(folderName, value, minMax, isOpen, call) {
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
      }

      parseColor(folderName, value, minMax, isOpen, call) {
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
      }

      parseV3(folderName, obj, minMax, isOpen, call, folder) {
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
      }

      parseV2(folderName, obj, minMax, isOpen, call) {
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
      }

      parse(folderName, obj, minMax, isOpen, call) {
        var datFolder, k, results, v;
        datFolder = this.createFolder(folderName);
        if (isOpen) {
          datFolder.open();
        } else {
          datFolder.close();
        }
        results = [];
        for (k in obj) {
          v = obj[k];
          results.push(this.addToGui(k, v, obj, datFolder, minMax, call));
        }
        return results;
      }

      getMinMaxValues(minMax, v) {
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
      }

      createFolder(folderName, parentFolder) {
        var folder, rootF;
        rootF = parentFolder == null ? this.rootFolder : parentFolder;
        folder = rootF.addFolder(folderName);
        return folder;
      }

      addToGui(k, v, obj, folder, minMax, call) {
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
      }

      addSubFolderItems(items, obj, minMax, subFolder, parentId, call) {
        var i, item, j, l, len, results;
        j = 0;
        results = [];
        for (l = 0, len = items.length; l < len; l++) {
          i = items[l];
          item = subFolder.add(obj, i, minMax[j].min, minMax[j].max);
          new DatEvent(item, i, call, parentId);
          results.push(j++);
        }
        return results;
      }

    };

    DatParser.prototype.gui = void 0;

    DatParser.prototype.name = void 0;

    DatParser.prototype.rootFolder = void 0;

    return DatParser;

  }).call(this);
  return DatParser;
});
