/*
 * grunt-svg-modify
 * https://github.com/yoksel/grunt-svg-modify
 *
 * Copyright (c) 2014 yoksel
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    svgmodify = require("svg-modify"),
    mustache = require("mustache"),
    open = require("open");

module.exports = function(grunt) {

    grunt.registerMultiTask('svg_modify', 'Resize and colorize svg-images', function() {

        var cwd = this.data.cwd,
            src = cwd + this.data.src,
            dest = cwd + this.data.dest,
            currentFolder = __dirname,
            templatesFolder = path.resolve(currentFolder, "../templates"),
            assetsFolder = path.resolve(currentFolder, "../assets"),
            options = this.options({
                previewFile: true
            });

        function getFolder(filePath) {
            var pathArray = filePath.split(path.sep);
            return pathArray[pathArray.length - 2];
        }

        function createControlPage(dest, folderName, color) {

            var folderPath = dest + folderName;
            var files = grunt.file.expand(folderPath + "**/*.svg");
            var svgs = "";
            var resultSvg = [];

            files.forEach(function(filePath) {
                var fileContent = grunt.file.read(filePath);
                var fileName = path.basename(filePath);
                svgs += "<span class=\"svg-item\"><b>" + fileName + "</b>" + fileContent + "</span>";
            });

            resultSvg.push({
                "name": folderName,
                "color": color,
                "content": svgs
            });

            var destIndex = dest + folderName + "/index.html";
            var indexTemplate = grunt.file.read(templatesFolder + "/index.html");
            var jsFile = grunt.file.read(assetsFolder + "/script.js");
            var cssFile = grunt.file.read(assetsFolder + "/style.css");

            var indexData = {
                "js": jsFile,
                "css": cssFile,
                "resultSvg": resultSvg
            };

            var outputIndex = mustache.render(indexTemplate, indexData);
            grunt.file.write(destIndex, outputIndex, "utf8");

            open(destIndex);

        }

        function processFolder(folderPath) {
            var configPath = grunt.file.expand(folderPath + "/*.json")[0];
            var folderName = path.basename(folderPath);

            if (!configPath) {
                grunt.log.error("No config in folder '" + folderName + "'");
                return;
            }

            var changesParams = {
                "inputFolder": folderPath,
                "outputFolder": dest
            };

            var folderOptionsFile = grunt.file.readJSON(configPath);
            var folderOptions = {};

            var defaults = folderOptionsFile["defaults"];
            var variations = folderOptionsFile["variations"];
            var color = folderOptionsFile["defaultColor"];

            // colorize after setting defaults
            if (color) {
                changesParams["defaultColor"] = color;
            }

            if (defaults && variations) {

                // 1. defaults
                changesParams["inputFolder"] = folderPath;
                changesParams["outputFolder"] = "temp/";
                changesParams["folderOptions"] = defaults;

                svgmodify.makeChanges(changesParams);

                // 2. variations
                changesParams["inputFolder"] = "temp/" + folderName;
                changesParams["outputFolder"] = dest;
                changesParams["folderOptions"] = variations;
                changesParams["defaultColor"] = "";

                svgmodify.makeChanges(changesParams);

            } else {

                if (defaults) {
                    folderOptions = defaults;
                } else if (variations) {
                    folderOptions = variations;
                }
                changesParams["folderOptions"] = folderOptions;
                svgmodify.makeChanges(changesParams);

            }

            if(options.previewFile) createControlPage(dest, folderName, color);

        }

        //--------------------------------------------

        // if files exist in scr folder
        var sources = grunt.file.expand(src + "*.svg");

        if (sources.length > 0) {
            processFolder(src);
        }

        // if folders exist in scr folder
        var folders = grunt.file.expand(src + "*/");

        if (folders.length > 0) {
            folders.forEach(function(folderPath) {
                processFolder(folderPath);
            });
        }
    });

};