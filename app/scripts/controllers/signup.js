'use strict';

angularApp.controller('SingUpCtrl', function ($scope, UserService, OrganizationService) {
    var vm = this;

    console.log('heeyyy');

    vm.user = {};
    vm.org = {'inventory': []};

    vm.createUser = function()
    {
        UserService.postUser(vm.user).then(function(data)
        {
            console.log(data);
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
    }
});