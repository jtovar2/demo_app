'use strict';

angularApp.controller('HeaderCtrl', function ($scope, $location, $window, AuthService) {
        AuthService.getCredentials()

        var vm = this;
        vm.org_role = 'organization';
        vm.none_role = 'none';
        vm.user_role = 'user';

        vm.getClientId = AuthService.getClientId();
        vm.getClientRole = AuthService.getClientRole();


        $scope.$on('auth-update', function(event)
        {
            vm.getClientId = AuthService.getClientId();
            vm.getClientRole = AuthService.getClientRole();

            console.log(vm.getClientRole);
        });

        $scope.$on('auth-no-user', function(event)
        {
            vm.loginUrl = AuthService.getLoginUrl();
            console.log(vm.loginUrl);
        //$location.path(vm.loginUrl);
            $window.location.href = vm.loginUrl;
        });

});
