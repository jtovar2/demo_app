'use strict';

angularApp.controller('MainCtrl', function ($scope, $location, AuthService, UserService) {

    var vm = this;
    vm.getClientId = AuthService.getClientId();
    vm.getClientRole = AuthService.getClientRole();
    vm.email = AuthService.getClientEmail();


    vm.loginUrl = '';



    $scope.$on('auth-update', function(event)
    {
        vm.getClientId = AuthService.getClientId();
        vm.getClientRole = AuthService.getClientRole();
        vm.email = AuthService.getClientEmail();

        if(vm.getClientRole == 'user')
        {
            vm.getUserData();
        }
    });

    //User related stuff
    vm.selectedOrg = 'Please select org';
    vm.orsWorksFor = [];
    vm.getUserData = function()
    {
        UserService.getOrgsUserWorksFor(vm.getClientId).then(function(data)
        {
            console.log(data);
            vm.orgsWorksFor = data.organizations;
        })
    }
    vm.loadPlacesForOrg = function(org)
    {
        console.log(org.key);
        vm.selectedOrg = org.name;
    }

});
