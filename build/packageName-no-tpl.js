var forms;
(function (forms) {
    var app = angular.module('multiForms', []);

    app.controller('formShippingCtrl', [
        'checkoutService', '$scope', function (checkoutService, $scope) {
            $scope.model = checkoutService.checkoutModel.shipping;
            $scope.validate = function () {
                return $scope.shippingForm.$valid;
            };
        }]);

    app.controller('formBillingCtrl', [
        'checkoutService', '$scope', function (checkoutService, $scope) {
            $scope.model = checkoutService.checkoutModel.billing;
        }]);

    app.controller('formConfirmCtrl', [
        'checkoutService', '$scope', function (checkoutService, $scope) {
            $scope.model = checkoutService.checkoutModel;
        }]);

    app.factory('checkoutService', [function () {
            var shippingInfo = { name: '', address: '' };
            var billingInfo = { zip: '00000', cardType: 'visa' };

            var checkoutModel = {
                shipping: shippingInfo,
                billing: billingInfo
            };

            var service = {
                checkoutModel: checkoutModel
            };

            return service;
        }]);

    app.directive('validateRoute', [
        '$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, el, attr) {
                    var validateFn;
                    var validateForm;

                    attr.$observe('validateRoute', function (val) {
                        var realVal = scope.$eval(attr.validateRoute);
                        if (realVal && typeof realVal.$valid !== 'undefined') {
                            validateForm = realVal;
                        } else if (realVal && typeof realVal === 'function') {
                            validateFn = realVal;
                        }
                    });

                    var validateStateChange = function (e, toState, toParams, fromState) {
                        if (validateFn && !validateFn()) {
                            e.preventDefault();
                        } else if (validateForm && !validateForm.$valid) {
                            e.preventDefault();
                        }
                    };

                    var $removeEventListener = $rootScope.$on('$stateChangeStart', validateStateChange);

                    scope.$on('$destroy', function () {
                        $removeEventListener();
                    });
                }
            };
        }]);
})(forms || (forms = {}));
var myApp;
(function (myApp) {
    var app = angular.module('packageNameApp', ['ui.router', 'templates-main', 'multiForms']);
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
            }).state('formShipping', {
                url: '/shipping',
                templateUrl: 'templates/form-1.tpl.html',
                controller: 'formShippingCtrl'
            }).state('formBilling', {
                url: '/billing',
                templateUrl: 'templates/form-2.tpl.html',
                controller: 'formBillingCtrl'
            }).state('formConfirm', {
                url: '/confirm',
                templateUrl: 'templates/formConfirm.tpl.html',
                controller: 'formConfirmCtrl'
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
