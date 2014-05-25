angular.module('templates-main', ['templates/index.tpl.html', 'templates/state1.tpl.html', 'templates/state2.tpl.html']);

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
