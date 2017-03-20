'use strict';

angularApp.controller('InventoryCtrl', function ($scope, OrganizationService, AuthService) {

    $scope.new_item = {};
    $scope.inventory = [
    {
        'sku' : 12345,
        'name' : 'hammer'
    },
    {
        'sku' : 123456,
        'name' : 'hammer2'
    },
    {
        'sku' : 12347,
        'name' : 'nails'
    }]
    AuthService.getCredentials().then(function(data)
    {
        console.log(data)
    });

    $scope.deleteItem = function(item_sku)
    {
        for(var i = 0; i < $scope.inventory.length; i++){
            if($scope.inventory[i].sku == item_sku){
                $scope.inventory.splice(i, 1);
                break;
            }
        }
    };


    $scope.editInventory = function()
    {
        console.log("yoy oyo whats up");
        //TODO call service to update inventory
    };


    $scope.addItem = function()
    {
        $scope.inventory.push($scope.new_item)
        $scope.new_item = {}
    }
});
