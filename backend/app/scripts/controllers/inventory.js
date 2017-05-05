'use strict';

angularApp.controller('InventoryCtrl', function ($scope, OrganizationService, AuthService) {

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

    vm.deleteItem = function(item_sku)
    {
        for(var i = 0; i < vm.org.inventory.length; i++){
            if(vm.org.inventory[i].sku == item_sku){
                vm.org.inventory.splice(i, 1);
                break;
            }
        }
        vm.updateOrg();
    };


    vm.addItem = function()
    {
        vm.org.inventory.push(vm.new_item)
        vm.new_item = {}
        vm.updateOrg();
    }

    vm.updateOrg = function()
    {
        console.log("yoo yoy oy oy ");

        OrganizationService.putOrg(vm.clientId, vm.org).then(function(data)
        {
            console.log(data);
            vm.org = data;
        })
    }

    $scope.updateInv = function ()
    {
        console.log("yoo yoy oy oy ");

        OrganizationService.putOrg(vm.clientId, vm.org).then(function(data)
        {
            console.log(data);
            vm.org = data;
        })
    }

});
