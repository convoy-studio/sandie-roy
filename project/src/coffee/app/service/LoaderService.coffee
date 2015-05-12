define ["preloadjs"], (PreloadJS) ->

    "use strict"
    
    class LoaderService

        queue: undefined
        geometryCollection: {}

        constructor: () ->
            @queue = new PreloadJS()
            @queue.on("complete", @onLoadCompleted)
            @queue.on("progress", @onLoadProgress)

        load: (manifest, onLoaded, onProgress) =>

            @queue.onLoaded = onLoaded
            @queue.onProgress = onProgress

            @queue.loadManifest manifest

        pushGeometry: (id, g, mat)=>
            g = {geometry:g, material: mat}
            @geometryCollection[id] = g

        getImageURL: (id) =>
            return $(@queue.getResult(id)).attr("src")

        getTexture: (id) =>
            img = @getContentById(id)
            texture = new THREE.Texture(img)
            texture.needsUpdate = true
            return texture

        getShader: (id) =>
            return @getContentById(id)

        getSvg: (id) =>
            return @getContentById(id+"-svg")

        getCubeTexture: (id) =>
            urls = [
                @getImageURL(id + "-px-cubemap"), @getImageURL(id + "-nx-cubemap"),
                @getImageURL(id + "-py-cubemap"), @getImageURL(id + "-ny-cubemap"),
                @getImageURL(id + "-pz-cubemap"), @getImageURL(id + "-nz-cubemap")
            ]
            return THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() )

        getGeometry: (id) =>
            return @geometryCollection[id].geometry.clone()

        getMesh: (id) =>
            t = @geometryCollection[id]
            m = new THREE.Mesh(t.geometry, new THREE.MeshFaceMaterial(t.material))
            return m

        getContentById: (id) =>
            return @queue.getResult id

        onLoadCompleted: (e) =>
            q = @queue
            q.onLoaded?(e.currentTarget)

        onLoadProgress: (e) =>
            q = @queue
            q.onProgress?()

    return LoaderService
