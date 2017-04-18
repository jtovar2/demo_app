'use strict';

angularApp.controller('MainCtrl', function ($scope, $location, AuthService, UserService, ClockInService, PlaceService, $uibModal, $document) {

    var vm = this;
    vm.getClientId = AuthService.getClientId();
    vm.getClientRole = AuthService.getClientRole();
    vm.email = AuthService.getClientEmail();
    vm.isUserClockedIn = false;
    vm.orgPlaces = [];

    vm.clockedMessage = "You are clocked in";

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
    vm.orgsWorksFor = [];
    vm.getUserData = function()
    {
        UserService.getOrgsUserWorksFor(vm.getClientId).then(function(data)
        {
            console.log(data);
            vm.orgsWorksFor = data.organizations;
        });

        vm.isUserClockedIn = ClockInService.isClockedIn();
    }
    vm.loadPlacesForOrg = function(org)
    {
        console.log(org.key);
        vm.selectedOrg = org.name;
        PlaceService.getPlacesByOrg(org.key).then(function(data)
        {
            vm.orgPlaces = data.places;
            vm.selectPlaceForClockIn(org.key)
        })
    }

    vm.cancelClockin = function()
    {
        ClockInService.deleteClockIn(vm.getClientId);
    }

    $scope.$on('clockin-update', function(event)
    {

        vm.isUserClockedIn = ClockInService.isClockedIn();
        if(vm.isUserClockedIn)
        {
            ClockInService.getClockIn(vm.getClientId).then(function(data)
            {
                var shiftStart = Date.parse(data.time)
                //var datestring = shiftStart.getDate()  + "-" + (shiftStart.getMonth()+1) + "-" + shiftStart.getFullYear() + " " + shiftStart.getHours() + ":" + shiftStart.getMinutes();
                vm.clockedMessage = "You are clocked in since " + shiftStart;
            });
        }
    });




    /////Stuff for clock in pop up
    vm.selectPlaceForClockIn = function (org_id, size, parentSelector) {
    console.log(org_id);
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: '/views/popups/placePopup.html',
      controller: 'PlacePopupCtrl',
      controllerAs: 'vm',
      size: size,
      appendTo: parentElem,
      resolve: {
        places: function () {
          return vm.orgPlaces;
        },
        org_id : function()
        {
            return org_id
        }
      }
    });

    modalInstance.result.then(function (clockinfo) {
      console.log(clockinfo.place);
      console.log('org id :' + clockinfo.org_id)
      ClockInService.postClockIn(vm.getClientId, clockinfo.org_id, clockinfo.place.key);
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
    vm.cancelClockin = function()
    {
        console.log('yoo yoo wtf');
        ClockInService.deleteClockIn(vm.getClientId);
    }
});
