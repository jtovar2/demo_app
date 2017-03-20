(function () {
    angularApp
    /* @ngInject */
        .factory('AuthService', function ($q, $http) {
            var services = {
                // Get Calls
                getCredentials: getCredentials

            };
            var qa_prefix = 'http://localhost:8080'
            var auth_api_path = qa_prefix + '/rest/auth'
            function success(data) {
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