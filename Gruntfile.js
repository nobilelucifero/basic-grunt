module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // 2. Configuration for concatinating files goes here.

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      your_target: {
      // Target-specific file lists and/or options go here.
      },
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'js/libs/*.js',  // All JS in the libs folder
          'js/functions.js'  // This specific file
        ],
        dest: 'js/_build/production.js',
      },
    },

    uglify: {
      build: {
        src: 'js/_build/production.js',
        dest: 'js/_build/production.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/build/'
        }]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/build/global.css': 'css/global.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['index.html'],
      }
    },

    connect: {
      // keepalive: true,
      server: {
        options: {
          port: 8000,
          base: './'
        }
      }
    }

  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'watch']);
  grunt.registerTask('dev', ['connect', 'watch']);

};
