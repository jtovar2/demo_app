'use strict';

angularApp.controller('HeaderCtrl', function ($scope, $location, AuthService) {
        AuthService.getCredentials()

        var vm = this;
        vm.org_role = 'organization';

        vm.getClientId = AuthService.getClientId();
        vm.getClientRole = AuthService.getClientRole();


        $scope.$on('auth-update', function(event)
        {
            vm.getClientId = AuthService.getClientId();
            vm.getClientRole = AuthService.getClientRole();

            console.log(vm.getClientRole);
        });

});
