module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    srcFileGlob: "src/**/*.ts",
    clean: {
      build: ['build/']
    },
    mkdir: {
      options: {
        create: ['build']
      }
    },
    tslint: {
      options: {
        configuration: grunt.file.readJSON('tslint.json')
      },
      files: {
        src: ['<%= srcFileGlob %>']
      }
    },
    typescript: {
      base: {
        src: ['src/<%= pkg.name %>.ts'],
        dest: 'build/<%= pkg.name %>-no-tpl.js',
        options: {
          declaration: true
        }
      },
      tests: {
        src: ['test/**/*_spec.ts']
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      src: {
        files: ['<%= srcFileGlob %>', 'src/**/*.tpl.html'],
        tasks: ['base', 'karma:unit:run']
      },
      tests: {
        files: ['test/unit/**/*.ts'],
        tasks: ['typescript:tests','karma:unit:run']
      },
      styles: {
        files: ['styles/**/*.scss'],
        tasks: ['sass']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      },
      now: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    html2js: {
      options: {
        base: ''  
      },
      main: {
        src: ['templates/**/*.tpl.html'],
        dest: 'build/templates.js'
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= typescript.base.dest %>', '<%= html2js.main.dest %>'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    sass: {
      dist: {
        files: {
          "styles/main.css": "styles/main.scss"
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('base', ['tslint', 'clean', 'mkdir', 'typescript', 'html2js', 'concat', 'uglify']);
  grunt.registerTask('default', ['base', 'karma:now', 'sass']);
  grunt.registerTask('w', ['karma:unit', 'watch']);
  grunt.registerTask('wt', ['karma:unit', 'watch:tests']);
};