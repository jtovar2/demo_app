'use strict';

angularApp.controller('HeaderCtrl', function ($scope, $location, $window, AuthService, ClockInService, $state) {
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

            if(vm.getClientRole == vm.user_role)
            {
                ClockInService.getClockIn(vm.getClientId);
            }
            if(vm.getClientRole == vm.none_role)
            {
                $state.go('signup');
            }

            console.log(vm.getClientRole);
        });

        $scope.$on('auth-no-user', function(event)
        {
            vm.loginUrl = AuthService.getLoginUrl();
            console.log(vm.loginUrl);
            $window.location.href = vm.loginUrl;
        });

});
