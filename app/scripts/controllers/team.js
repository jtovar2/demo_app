'use strict';

angularApp.controller('TeamCtrl', function ($scope, OrganizationService, AuthService) {

    var vm = this;

    vm.org = {};

    vm.workers = [];

    vm.updateUi = function() {
    OrganizationService.getOrg(vm.clientId).then(function(data)
    {
        console.log(data);
        vm.org = data;
        console.log(vm.org)

    });

    OrganizationService.getWorkers(vm.clientId).then(function(data)
    {
        console.log(data);
        vm.workers = data.workers;
    });
    }

    if(vm.clientId != 0)
    {
        vm.updateUi()
    }

    $scope.$on('auth-update', function(event)
    {
        vm.clientId = AuthService.getClientId();
        vm.clientRole = AuthService.getClientRole();
        console.log(vm.clientId);
        vm.updateUi();
    });



    vm.new_item = {};

    vm.removeWorker = function(worker_id)
    {
        for(var i = 0; i < vm.org.workers.length; i++)
        {
            if(vm.org.workers[i] == worker_id)
            {
                vm.org.workers.splice(i, 1);
                break;
            }
        }
        vm.updateOrg();
    };

    vm.inviteUser = function()
    {
        OrganizationService.inviteUser(vm.clientId, vm.email).then(function(data)
        {
            console.log(data);
        })

    }
    vm.updateOrg = function()
    {

        OrganizationService.putOrg(vm.clientId, vm.org).then(function(data)
        {
            console.log(data);
            vm.org = data;
        });
        vm.updateUi();
    }
});
