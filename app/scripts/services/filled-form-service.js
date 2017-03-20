(function () {
    angularApp
    /* @ngInject */
        .factory('FilledFormanizationService', function ($q, $http) {
            var services = {
                // Get Calls
                putFilledForm: putFilledForm,
                getFilledForm: getFilledForm,
                deleteFilledForm: deleteFilledForm,
                postFilledForm: postFilledForm,
                getFilledFormsByOrgApi: getFilledFormsByOrgApi

            };

            var filled_form_api_path = '/rest/filledform';
            var filled_form_by_org_api_path = '/rest/filledform/org';
            var filled_form_by_user_in_org_api = '/rest/filledform/org/user';

            function success(data) {
                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }


            function getFilledForm(org_id, filled_form_id) {
                return $http.get(filled_form_api_path + '/' + org_id + '/' + filled_form_id)
                    .then(success, error)
              }

            function putFilledForm(org_id, filled_form_id, filled_form_details) {
                return $http.put(filled_form_api_path + '/' + org_id + '/' + filled_form_id, filled_form_details)
                    .then(success, error)
            }

            function deleteFilledForm(org_id, filled_form_id) {
                return $http.delete(filled_form_api_path + '/' + org_id + '/' + filled_form_id)
                    .then(success, error)
            }

            function postFilledForm(org_id, filled_form_details) {
                return $http.post(filled_form_api_path + '/' + org_id, filled_form_details)
                    .then(success, error)
            }

            function getFilledFormsByOrgApi(org_id) {
                return $http.get(filled_form_by_org_api_path + '/' + org_id )
                    .then(success, error)
              }

            return services;

        });

})();