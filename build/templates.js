angular.module('templates-main', ['templates/index.tpl.html']);

angular.module("templates/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/index.tpl.html",
    "<div>\n" +
    "	test template\n" +
    "</div>");
}]);
