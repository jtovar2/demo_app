'use strict';

angularApp.controller('MainCtrl', function ($scope, $location, AuthService) {

    var vm = this;
    vm.getClientId = AuthService.getClientId();
    vm.getClientRole = AuthService.getClientRole();


    $scope.$on('auth-update', function(event)
    {
        vm.getClientId = AuthService.getClientId();
        vm.getClientRole = AuthService.getClientRole();
    });

});
