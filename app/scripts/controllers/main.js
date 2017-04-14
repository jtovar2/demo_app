'use strict';

angularApp.controller('MainCtrl', function ($scope, $location, $window, AuthService) {

    var vm = this;
    AuthService.getCredentials()
    vm.getClientId = AuthService.getClientId();
    vm.getClientRole = AuthService.getClientRole();

    vm.loginUrl = '';



    $scope.$on('auth-update', function(event)
    {
        vm.getClientId = AuthService.getClientId();
        vm.getClientRole = AuthService.getClientRole();
    });
    $scope.$on('auth-no-user', function(event)
    {
        vm.loginUrl = AuthService.getLoginUrl();
        console.log(vm.loginUrl);
        //$location.path(vm.loginUrl);
        $window.location.href = vm.loginUrl;
    })

});
