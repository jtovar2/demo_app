'use strict';

// coffeescript's for in loop
var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i;
        }
        return -1;
    };

angularApp.directive('fieldDirective', function($http, $compile, $sce, $parse) {

    var getTemplateUrl = function(field) {
        console.log(field);

        var type = field.field_type;
        var templateUrl = './views/directive-templates/field/';
        var supported_fields = [
            'textfield',
            'email',
            'textarea',
            'checkbox',
            'date',
            'dropdown',
            'hidden',
            'password',
            'radio',
            'photo'
        ]

        if (__indexOf.call(supported_fields, type) >= 0) {
            return templateUrl += type + '.html';
        }
    }

    var linker = function(scope, element) {
        // GET template content from path
        scope.blob_key = ""
        var templateUrl = getTemplateUrl(scope.field);



        $http.get(templateUrl).then(function(data) {
            element.html(data.data);
            $compile(element.contents())(scope);
        });
    }

    var controller = ['$scope', 'fileUploadService', function($scope, fileUploadService, $http)
    {

        $scope.uploadFile = function(){
            $scope.file_uploaded = false;
            var file = $scope.myFile;
            console.log('file is ' );
            console.dir($scope.upload_url);
            var uploadUrl = $scope.upload_url;
            fileUploadService.uploadFileToUrl(file, uploadUrl).then(function(data)
            {
                console.log(data);
                $scope.blob_key = data.key;
                $scope.file_uploaded = true;
            });


        };

        $scope.removeBlob = function()
        {
            fileUploadService.deleteBlob($scope.blob_key).then(function(data)
            {
                console.log(data);
                $scope.file_uploaded = false;
                $scope.getUploadUrl();
            })
        }

        $scope.getUploadUrl = function()
        {

        if($scope.field.field_type == 'photo')
        {
            fileUploadService.getUploadUrl().then(function(data)
            {
                $scope.upload_url = data;
                console.log(data);
            });

        }
        }
        $scope.getUploadUrl();

     }]

    return {
        template: '<div ng-bind="field"></div>',
        restrict: 'E',
        controller: controller,
        scope: {
            field: '='
        },
        link: linker
    };
});