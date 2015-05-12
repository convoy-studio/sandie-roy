define ["TrackballControls"], (TrackballControls) ->

    "use strict"
    
    class SceneHelper

        controls: undefined
        grid: undefined
        cameraHelper: undefined
        enabled: false
        container: undefined
        lightHelpers: undefined
        sphere: undefined

        constructor: () ->

        init: =>
            console.log "hello"
            Signal.onUpdate.add @onUpdate
            Signal.onKeyPressed.add @onKeyPressed

            @ready()

        ready: =>
            @container = new THREE.Group()
            Canvas.add @container

            @grid = new THREE.GridHelper 500, 25
            @container.add @grid

            @controls = new THREE.TrackballControls(Camera.camera, Renderer.element[0])
            @controls.rotateSpeed = 1.0
            @controls.zoomSpeed = 1.2
            @controls.panSpeed = 0.8
            @controls.noZoom = false
            @controls.noPan = false
            @controls.staticMoving = true
            @controls.dynamicDampingFactor = 0.3
            @controls.keys = [ 65, 83, 68 ]

            @sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 100), new THREE.MeshNormalMaterial())
            @container.add @sphere
            @sphere.position.set(0, 0, 800)

            # Lights Helper
            @lightHelpers = []
            sceneLights = Scene.scene.__lights
            for light in sceneLights
                # console.log light.position
                currentLight = light
                if light instanceof THREE.DirectionalLight
                    l = new THREE.DirectionalLightHelper(currentLight, 120)
                    l.update()
                # # if light instanceof THREE.PointLight
                # #     l = new THREE.PointLightHelper(light)
                # if l?
                #     console.log l
                #     @lightHelpers.push(l)
                #     @container.add l


            # Camera Helper
            @cameraHelper = new THREE.CameraHelper(Camera.camera)
            # @container.add @cameraHelper

        onKeyPressed: (e) =>
            e.preventDefault()
            if e.keyCode is 103 # g
                @enabled = if @enabled then false else true

        onUpdate: =>
            if @enabled

                # @controls.update()
                # @cameraHelper.update()

                # for light in @lightHelpers
                #     console.log light.position
                #     light.update()

                cameraPos = Camera.camera.position
                @grid.position.set(0, 0, cameraPos.z)

                # @sphere.position.set(cameraPos.x, cameraPos.y, cameraPos.z+600)

                Util.ToggleVisibility(@container, true)
            else
                Util.ToggleVisibility(@container, false)

        destroy: =>

    return SceneHelper
