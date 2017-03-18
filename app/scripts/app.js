'use strict';

var angularApp = angular.module('angularjsFormBuilderApp', ['ui.bootstrap', '$strap.directives', 'xeditable', "dndLists"]);

angularApp.config(function ($routeProvider) {


    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/forms/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateCtrl'
        })
        .when('/forms/:id/view', {
            templateUrl: 'views/view.html',
            controller: 'ViewCtrl'
        })
        .when('/forms', {
            templateUrl: 'views/forms.html',
            controller: 'FormsCtrl'

        })
        .when('/inventory', {
            templateUrl: 'views/inventory.html',
            controller: 'InventoryCtrl'

        })
        .otherwise({
            redirectTo: '/'
        });

}).run(['$rootScope',  function() {



}]);


