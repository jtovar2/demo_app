'use strict';

angularApp.controller('FormsCtrl', function ($scope, FormService, AuthService) {


    var vm = this;

    vm.orgId = AuthService.getClientId();


    vm.updateUi = function() {
    FormService.getFormsByOrg(vm.orgId).then(function(data)
    {
        console.log(data);
        vm.forms = data.forms
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

    vm.deleteForm = function(form_id)
    {
        FormService.deleteForm(vm.orgId, form_id).then(function(data)
        {
            vm.updateUi();
        });
    };



    ///TODO edit form func
    vm.editForm = function(form_id)
    {
        console.log(form_id);

    };
});
