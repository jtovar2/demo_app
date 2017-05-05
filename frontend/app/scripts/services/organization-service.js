(function () {
    angularApp
    /* @ngInject */
        .factory('OrganizationService', function ($q, $http) {
            var services = {
                // Get Calls
                putOrg: putOrg,
                getOrg: getOrg,
                deleteOrg: deleteOrg,
                postOrg: postOrg,
                inviteUser: inviteUser,
                addUser : addUser,
                getWorkers : getWorkers,
                removeUser: removeUser

            };

            var org_api_path = '/rest/org'
            var invite_user_path = '/rest/invite'
            var add_user_path = '/rest/org/add/worker'
            var remove_user_path = '/rest/org/remove/worker'
            var get_workers_path = '/rest/org/workers'
            function success(data) {

                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }


            function getOrg(org_id) {
                return $http.get(org_api_path + '/' + org_id)
                    .then(success, error)
              }

            function putOrg(org_id, org_details) {

                return $http.put(org_api_path + '/' + org_id, org_details)
                    .then(success, error)
            }

            function deleteOrg(org_id) {
                return $http.delete(org_api_path + '/' + org_id)
                    .then(success, error)
            }

            function postOrg(org_details) {
                return $http.post(org_api_path, org_details)
                    .then(success, error)
            }

            function inviteUser(org_id, user_email)
            {
                return $http.get(invite_user_path + '/' + org_id + '/' + user_email)
                    .then(success, error)
            }

            function addUser(org_id, user_id)
            {
                return $http.get(add_user_path + '/' + org_id + '/' + user_id)
                    .then(success, error)
            }

            function removeUser(org_id, user_id)
            {
                return $http.delete(remove_user_path + '/' + org_id + '/' + user_id)
                    .then(success, error)
            }

            function getWorkers(org_id)
            {
                return $http.get(get_workers_path + '/' + org_id)
                    .then(success, error)
            }
            return services;

        });

})();