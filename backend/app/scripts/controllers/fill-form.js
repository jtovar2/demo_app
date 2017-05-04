'use strict';

var FillFormCtrl = angularApp.controller('FillFormCtrl', function ($scope, FormService, $stateParams, OrganizationService, FilledFormService) {
    $scope.form = {};
    $scope.inventory = [];
    $scope.chosen_inventory = [];
    $scope.loading_inventory = true;
    $scope.loading_form = true;
	// read form with given id
	console.log($stateParams)
	var org_id = $stateParams.org_id;
	var form_id = $stateParams.form_id;
	OrganizationService.getOrg(org_id).then(function(data)
	{
	    console.log("WTFFF");
	    console.log(data);
	    $scope.inventory = data.inventory;
	    $scope.loading_inventory = false;
	    console.log($scope.inventory);

	});
	FormService.getForm(org_id, form_id).then(function(data) {
	    var form = data.data;

		$scope.form = form;
		$scope.loading_form = false;
	});

    $scope.onFormSubmit = function(form, inventory)
    {
        console.log(form);
        console.log(inventory);
        FilledFormService.postFilledForm(org_id, {"data": {'form': form, 'inventory': inventory}})
        .then(function(data)
        {
            console.log(data);
        })

    }

    $scope.onFormCancel = function()
    {
        console.log('form cancelled');
    }



});
