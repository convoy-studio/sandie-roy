
'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var WerkstattGenerator = yeoman.generators.NamedBase.extend({

  init: function (name, partialUrl) {
    var nameParts = name.split("/");

    this.name = name;
    this.className = nameParts[nameParts.length-1];
    this.slugName = this._.slugify(this.className.replace(/([A-Z])/g, ' $1'))
    this.partialUrl = this.name.toLowerCase();

    console.log('You called the page subgenerator with the argument = ' + this.name + ' and partialUrl = ' + this.partialUrl);

  },

  files: function () {

    var cb = this.async();
    var coffeeUrl = "../src/coffee/app/view/page/project/"
    var partialBaseUrl = "../www/partial/page/project"
    var cssBaseUrl = "../src/sass/page/project/"
    var videoBaseUrl = "../www/video/page/project/"
    var imageBaseUrl = "../www/image/page/project/"

    this.copy('_partial.html', partialBaseUrl + "/" + this.slugName + '.html');
    this.copy('_project.coffee', coffeeUrl + this.name + '.coffee');
    this.copy('_style.scss', cssBaseUrl + "_" + this.name.toLowerCase() + '.scss');
    this.copy('_video.mp4', videoBaseUrl + this.slugName + "/" + "top" + '.mp4');
    this.copy('_image.png', imageBaseUrl + this.slugName + "/" + "dummy" + '.png');

    cb();

  }
});

module.exports = WerkstattGenerator;
