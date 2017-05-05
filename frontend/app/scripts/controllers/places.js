'use strict';

angularApp.controller('PlacesCtrl', function ($scope, PlaceService, AuthService, GeocodeService) {
    

    var vm = this;

    vm.orgId = AuthService.getClientId();
    vm.places = [];
    vm.new_place = {};
    vm.new_place.street_address = "";
    vm.new_place.city = "";
    vm.new_place.state = "";

    vm.updateUi = function() {
    PlaceService.getPlacesByOrg(vm.orgId).then(function(data)
    {
        console.log(data);
        vm.places = data.places;
    });
    }
    if(vm.orgId != 0)
    {
        vm.updateUi()
    }

    $scope.$on('auth-update', function(event)
    {
        vm.orgId = AuthService.getClientId();
        vm.clientRole = AuthService.getClientRole();
        console.log(vm.orgId);
        vm.updateUi();
    });

    vm.forms = [];

    vm.deletePlace = function(place_id)
    {
        PlaceService.deletePlace(vm.orgId, place_id).then(function(data)
        {
            vm.updateUi();
        });
    };


    vm.addPlace = function(address)
    {
        PlaceService.postPlace(vm.orgId, {"address": address}).then(function(data)
        {
            vm.updateUi();
        })
    }

    vm.lookUpAddress = function(address)
    {
        if(address.length > 7)
        {
        GeocodeService.lookUpAddress(address).then(function(data)
        {
            console.log(data);
            vm.resultAddresses = data.results;
        })
        }
    }
    });
