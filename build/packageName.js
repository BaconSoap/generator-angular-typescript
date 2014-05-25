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
;angular.module('templates-main', ['templates/index.tpl.html', 'templates/state1.tpl.html', 'templates/state2.tpl.html']);

angular.module("templates/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/index.tpl.html",
    "<div ui-view></div>\n" +
    "\n" +
    "<a ui-sref=\"state1\">View Fruit State</a>\n" +
    "<a ui-sref=\"state2\">Add Fruit State</a>");
}]);

angular.module("templates/state1.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/state1.tpl.html",
    "this is state 1\n" +
    "\n" +
    "<ul>\n" +
    "	<li ng-repeat=\"fruit in fruits\"> {{fruit.name}}: {{fruit.tastiness}}</li>\n" +
    "</ul>");
}]);

angular.module("templates/state2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/state2.tpl.html",
    "this is state 2\n" +
    "\n" +
    "<ng-form>\n" +
    "	<input type=\"text\" ng-model=\"newFruit.name\">\n" +
    "	<input type=\"number\" ng-model=\"newFruit.tastiness\">\n" +
    "	<input type=\"submit\" value=\"Create Fruit\" ng-click=\"addFruit(newFruit)\">\n" +
    "</ng-form>\n" +
    "\n" +
    "{{viewModel.feedback}}");
}]);
