'use strict';

var ViewCtrl = angularApp.controller('ViewCtrl', function ($scope, FormService, $stateParams) {
    $scope.form = {};
	// read form with given id
	console.log($stateParams.id)
	FormService.form($stateParams.id).then(function(form) {
	    console.log(form);
		$scope.form = form;
	});
});
