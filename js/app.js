'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/json-parser', {templateUrl: 'partials/json-parser.html', controller: JsonParserCtrl});
    $routeProvider.when('/next-project', {templateUrl: 'partials/next-project.html', controller: NextProjectCtrl});
    $routeProvider.otherwise({redirectTo: '/json-parser'});
  }]);


// function ConfigFactory($routeProvider, $route) {
//     $routeProvider.when('/json-parser', {templateUrl: 'partials/json-parser.html', controller: JsonParserCtrl});
//     $routeProvider.when('/next-project', {templateUrl: 'partials/next-project.html', controller: NextProjectCtrl});
//     $routeProvider.otherwise({redirectTo: '/json-parser'});
//     $route.reload();
// };
// ConfigFactory.$inject = ['$routeProvider', '$route'];


// angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
//   	config(ConfigFactory);

