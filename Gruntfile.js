module.exports = function(grunt) {
    'use strict';

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        cssPath: 'assets/stylesheets/css',
        sassPath: 'assets/stylesheets/sass',
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n'
        },

        sass: {
            dist: {
                    files: {
                            '<%= cssPath %>/main.css': '<%= sassPath %>/main.scss'
                    }
            }
        },

        cssmin: {
            compress: {
                    files: {
                            '<%= cssPath %>/main.min.css': [ '<%= cssPath %>/main.css' ]
                    }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            scss: {
                files: ['<%= sassPath %>/*.scss'],
                tasks: 'sass'
            },
            livereload: {
                files: [
                    '<%= cssPath %>/main.css',
                    'js/**/*.js',
                    '*.html'
                ]
            }
        }


    });

    // Default task
    grunt.registerTask('default', 'watch');

    // Build task
    grunt.registerTask('build', ['sass', 'cssmin']);
};
