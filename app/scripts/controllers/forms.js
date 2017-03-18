'use strict';

angularApp.controller('FormsCtrl', function ($scope) {
    //TODO create forms service that fetches forms



    $scope.forms = [
    {
        'id' : 10,
        'name': 'formnicate'
    },
    {
        'id' : 11,
        'name': 'formnicate'
    },
    {
        'id' : 12,
        'name': 'formnicate'
    }];;

    $scope.deleteForm = function(form_id)
    {
        for(var i = 0; i < $scope.forms.length; i++){
            if($scope.forms[i].id == form_id){
                $scope.forms.splice(i, 1);
                break;
            }
        }
    };



    ///TODO edit form func
    $scope.editForm = function(form_id)
    {
        console.log(form_id);
    };
});
