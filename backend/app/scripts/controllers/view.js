'use strict';

var ViewCtrl = angularApp.controller('ViewCtrl', function ($scope, FormService, $stateParams, OrganizationService, FilledFormService) {
    $scope.form = {};
    $scope.inventory = [];
    $scope.chosen_inventory = [];
    $scope.loading_inventory = true;
    $scope.loading_form = true;
	// read form with given id
	console.log($stateParams)
	var org_id = $stateParams.org_id;
	var form_id = $stateParams.filled_form_id;
	console.log('yooo oo o');
    FilledFormService.getFilledForm(org_id, form_id).then(function(data)
    {
        console.log(data);
        $scope.form = data.data.form;
        $scope.chosen_inventory = data.data.inventory;
        console.log($scope.form);
    });
});
