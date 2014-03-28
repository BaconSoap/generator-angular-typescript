var myApp;
(function (myApp) {
    var app = angular.module('packageNameApp', []);
    myApp.a = 'apple';
})(myApp || (myApp = {}));
