(function () {
    angularApp
    /* @ngInject */
        .factory('AuthService', function ($q, $http, $rootScope) {
            var services = {
                // Get Calls
                getCredentials: getCredentials,
                getClientRole: getClientRole,
                getClientId: getClientId

            };
            var auth_api_path = '/rest/auth'

            var client_role = 'error';
            var client_id = 0;
            function success(data) {

                console.log(data);
                if('account' in data.data)
                {

                    console.log(data.data);
                    client_role = data.data.account;
                    client_id = data.data.id;
                    $rootScope.$broadcast('auth-update');
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

            function getClientRole() {
                return client_role;
            }

            function getClientId() {
                return client_id;
            }

            return services;

        });

})();