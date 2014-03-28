var myApp;
(function (myApp) {
    var app = angular.module('packageNameApp', ['ui.router', 'templates-main']);
    app.config([
        '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/state1');
            $stateProvider.state('state1', {
                url: '/state1',
                templateUrl: 'templates/state1.tpl.html'
            }).state('state2', {
                url: '/state2',
                templateUrl: 'templates/state2.tpl.html'
            });
        }]);
    myApp.a = 'apple';
})(myApp || (myApp = {}));
