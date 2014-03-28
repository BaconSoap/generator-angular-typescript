module.exports = function(config){
	config.set({
		basePath : './',

		files : [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'build/packageName.js',
			'test/helpers/**/*.js',
			'test/unit/**/*.js'
		],

		autoWatch : false,

		frameworks: ['mocha', 'chai'],
		reporters: ['spec'],
		browsers : ['PhantomJS'],

		plugins : [
			'karma-phantomjs-launcher',
			'karma-mocha',
			'karma-chai',
			'karma-spec-reporter'
		]
	}
)};