'use strict';

angularApp.service('FormService', function FormService($q, $http) {

    var formsJsonPath = './static-data/sample_forms.json';

    var form_api_path = '/rest/form'
    var form_by_org_api_path = '/rest/form/org'
    
    
    function success(data) {
        console.log(data);

        return $q.resolve(data.data);
        }
    function error(error) {
        console.log(error);
        console.log("There was an error");
        return $q.reject(error);
    }
    
    
    function getForm(org_id, form_id) {
                return $http.get(form_api_path + '/' + org_id + '/' + form_id)
                    .then(success, error)
              }

            function putForm(org_id, form_id, form_details) {
                return $http.put(form_api_path + '/' + org_id + '/' + form_id, form_details)
                    .then(success, error)
            }

            function deleteForm(org_id, form_id) {
                return $http.delete(form_api_path + '/' + org_id + '/' + form_id)
                    .then(success, error)
            }

            function postForm(org_id, form_details) {
                return $http.post(form_api_path + '/' + org_id, form_details)
                    .then(success, error)
            }

            function getFormsByOrg(org_id) {
                return $http.get(form_by_org_api_path + '/' + org_id )
                    .then(success, error)
              }
    











    return {
        putForm: putForm,
                getForm: getForm,
                deleteForm: deleteForm,
                postForm: postForm,
                getFormsByOrg: getFormsByOrg,
        
        fields:[
            {
                name : 'textfield',
                value : 'Short Text'
            },
            {
                name : 'email',
                value : 'E-mail'
            },
            {
                name : 'radio',
                value : 'Radio Buttons'
            },
            {
                name : 'dropdown',
                value : 'Dropdown List'
            },
            {
                name : 'date',
                value : 'Date'
            },
            {
                name : 'textarea',
                value : 'Long Text'
            },
            {
                name : 'checkbox',
                value : 'Checkbox'
            },
            {
                name: 'photo',
                value: 'Photo'
            }
        ],
        form:function (id) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get(formsJsonPath).then(function (response) {
                var requestedForm = {};
                angular.forEach(response.data, function (form) {
                    if (form.form_id == id) requestedForm = form;
                });
                return requestedForm;
            });
        },
        forms: function() {
            return $http.get(formsJsonPath).then(function (response) {
                return response.data;
            });
        }
    };
});
