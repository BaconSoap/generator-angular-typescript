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

	/**
	 * A directive to validate the current route's state before attempting to switch state.
	 * Provides a shortcut for the case of the current route being represented by a form.
	 * @param {[type]}	'validateRoute' If a function, the function should return true
	 *                                   if the state is valid and can be changed.
	 *                                   If a form, the state is valid if form.$valid is true.
	 */
	app.directive('validateRoute', ['$rootScope', ($rootScope) => {
		return {
			restrict: 'A',
			link: (scope, el, attr) => {
				var validateFn;
				var validateForm;

				//grab either the validation function or the form to validate
				attr.$observe('validateRoute', val => {
					var realVal = scope.$eval(attr.validateRoute);
					if (realVal && typeof realVal.$valid !== 'undefined') {
						validateForm = realVal;
					} else if (realVal && typeof realVal === 'function') {
						validateFn = realVal;
					}
				});

				var validateStateChange = (e, toState, toParams, fromState) => {
					//check the validation function or the form
					if (validateFn && !validateFn()) {
						e.preventDefault();
					} else if (validateForm && !validateForm.$valid) {
						e.preventDefault();
					}
				};

				var $removeEventListener = $rootScope.$on('$stateChangeStart', validateStateChange);

				//clean up events when the directive is cleaned up
				scope.$on('$destroy', () => {
					$removeEventListener();
				});
			}
		};
	}]);
}
