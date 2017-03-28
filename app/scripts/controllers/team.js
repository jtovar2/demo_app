use strict';

angularApp.controller('TeamCtrl', function ($scope, OrganizationService, AuthService) {

    var vm = this;

    vm.clientId = AuthService.getClientId();

    vm.org = {};

    vm.updateUi = function() {
    OrganizationService.getOrg(vm.clientId).then(function(data)
    {
        console.log(data);
        vm.org = data;
        console.log(vm.org.inventory)

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

    vm.removeWorker = function(item_sku)
    {
        for(var i = 0; i < vm.org.workers.length; i++){
            if(vm.org.inventory[i].key == item_sku){
                vm.org.inventory.splice(i, 1);
                break;
            }
        }
        vm.updateOrg();
    };


    vm.addWorker = function()
    {
        vm.org.inventory.push(vm.new_item)
        vm.new_item = {}
        vm.updateOrg();
    }
    vm.intiteUser = funciton()
    {
        console.log("implelement this bullshit");
    }
    vm.updateOrg = function()
    {

        OrganizationService.putOrg(vm.clientId, vm.org).then(function(data)
        {
            console.log(data);
            vm.org = data;
        })
    }
});
