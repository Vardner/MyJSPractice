module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Uglify you js
    uglify: {
      dev: {
        src: 'src/**/*.js',
        dest: 'dist/js/common.min.js',
        options: {
          mangle: false,
          beautify: true,
          compress: false
        }
      },
      prod: {
        src: 'src/**/*.js',
        dest: 'dist/js/common.min.js',
      }
    },

    //Minify you images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/images/'
        }]
      }
    },

    eslint: {
      files: {
        src: ['src/js/**/*.js'],
        options: {
          configFile: 'eslint.json',
          fix: false,
          rulesdir: ['eslint_rules'],
          es6: true
        }
      }

    },

    //Sass to css
    sass: {                              // Task
      dist: {                            // Target
        options: {
          style: 'compressed',
          update: true
        },
        files: {                         // Dictionary of files
          './dist/css/style.css': './src/styles/style.scss'
        }
      }
    },
    // Base html build
    htmlbuild: {
      dev: {
        src: 'src/views/*.html',
        dest: 'dist/',
        options: {
          basePath: 'src/views/'
        }
      }
    },

    //Post process autoprefix
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      main: {
        expand: true,
        flatten: true,
        src: 'dist/css/*.css',
        dest: 'dist/css/'
      }
    },

    //Auto-watching you changes (type CTRL + S for save changes & it`ll work)
    watch: {
      //Scripts change
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['uglify:dev']

      },
      //Less files change
      css: {
        files: ['src/**/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      //HTML files change
      html: {
        files: ['src/views/*.html'],
        tasks: ['htmlbuild']
      }
    }

  });

  //Load Tasks
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');

  //Register Tasks
  grunt.registerTask('default', ['eslint', 'uglify:dev', 'imagemin', 'sass', 'autoprefixer', 'htmlbuild']);
  grunt.registerTask('DebugJS', []);
};