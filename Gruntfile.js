/*
 * grunt-svg-modify
 * https://github.com/yoksel/grunt-svg-modify
 *
 * Copyright (c) 2014 yoksel
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            temp: ["temp"],
            result: ['test/result']
        },

        svg_modify: {
            noconfig: {
                cwd: "test/",
                src: "sources/noconfig/",
                dest: "result/"
            },
            colorize: {
                cwd: "test/",
                src: "sources/colorize/",
                dest: "result/"
            },
            defaults: {
                cwd: "test/",
                src: "sources/defaults/",
                dest: "result/"
            },
            variations: {
                cwd: "test/",
                src: "sources/variations/",
                dest: "result/"
            },
            combo: {
                cwd: "test/",
                src: "sources/combo/",
                dest: "result/"
            },
            // sources: {
            //     cwd: "test/",
            //     src: "sources/",
            //     dest: "result/"
            // }

        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['svg_modify', "clean:temp"]);

    // By default, lint and run all tests.
    grunt.registerTask('lint', ['jshint']);

};