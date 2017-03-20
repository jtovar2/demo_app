(function () {
    angularApp
    /* @ngInject */
        .factory('UserService', function ($q, $http) {
            var services = {
                // Get Calls
                putUser: putUser,
                getUser: getUser,
                deleteUser: deleteUser,
                postUser: postUser

            };

            var user_api_path = '/rest/user'
            function success(data) {
                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }


            function getUser(user_id) {
                return $http.get(user_api_path + '/' + user_id)
                    .then(success, error)
              }

            function putUser(user_id, user_details) {
                return $http.put(user_api_path + '/' + user_id, user_details)
                    .then(success, error)
            }

            function deleteUser(user_id) {
                return $http.delete(user_api_path + '/' + user_id)
                    .then(success, error)
            }

            function postUser(user_details) {
                return $http.post(user_api_path, user_details)
                    .then(success, error)
            }
            return services;

        });

})();