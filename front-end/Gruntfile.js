// Generated on 2013-11-14 using generator-angular 0.5.1
'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		yeoman: {
			// configurable paths
			app: 'app',
			dist: 'dist',
			api: 'pac-info.herokuapp.com'
		},
		watch: {
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			styles: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
				tasks: ['copy:styles', 'autoprefixer']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
		autoprefixer: {
			options: ['last 1 version'],
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: '0.0.0.0',
				livereload: 35729
			},
			proxies: [
				{
					context: '/ventures',
					host: '<%= yeoman.api %>',
					changeOrigin: true,
					xforward: true
				}
			],
			livereload: {
				options: {
					open: true,
					debug: true,
					base: [
						'.tmp',
						'<%= yeoman.app %>'
					],
					middleware: function (connect, options) {
						var middlewares = [proxySnippet];
						options.base.forEach(function(base) {
							// Serve static files.
							middlewares.push(connect.static(base));
						});
						return middlewares;
					}
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
						'.tmp',
						'test',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					debug: true,
					base: ['<%= yeoman.dist %>'],
					middleware: function (connect, options) {
						var middlewares = [proxySnippet];
						options.base.forEach(function(base) {
							// Serve static files.
							middlewares.push(connect.static(base));
						});
						return middlewares;
					}
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			]
		},
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: '<%= yeoman.app %>/bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			dist: {}
		},*/
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},
		uncss: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': ['<%= yeoman.dist %>/Index.html']
				},
				options: {
					ignore: [
						'.carousel-inner>.active',
						'.carousel-inner>.active.left',
						'.carousel-inner>.active.right',
						'.carousel-inner>.next',
						'.carousel-inner>.next.left',
						'.carousel-inner>.prev',
						'#nprogress .bar',
						'#nprogress .peg',
						'.navbar-fixed-top',
						'.navbar-collapse.in',
						'.navbar-collapse.collapse',
						'.navbar-collapse.collapsing'
						]
				}
			}
		},
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: ['*.html', 'views/*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'bower_components/**/*',
						'images/{,*/}*.{gif,webp}',
						'styles/fonts/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: [
						'generated/*'
					]
				}]
			},
			publish: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.dist %>',
					dest: '../public/',
					src: ['**', '**/bower_components/**']
				}, {
					expand: true,
					cwd: '<%= yeoman.dist %>',
					dest: '../public/',
					src: [
						'images/*'
					]
				}, {
					expand: true,
					cwd: '<%= yeoman.app %>',
					dest: '../public/',
					src: [
						'images/*'
					]
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},
		concurrent: {
			server: [
				'compass:server',
				'copy:styles',
			],
			test: [
				'compass',
			],
			dist: [
				'compass:dist',
				'copy:styles',
				'imagemin',
				'htmlmin'
			]
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>/scripts',
					src: '*.js',
					dest: '<%= yeoman.dist %>/scripts'
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'<%= yeoman.dist %>/scripts/scripts.js': [
						'<%= yeoman.dist %>/scripts/scripts.js'
					]
				}
			}
		}
	});

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'configureProxies', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'configureProxies',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'copy:dist',
		'ngmin',
		'cssmin',
		'uncss',
		'uglify',
		'rev',
		'usemin',
		'copy:publish',
		'clean:dist'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);
};