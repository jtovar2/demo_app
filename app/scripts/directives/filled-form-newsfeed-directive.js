'use strict';

angularApp.directive('filledFormNewsfeedDirective', function () {
    return {
        controller: function($scope, FilledFormService){
            $scope.filledForms = [];
            console.log($scope.orgId);
            console.log('wttfffasadf');
            FilledFormService.getFilledFormsByOrg($scope.orgId).then(
            function(data)
            {
                console.log(data);
                $scope.filledForms = data.filled_forms;
            });
        },
        templateUrl: './views/directive-templates/filledform-newsfeed.html',
        restrict: 'E',
        scope: {
            orgId:'='
        }
    };
  });
