define ["DatEvent"], (DatEvent) ->

    "use strict"
    
    class DatParser

        gui: undefined
        name: undefined
        rootFolder: undefined

        constructor: (g, clazz) ->
            @name = clazz.constructor.name
            @gui = g
            @rootFolder = @gui.addFolder(@name)

        # position + rotation + scale
        parsePRS: (folderName, obj, isOpen, call) =>
            # console.log folderName, obj, minMax, isOpen
            subFolder = @createFolder(folderName)
            @parseV3 "position", obj.position, null, isOpen, call, subFolder
            @parseV3 "rotation", obj.rotation, null, isOpen, call, subFolder
            @parseV3 "scale", obj.scale, null, isOpen, call, subFolder

        # Simple value
        parseVal: (folderName, value, minMax, isOpen, call) =>
            o = {}
            o[folderName] = value
            subFolder = @createFolder(folderName)
            if isOpen then subFolder.open() else subFolder.close()
            mM = @getMinMaxValues(minMax, o[folderName])
            p = subFolder.add(o, folderName, mM.min, mM.max)
            new DatEvent(p, folderName, call)

        # color
        parseColor: (folderName, value, minMax, isOpen, call) =>
            o = {}
            o[folderName] = [ Util.UnitToRGB(value.r), Util.UnitToRGB(value.g), Util.UnitToRGB(value.b) ]
            subFolder = @createFolder(folderName)
            if isOpen then subFolder.open() else subFolder.close()
            p = subFolder.addColor(o, folderName)
            new DatEvent(p, folderName, call)

        # vector3
        parseV3: (folderName, obj, minMax, isOpen, call, folder) =>
            o = {}
            o["x"] = obj.x
            o["y"] = obj.y
            o["z"] = obj.z
            subFolder = @createFolder(folderName, folder)
            if isOpen then subFolder.open() else subFolder.close()
            mMx = @getMinMaxValues(minMax, o["x"])
            mMy = @getMinMaxValues(minMax, o["y"])
            mMz = @getMinMaxValues(minMax, o["z"])
            @addSubFolderItems ["x", "y", "z"], o, [mMx, mMy, mMz], subFolder, folderName, call

        # vector2
        parseV2: (folderName, obj, minMax, isOpen, call) =>
            o = {}
            o["x"] = obj.x
            o["y"] = obj.y
            subFolder = @createFolder(folderName)
            if isOpen then subFolder.open() else subFolder.close()
            mMx = @getMinMaxValues(minMax, o["x"])
            mMy = @getMinMaxValues(minMax, o["y"])
            @addSubFolderItems ["x", "y"], o, [mMx, mMy], subFolder, folderName, call

        # shader properties generator
        parse: (folderName, obj, minMax, isOpen, call)=>
            datFolder = @createFolder(folderName)
            if isOpen then datFolder.open() else datFolder.close()
            for k, v of obj
                @addToGui(k, v, obj, datFolder, minMax, call)

        getMinMaxValues: (minMax, v) =>
            mM = {}
            if minMax?
                mM = { min:minMax[0], max:minMax[1] }
            else
                min = 0
                max = 0
                if Util.IsInt(v)
                    if v is 0
                        min = -100
                        max = 100
                    else
                        val = Math.abs(v) * 4
                        min = -val
                        max = val
                else
                    val = Math.abs(v) * 4
                    min = -val
                    max = val
                mM = { min:min, max:max }
            return mM

        createFolder: (folderName, parentFolder)=>
            rootF = if !parentFolder? then @rootFolder else parentFolder
            folder = rootF.addFolder(folderName)
            return folder

        addToGui: (k, v, obj, folder, minMax, call)=>

            if Util.ToType(v) is "function" or Util.ToType(v) is "undefined" or Util.ToType(v) is "null" or Util.ToType(v) is "string" or Util.ToType(v) is "array" then return

            if !v? then return
            if !k? then return

            if v.type is "f" or v.type is "i"
                o = {}
                o[k] = v.value
                mM = @getMinMaxValues(minMax, v.value)
                p = folder.add(o, k, mM.min, mM.max)
                new DatEvent(p, k, call)
            if v.type is "c"
                o = {}
                o[k] = [ Util.UnitToRGB(v.value.r), Util.UnitToRGB(v.value.g), Util.UnitToRGB(v.value.b) ]
                p = folder.addColor(o, k)
                new DatEvent(p, k, call)

        addSubFolderItems: (items, obj, minMax, subFolder, parentId, call) =>
            j = 0
            for i in items
                item = subFolder.add(obj, i, minMax[j].min, minMax[j].max)
                new DatEvent(item, i, call, parentId)
                j++

    return DatParser
