'use strict';

angularApp.directive('formDirective', function () {
    return {
        controller: function($scope){

            $scope.chosen_inventory = [];
            $scope.submit = function(){
                alert('Form submitted..');
                $scope.form.submitted = true;
                $scope.onFormSubmit($scope.form, $scope.chosen_inventory);
            }

            $scope.cancel = function(){
                alert('Form canceled..');
                $scope.onFormCancel();
            }
            $scope.addItemToInventoryForm = function(item)
	        {
	            $scope.chosen_inventory.push(item);
	            console.log($scope.chosen_inventory);
	        }
	    $scope.removeItemFromIventoryForm = function(index)
        	{
            console.log(index);
                $scope.chosen_inventory.splice(index, 1);
	        }
        },
        templateUrl: './views/directive-templates/form/form.html',
        restrict: 'E',
        scope: {
            form:'=',
            inventory: '=',
            onFormSubmit: '=',
            onFormCancel: '='
        }
    };
  });
