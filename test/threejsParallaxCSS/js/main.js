$(function() {

	$(window).on('resize', onResize);
	$(window).on('scroll', onScroll);
	$(window).on('mousemove', onMouseMove);

	var stats;

	var rendererBottom;
	var sceneBottom;
	var cameraBottom;
	var rendererTop;
	var sceneTop;
	var cameraTop;
	var backgroundContainer;
	var middleContainer;
	var foregroundContainer;
	var projector = new THREE.Vector3(0, 0, 0);
	var mouse = new THREE.Vector2(0, 0, 0);
	var raycaster = new THREE.Raycaster()
	var tanFOV;
	var FIX_HEIGHT = 0.529;
	var clearColor = new THREE.Color(0xd6d6d6);
	var HEIGHT = 6000;
	var scrollTop = 0;
	var lastScrollY = 0;

	var ticking = false;

	var girl;
	var parfume;
	var bottomBottle;
	var mandarine;

	var flower, flower2, flower3, flower4;
	
	init();
	render();

	function init() {

		// BOTTOM
		sceneBottom = new THREE.Scene();
		cameraBottom = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
		cameraBottom.position.set(0, 0, 1);
		rendererBottom = new THREE.CSS3DRenderer();
		rendererBottom.setSize( window.innerWidth, window.innerHeight );
		$("#bottomContainer").append(rendererBottom.domElement);
		rendererBottom.setClearColor( clearColor, 1 );
		rendererBottom.gammaInput = true
        rendererBottom.gammaOutput = true
        // rendererBottom.autoClear = false
		backgroundContainer = new THREE.Group()
		sceneBottom.add(backgroundContainer);
		// middleContainer = new THREE.Group()
		// sceneBottom.add(middleContainer);
		// foregroundContainer = new THREE.Group()
		// sceneBottom.add(foregroundContainer);

		// // TOP
		// sceneTop = new THREE.Scene();
		// cameraTop = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
		// cameraTop.position.set(0, 0, 1); 
		// rendererTop = new THREE.WebGLRenderer({antialias: true, clearAlpha: 1, alpha: true, premultipliedAlpha: false});
		// rendererTop.setSize( window.innerWidth, window.innerHeight );
		// $("#topContainer").append(rendererTop.domElement);
		// rendererTop.setClearColor( clearColor, 0 );
		// rendererTop.gammaInput = true
  //       rendererTop.gammaOutput = true
  //       rendererTop.autoClear = false
		// foregroundContainer = new THREE.Group()
		// sceneTop.add(foregroundContainer);

		// Remember these initial values
		tanFOV = Math.tan( ( ( Math.PI / 180 ) * cameraBottom.fov / 2 ) );

		setupBackground();
		setupMiddleContainer();
		setupForegroundContainer();

		// stats = new Stats();
  //       $("body").append(stats.domElement);
  //       stats.domElement.style.position = 'fixed';
		// stats.domElement.style.left = '0px';
		// stats.domElement.style.top = '0px';
		// stats.domElement.style.zIndex = 10;

		onScroll();
		onResize();
	}

	function setupBackground() {
		var planeWidth = 243;
		var geometry = new THREE.PlaneBufferGeometry( planeWidth, 5.5);
		var material = new THREE.MeshBasicMaterial( { color: 0xf1f1f1 } );
		var cubeNum = Math.round(window.innerWidth / 240);
		if (isOdd(cubeNum)) cubeNum++

		// Adding cubes
		cubeWidth = planeWidth * 1.004;
		evenCounter = 0;
		oddCounter = 0;
		for (var i = 0; i < cubeNum; i++) {
			var c = new THREE.Mesh( geometry, material );
			backgroundContainer.add( c );

			var posX;
			if (isEven(i)) {
				posX = (cubeWidth / 2) + (evenCounter * cubeWidth);
				posX = posX
				evenCounter++;
			} else {
				posX = (cubeWidth / 2) + (oddCounter * cubeWidth);
				posX = -posX
				oddCounter++;
			}

			c.position.x = posX;
		};
	}

	function setupMiddleContainer() {
		var diorGirlTexture = THREE.ImageUtils.loadTexture("img/dior_girl.png");
		var girlMaterial = new THREE.SpriteMaterial( { map: diorGirlTexture } );
        girl = new THREE.Sprite( girlMaterial );
        girl.width = 518;
        girl.height = 458;
        girl.scale.x = girl.width * 1;
        girl.scale.y = girl.height * 1;
        girl.position.x = 300;
        sceneBottom.add( girl );

        var diorParfumeTexture = THREE.ImageUtils.loadTexture("img/dior_parfume.png");
		var parfumeMaterial = new THREE.SpriteMaterial( { map: diorParfumeTexture } );
        parfume = new THREE.Sprite( parfumeMaterial );
        parfume.width = 507;
        parfume.height = 892;
        parfume.scale.x = parfume.width * 1;
        parfume.scale.y = parfume.height * 1;
        parfume.position.x = -300;
        sceneBottom.add( parfume );

        var diorMandarineTexture = THREE.ImageUtils.loadTexture("img/dior_mandarine.png");
		var mandarineMaterial = new THREE.SpriteMaterial( { map: diorMandarineTexture } );
        mandarine = new THREE.Sprite( mandarineMaterial );
        mandarine.width = 260;
        mandarine.height = 237;
        mandarine.scale.x = mandarine.width * 1;
        mandarine.scale.y = mandarine.height * 1;
        mandarine.position.x = 200;
        sceneBottom.add( mandarine );

        var diorBottomTexture = THREE.ImageUtils.loadTexture("img/dior_bottom.png");
		var bottomMaterial = new THREE.SpriteMaterial( { map: diorBottomTexture } );
        bottomBottle = new THREE.Sprite( bottomMaterial );
        bottomBottle.width = 344;
        bottomBottle.height = 333;
        bottomBottle.scale.x = bottomBottle.width * 1;
        bottomBottle.scale.y = bottomBottle.height * 1;
        bottomBottle.position.x = -68;
        sceneBottom.add( bottomBottle );
	}

	function setupForegroundContainer() {
		var diorFlowerTexture = THREE.ImageUtils.loadTexture("img/dior_flower.png");
		var flowerMaterial = new THREE.SpriteMaterial( { map: diorFlowerTexture } );
        flower = new THREE.Sprite( flowerMaterial );
        flower.width = 299;
        flower.height = 308;
        flower.scale.x = flower.width * 1;
        flower.scale.y = flower.height * 1;
        flower.position.x = -400;
        sceneBottom.add( flower );

		var flowerMaterial2 = flowerMaterial.clone()
        flower2 = new THREE.Sprite( flowerMaterial2 );
        flower2.width = 299;
        flower2.height = 308;
        flower2.scale.x = -flower2.width * 0.8;
        flower2.scale.y = flower2.height * 0.8;
        flower2.position.x = 300;
        sceneBottom.add( flower2 );

        var flowerMaterial3 = flowerMaterial.clone()
        flower3 = new THREE.Sprite( flowerMaterial3 );
        flower3.width = 299;
        flower3.height = 308;
        flower3.scale.x = flower3.width * 0.8;
        flower3.scale.y = flower3.height * 0.8;
        flower3.position.x = -300;
        sceneBottom.add( flower3 );

        var flowerMaterial4 = flowerMaterial.clone()
        flower4 = new THREE.Sprite( flowerMaterial4 );
        flower4.width = 299;
        flower4.height = 308;
        flower4.scale.x = -flower4.width * 0.8;
        flower4.scale.y = flower4.height * 0.8;
        flower4.position.x = 300;
        sceneBottom.add( flower4 );
	}

	function onUpdate() {
		var relativeY = lastScrollY / $(document).height();

		girl.position.y = pos(100, 3100, relativeY, 0)
		parfume.position.y = pos(-2100, 4800, relativeY, 0)
		mandarine.position.y = pos(-4000, 5600, relativeY, 0)
		bottomBottle.position.y = pos(-5660, 6450, relativeY, 0)

		flower.position.y = pos(-100, 2400, relativeY, 0)
		flower2.position.y = pos(-1800, 4200, relativeY, 0)
		flower3.position.y = pos(-3300, 3800, relativeY, 0)
		flower4.position.y = pos(-5500, 5450, relativeY, 0)

		ticking = false;
	}

	function pos(base, range, relY, offset) {
		return base + limit(-2, 2, relY - offset) * range;
	}

	function limit(min, max, value) {
		return Math.max(min, Math.min(max, value));
	}

	function resizeObjects() {
		// Resize backgroundContainer
		scaleY = (window.innerHeight / FIX_HEIGHT) * 1;
		backgroundContainer.scale.y = scaleY;
	}

	function render() {

		// stats.begin();

		onUpdate();
		// rendererBottom.clear( clearColor, 1 );
		rendererBottom.render( sceneBottom, cameraBottom );

    	// stats.end();

		// rendererTop.clear( clearColor, 0 );
		// rendererTop.render( sceneTop, cameraTop );
	}

	function onResize(e) {

		cameraBottom.aspect = window.innerWidth / window.innerHeight;
	    cameraBottom.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / FIX_HEIGHT ) );
	    cameraBottom.updateProjectionMatrix();
	    cameraBottom.lookAt( sceneBottom.position );
	    rendererBottom.setSize( window.innerWidth, window.innerHeight );

	    // cameraTop.aspect = window.innerWidth / window.innerHeight;
	    // cameraTop.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / FIX_HEIGHT ) );
	    // cameraTop.updateProjectionMatrix();
	    // cameraTop.lookAt( sceneTop.position );
	    // rendererTop.setSize( window.innerWidth, window.innerHeight );


	    
	    resizeObjects();
	}

	function onScroll(e) {
		// scrollTop = $(window).scrollTop();

		if(!ticking) {
	      ticking = true;
	      requestAnimationFrame(render);
	      lastScrollY = window.scrollY;
	    }
		// console.log(scrollTop, $(document).height(), $(window).height(), $(document).height() - $(window).height());
	}

	function onMouseMove(e) {
		e.preventDefault();
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	}

	function isEven(n) {
	   return isNumber(n) && (n % 2 == 0);
	}

	function isOdd(n) {
	   return isNumber(n) && (Math.abs(n) % 2 == 1);
	}

	function isNumber(n) {
	   return n == parseFloat(n);
	}

});