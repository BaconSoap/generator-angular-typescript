angular.module('templates-main', ['templates/index.tpl.html', 'templates/state1.tpl.html', 'templates/state2.tpl.html']);

angular.module("templates/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/index.tpl.html",
    "<div ui-view></div>\n" +
    "\n" +
    "<a ui-sref=\"state1\">State 1</a>\n" +
    "<a ui-sref=\"state2\">State 2</a>");
}]);

angular.module("templates/state1.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/state1.tpl.html",
    "this is state 1");
}]);

angular.module("templates/state2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/state2.tpl.html",
    "this is state 2");
}]);
