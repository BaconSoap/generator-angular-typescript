angular.module('templates-main', ['templates/form-1.tpl.html', 'templates/form-2.tpl.html', 'templates/formConfirm.tpl.html', 'templates/formNav.tpl.html', 'templates/index.tpl.html', 'templates/state1.tpl.html', 'templates/state2.tpl.html']);

angular.module("templates/form-1.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/form-1.tpl.html",
    "<div ng-include=\"'templates/formNav.tpl.html'\"></div>\n" +
    "can switch states: {{shippingForm.$valid}}\n" +
    "<ng-form validate-route=\"validate\" name=\"shippingForm\">\n" +
    "	<div class=\"form-group\" ng-class=\"{'has-error': shippingForm.personName.$invalid, 'has-success': shippingForm.personName.$valid}\">\n" +
    "		<label class=\"control-label\" for=\"personName\">Name</label>\n" +
    "		<input type=\"text\" class=\"form-control\" name=\"personName\" id=\"personName\" required ng-model=\"model.name\">\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\" ng-class=\"{'has-error': shippingForm.personAddress.$invalid, 'has-success': shippingForm.personAddress.$valid}\">\n" +
    "		<label class=\"control-label\" for=\"personAddress\">Address</label>\n" +
    "		<input type=\"text\" class=\"form-control\" name=\"personAddress\" required id=\"personAddress\" ng-model=\"model.address\">\n" +
    "	</div>\n" +
    "</ng-form>");
}]);

angular.module("templates/form-2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/form-2.tpl.html",
    "<div ng-include=\"'templates/formNav.tpl.html'\"></div>\n" +
    "\n" +
    "<ng-form validate-route=\"billingForm\" name=\"billingForm\">\n" +
    "	<div class=\"form-group\" ng-class=\"{'has-error': billingForm.zipCode.$invalid, 'has-success': billingForm.zipCode.$valid}\">\n" +
    "		<label class=\"control-label\" for=\"zipCode\">Zip Code</label>\n" +
    "		<input type=\"text\" class=\"form-control\" name=\"zipCode\" id=\"zipCode\" ng-pattern=\"/^[0-9]{5}$/\" required ng-model=\"model.zip\">\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\" ng-class=\"{'has-error': billingForm.cardType.$invalid, 'has-success': billingForm.cardType.$valid}\">\n" +
    "		<label class=\"control-label\" for=\"cardType\">Card Type</label>\n" +
    "		<input type=\"text\" class=\"form-control\" name=\"cardType\" required id=\"cardType\" ng-model=\"model.cardType\">\n" +
    "	</div>\n" +
    "</ng-form>");
}]);

angular.module("templates/formConfirm.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formConfirm.tpl.html",
    "<div ng-include=\"'templates/formNav.tpl.html'\"></div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-2\">Name:</div>\n" +
    "	<div class=\"col-md-10\">{{model.shipping.name}}</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-2\">Address:</div>\n" +
    "	<div class=\"col-md-10\">{{model.shipping.address}}</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-2\">Zip:</div>\n" +
    "	<div class=\"col-md-10\">{{model.billing.zip}}</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-2\">Card Type:</div>\n" +
    "	<div class=\"col-md-10\">{{model.billing.cardType}}</div>\n" +
    "</div>");
}]);

angular.module("templates/formNav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formNav.tpl.html",
    "<ul class=\"nav nav-pills\">\n" +
    "	<li ui-sref-active=\"active\"><a href ui-sref=\"formShipping\">Shipping</a></li>\n" +
    "	<li ui-sref-active=\"active\"><a href ui-sref=\"formBilling\">Billing</a></li>\n" +
    "	<li ui-sref-active=\"active\"><a href ui-sref=\"formConfirm\">Confirm</a></li>\n" +
    "</ul>");
}]);

angular.module("templates/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/index.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-md-2\">\n" +
    "			<ul class=\"nav\">\n" +
    "				<li><a ui-sref=\"state1\">View Fruit State</a></li>\n" +
    "				<li><a ui-sref=\"state2\">Add Fruit State</a></li>\n" +
    "				<li><a ui-sref=\"formShipping\">Start billing</a></li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "		<div ui-view class=\"col-md-10\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
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
