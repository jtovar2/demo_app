'use strict';

angularApp.controller('MainCtrl', function ($state, $scope, $location, AuthService, UserService, ClockInService, PlaceService, $uibModal, $document, FormService) {

    var vm = this;
    vm.getClientId = AuthService.getClientId();
    vm.getClientRole = AuthService.getClientRole();
    vm.email = AuthService.getClientEmail();
    vm.isUserClockedIn = false;
    vm.orgPlaces = [];
    vm.orgForms = [];

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
    vm.placesByOrg = {};
    vm.formsByOrg = {};
    vm.getUserData = function()
    {
        UserService.getFrontPage(vm.getClientId).then(function(data)
        {

            vm.orgsWorksFor = data.organizations;
            vm.placesByOrg = data.places;
            vm.formsByOrg = data.forms;
        })

        vm.isUserClockedIn = ClockInService.isClockedIn();
    }
    vm.loadPlacesForOrg = function(org)
    {
        vm.selectedOrg = org.name;
        vm.orgPlaces = vm.placesByOrg[org.key];
        vm.selectPlaceForClockIn(org.key);
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
      ClockInService.postClockIn(vm.getClientId, clockinfo.org_id, clockinfo.place.key);
    }, function () {
      console.log('on cancel');
    });
  };
    vm.cancelClockin = function()
    {
        console.log('yoo yoo wtf');
        ClockInService.deleteClockIn(vm.getClientId);
    }


    vm.loadFormsForOrg = function()
    {
        var org_id = ClockInService.getOrg();
        vm.orgForms = vm.formsByOrg[org_id];
        vm.selectFormPopOut();
    }
    /////Stuff for form selector pop up
    vm.selectFormPopOut = function (size, parentSelector) {
    var org_id = ClockInService.getOrg();
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: '/views/popups/formPopup.html',
      controller: 'FormPopupCtrl',
      controllerAs: 'vm',
      size: size,
      appendTo: parentElem,
      resolve: {
        forms: function () {
          return vm.orgForms;
        },
        org_id : function()
        {
            return org_id
        }
      }
    });

    modalInstance.result.then(function (clockinfo) {

      $state.go('fill_form', {'org_id': clockinfo.org_id, 'form_id': clockinfo.form});

      //vm.selectFormPopOut(clockinfo.org_id);
      //ClockInService.postClockIn(vm.getClientId, clockinfo.org_id, clockinfo.place.key);

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
});
