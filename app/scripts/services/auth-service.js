(function () {
    angularApp
    /* @ngInject */
        .factory('AuthService', function ($q, $http) {
            var services = {
                // Get Calls
                getCredentials: getCredentials

            };
            var auth_api_path = '/rest/auth'

            var client_role = 'error';
            var client_id = 0;
            function success(data) {

                if(!'error' in data)
                {
                    console.log(data.data);
                }
                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }


            function getCredentials() {
                return $http.get(auth_api_path)
                    .then(success, error)
              }


            return services;

        });

})();