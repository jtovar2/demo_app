'use strict';

angularApp.directive('formDirective', function () {
    return {
        controller: function($scope){

            $scope.chosen_inventory = [];
            $scope.blob_upload_urls = [];
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
                $scope.chosen_inventory.splice(index, 1);
	        }
	        $scope.removeFileQuestion = function(form_question_index)
	        {
	            $scope.form.form_file_questions--;
	        }
	        $scope.addFileQuestion = function()
	        {
	            $scope.form.form_file_questions++;
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
