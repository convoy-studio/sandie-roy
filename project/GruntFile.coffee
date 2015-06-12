"use strict"
path = require("path")
folderMount = folderMount = (connect, point) ->
  connect.static path.resolve(point)

module.exports = (grunt) ->

  # .coffee
  grunt.event.on "watch", (action, filepath) ->
    if filepath.match(/.coffee$/)
      newFilePath = filepath.replace(".coffee", ".js")
      newFilePath = newFilePath.replace(/^src\/coffee/, "www/js")
      files = {}
      files[newFilePath] = filepath
      grunt.config "coffee.all.files", files

    # .scss
    if filepath.match(/.scss$/)
      sassDir = filepath
      cssDir = filepath

      # src/
      sassDir = sassDir.replace(/^src\/sass\/.*/, "src/sass/")
      cssDir = cssDir.replace(/^src\/sass\/.*/, "www/css/")
      grunt.config "compass.all.options.sassDir", sassDir
      grunt.config "compass.all.options.cssDir", cssDir

  grunt.initConfig

    # JS
    coffee:
      all:
        options:
          bare: true

      compile:
        options:
          bare: true

        files: [
          expand: true
          cwd: "src/coffee/"
          src: ["**/*.coffee"]
          dest: "www/js/"
          ext: ".js"
        ]

    uglify:
      www:
        files: [
          expand: true
          cwd: "www/js"
          src: "**/*.js"
          dest: ""
        ]

      deploy:
        options:
          mangle: false
          beautify: true

        files:
          "deploy/prod/style/js/scripts.min.js": ["deploy/prod/js/scripts.js"]

    strip:
      main:
        src: "www/js/app.min.js"
        dest: "www/js/app.min.js"

    copy:
      main:
        expand: true
        src: ["www/**/*"]
        dest: "deploy/"
        filter: "isFile"

      deploy:
        expand: false
        src: ["deploy/prod/js/scripts.js"]
        dest: "deploy/prod/style/js/"
        filter: "isFile"

    # CSS
    compass:
      all:
        options: {}

      compile:
        options:
          config: "config.rb"

    cssmin:
      min:
        files:
          "www/css/app.min.css": ["www/css/app.css"]

    # require deploy
    requirejs:
      deploy:
        options:
          name: "Main"
          baseUrl: "deploy/www/js"
          mainConfigFile: "deploy/www/js/Main.js"
          optimize: "uglify2"
          uglify2:
            output:
              beautify: false
          beautify: false
          preserveLicenseComments: false
          out: "deploy/www/js/scripts.min.js"

    # snapshot
    htmlSnapshot:
      all:
        options:
          snapshotPath: 'www/snapshot/'
          sitePath: 'http://localhost'
          fileNamePrefix: 'index'
          msWaitForPages: 1000
          urls: ['']

    # remove logs
    removelogging:
      dist:
        src: "deploy/www/js/scripts.js",
        dest: "deploy/www/js/scripts.min.js",

    # image minification
    imagemin:
      deploy:
        options:
          pngquant: true
          progressive: true
          optimizationLevel: 7
        files: [{
          expand: true
          cwd: 'deploy/www/image'
          src: ['**/*.{png,gif,jpeg,jpg,svg}']
          dest: 'deploy/www/imagetemp'
        }]

    # svg minify
    svgmin:
      dist:
        files: [
          expand: true
          cwd: "www/image/svg"
          src: ["**/*.svg"]
          dest: "www/image/svg"
        ]

    # shell
    shell:
      updateMain:
        command: [
          "cd py"
          "python updateMain.py"
          "cd .."
        ].join("&&")
      uglifyDeploy:
        command: [
          "cd py"
          "python uglify.py"
          "cd .."
        ].join("&&")
      updatePackages:
        command: [
          "cd py"
          "python updatePackages.py"
          "cd .."
        ].join("&&")
      updateLoadFiles:
        command: [
          "cd py"
          "python updateLoadFiles.py"
          "cd .."
        ].join("&&")
      updateRequireFiles:
        command: [
          "cd py"
          "python updateRequireData.py"
          "cd .."
        ].join("&&")
      minifyHtml:
        command: [
          "cd py"
          "python minifyHtml.py"
          "cd .."
        ].join("&&")
      renameImgFolder:
        command: [
          "rm -rf deploy/www/image"
          "mv -v deploy/www/imagetemp deploy/www/image"
        ].join("&&")

    # replace
    replace:
      logs:
        overwrite: true
        src: ["deploy/www/js/app/**/*.js"]
        replacements: [
          from: /console.(log)\((.*)\);/g
          to: " "
        ]
      livereload:
        overwrite: true
        src: ["deploy/www/index.html"]
        replacements: [
          from: '<script src="http://localhost:35729/livereload.js"></script>'
          to: ""
        ]
      html:
        overwrite: true
        src: ["deploy/www/index.html"]
        replacements: [
          from: "js/main"
          to: "js/scripts.min"
        ]

    # CLEAN folders & files
    clean:
      beforedeploy: ["deploy"]
      deploy: ["deploy/www/js/app", "deploy/www/js/Main.js", "deploy/www/php/capture", "deploy/www/js/scripts.js", "deploy/www/component", "deploy/www/image/normal", "deploy/www/image/retina"]
      # deploy: ["deploy/www/image/normal", "deploy/www/image/retina"]
      php: ["deploy/www/php/helper", "deploy/www/php/carParser.php", "deploy/www/php/globalParser.php"]

    # WATCH & LIVERELOAD
    watch:
      coffee:
        options:
          spawn: false
          livereload: true

        files: ["src/coffee/**/*.coffee"]
        tasks: ["coffee:all", "shell:updateMain"]

      sass:
        options:
          spawn: false
          livereload: true

        files: ["src/sass/**/*.scss"]
        tasks: ["compass:all"]

      partial:
        options:
          spawn: false
          livereload: true

        files: [
          "www/partial/**/*"
        ]
        tasks: ["build"]

      www:
        options:
          spawn: false
          livereload: true

        files: [
          # "www/data/data.json"
          # "www/data/debug.json"
          # "www/data/scene/*.json"
          # "www/data/spline/*.json"
          "www/js/app/shader/*.frag"
          "www/js/app/shader/*.vert"
          "www/index.html"
        ]
        tasks: ["build"]

    # CONCURRENT BUILD
    concurrent:
      build: [
        "svgmin"
        "coffee:compile"
        "compass:compile"
        "shell:updateMain"
        "shell:updateLoadFiles"
      ]
      deployImg: [
        "shell:renameImgFolder"
      ]

  grunt.file.expand("node_modules/grunt-*/tasks").forEach grunt.loadTasks

  grunt.registerTask "build", [ "concurrent:build", "shell:updateRequireFiles", "shell:updatePackages" ]
  grunt.registerTask "default", [ "build", "watch" ]
  grunt.registerTask "deploy", [ "clean:beforedeploy", "concurrent:build", "copy:main", "replace:logs", "requirejs:deploy", "replace:html", "clean:deploy", "replace:livereload", "imagemin:deploy", "concurrent:deployImg", "shell:minifyHtml", "clean:php", "shell:uglifyDeploy"]
  # grunt.registerTask "deploy", [ "clean:beforedeploy", "concurrent:build", "copy:main", "replace:logs", "requirejs:deploy", "clean:deploy", "replace:livereload", "imagemin:deploy", "concurrent:deployImg", "shell:minifyHtml", "clean:php", "shell:uglifyDeploy"]
