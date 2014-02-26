module.exports = function(config){
	config.set({
		basePath : './',

		files : [
			'bower_components/angular/angular.min.js',
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