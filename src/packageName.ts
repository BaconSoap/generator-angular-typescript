///<reference path="references.ts" />

module myApp {
	var app = angular.module('packageNameApp', ['ui.router', 'templates-main']);
	app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
		$urlRouterProvider.otherwise('/state1');
		$stateProvider
			  .state('state1', {
				url: '/state1',
				templateUrl: 'templates/state1.tpl.html',
				controller: 'state1Ctrl'
			}).state('state2', {
				url: '/state2',
				templateUrl: 'templates/state2.tpl.html',
				controller: 'state2Ctrl'
			});
	}]);

	// a service to share data between views
	app.factory('fruitService', [() => {
		var fruits = [
			new Fruit('apple', 10),
			new Fruit('orange', 11)
		];
		var serviceDefinition = {
			fruits: fruits
		};
		return serviceDefinition;
	}]);

	//a read-only controller that displays all fruits
	app.controller('state1Ctrl', ['fruitService', '$scope', (fruitService, $scope) => {
		$scope.fruits = fruitService.fruits;
	}]);

	//an editable controller for adding new fruits
	app.controller('state2Ctrl', ['$scope', 'fruitService', ($scope, fruitService) => {
		$scope.newFruit = new Fruit('', 0);
		$scope.viewModel = {feedback: ''};
		$scope.addFruit = fruit => {
			fruitService.fruits.push(fruit);
			$scope.newFruit = new Fruit('', 0);
			$scope.viewModel.feedback = 'added "' + fruit.name + '"; tastiness ' + fruit.tastiness;
		};
	}]);

	export var a = 'apple';

	//our model class
	class Fruit {
		//The syntax `constructor(modifier name: type, ...) automatically creates a property on this class
		// and sets the value to the one passed in. So `var apple = new Fruit('apple', 10)` gives you an object where
		// `apple.name === 'apple' && apple.tastiness === 10`. Syntactic sugar
		constructor(public name: string, public tastiness: number) {}
	}

}
