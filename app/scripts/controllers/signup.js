'use strict';

angularApp.controller('SingUpCtrl', function ($scope, UserService, OrganizationService, AuthService, $stateParams, $state) {
    var vm = this;
    AuthService.getCredentials()

    var referral_id = $stateParams.referral;
    console.log($stateParams);
    vm.user = {'email': AuthService.getClientEmail()};
    vm.org = {'inventory': [], 'email': AuthService.getClientEmail()};
    var client_id = AuthService.getClientId();

    vm.clientRole = AuthService.getClientRole();
    vm.org_role = 'organization';
    vm.none_role = 'none';
    vm.user_role = 'user';

    $scope.$on('auth-update', function(event)
    {
        vm.user.email = AuthService.getClientEmail();
        vm.org.email = AuthService.getClientEmail();
        client_id = AuthService.getClientId();
        vm.clientRole = AuthService.getClientRole();
        console.log("update");

        if(vm.user_role == vm.clientRole)
        {
            vm.addReferral();
        }
    });

    vm.createUser = function()
    {
        UserService.postUser(vm.user).then(function(data)
        {
            console.log(data);
            console.log(referral_id);
            vm.addReferral();

        }
        )
    }

    vm.createOrg = function()
    {

        console.log('yoo wtf');
        OrganizationService.postOrg(vm.org).then(function(data)
        {
            console.log(data);
        });
        $state.go('home');
    }

    vm.addReferral = function()
    {
        if(referral_id != '' && referral_id != null)
        {
            OrganizationService.addUser(referral_id, client_id).then(function(data)
             {
                console.log(data);
             });
        }

        $state.go('home');
    }
});