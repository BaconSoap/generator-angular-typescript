var myApp;
(function (myApp) {
    var app = angular.module('packageNameApp', ['ui.router', 'templates-main']);
    app.config([
        '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/state1');
            $stateProvider.state('state1', {
                url: '/state1',
                templateUrl: 'templates/state1.tpl.html',
                controller: 'state1Ctrl'
            }).state('state2', {
                url: '/state2',
                templateUrl: 'templates/state2.tpl.html',
                controller: 'state2Ctrl'
            });
        }]);

    app.factory('fruitService', [function () {
            var fruits = [
                new Fruit('apple', 10),
                new Fruit('orange', 11)
            ];
            var serviceDefinition = {
                fruits: fruits
            };
            return serviceDefinition;
        }]);

    app.controller('state1Ctrl', [
        'fruitService', '$scope', function (fruitService, $scope) {
            $scope.fruits = fruitService.fruits;
        }]);

    app.controller('state2Ctrl', [
        '$scope', 'fruitService', function ($scope, fruitService) {
            $scope.newFruit = new Fruit('', 0);
            $scope.viewModel = { feedback: '' };
            $scope.addFruit = function (fruit) {
                fruitService.fruits.push(fruit);
                $scope.newFruit = new Fruit('', 0);
                $scope.viewModel.feedback = 'added "' + fruit.name + '"; tastiness ' + fruit.tastiness;
            };
        }]);

    myApp.a = 'apple';

    var Fruit = (function () {
        function Fruit(name, tastiness) {
            this.name = name;
            this.tastiness = tastiness;
        }
        return Fruit;
    })();
})(myApp || (myApp = {}));
