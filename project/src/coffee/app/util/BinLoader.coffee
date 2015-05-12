define [], () ->

    "use strict"
    
    class BinLoader

        id: undefined
        callback: undefined

        constructor: () ->

        load: (id, cb)=>
            @id = id
            @callback = cb
            url = "model/"+id+".js"
            l = new THREE.JSONLoader()
            l.load(url, @onLoadCompleted)

        onLoadCompleted: (g, mat) =>
            @callback(@id, g, mat)

    return BinLoader
