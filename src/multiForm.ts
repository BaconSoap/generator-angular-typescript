module forms {
	var app = angular.module('multiForms', []);

	app.controller('formShippingCtrl', ['checkoutService', '$scope', (checkoutService, $scope) => {
		$scope.model = checkoutService.checkoutModel.shipping;
		$scope.validate = () => {
			return $scope.shippingForm.$valid;
		};
	}]);

	app.controller('formBillingCtrl', ['checkoutService', '$scope', (checkoutService, $scope) => {
		$scope.model = checkoutService.checkoutModel.billing;
		$scope.validate = () => {
			return $scope.billingForm.$valid;
		};
	}]);

	app.controller('formConfirmCtrl', ['checkoutService', '$scope', (checkoutService, $scope) => {
		$scope.model = checkoutService.checkoutModel;
	}]);

	app.factory('checkoutService', [() => {
		var shippingInfo = {name: '', address: ''};
		var billingInfo = {zip: '00000', cardType: 'visa'};

		var checkoutModel = {
			shipping: shippingInfo,
			billing: billingInfo
		};

		var service = {
			checkoutModel: checkoutModel
		};

		return service;
	}]);

	app.directive('validateRoute', ['$rootScope', ($rootScope) => {
		return {
			restrict: 'A',
			link: (scope, el, attr) => {
				var validateFn;

				//grab the validation function
				attr.$observe('validateRoute', val => {
					validateFn = scope.$eval(attr.validateRoute);
				});

				var stateChangeStart = (e, toState, toParams, fromState) => {
					//if the validation function returns false then cancel state switching
					if (validateFn && !validateFn()) {
						e.preventDefault();
					}
				};

				var $removeEventListener = $rootScope.$on('$stateChangeStart', stateChangeStart);

				//clean up events when the directive is cleaned up
				scope.$on('$destroy', () => {
					$removeEventListener();
				});
			}
		};
	}]);
}
