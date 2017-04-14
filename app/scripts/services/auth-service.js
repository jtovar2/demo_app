(function () {
    angularApp
    /* @ngInject */
        .factory('AuthService', function ($q, $http, $rootScope) {
            var services = {
                // Get Calls
                getCredentials: getCredentials,
                getClientRole: getClientRole,
                getClientId: getClientId,
                getClientEmail: getClientEmail,
                getLoginUrl: getLoginUrl

            };
            var auth_api_path = '/rest/auth'

            var client_role = 'error';
            var client_id = 0;
            var client_email = 'error';
            var login_url = '';
            function success(data) {

                console.log(data);
                if('account' in data.data)
                {

                    console.log(data.data);
                    client_role = data.data.account;
                    client_id = data.data.id;
                    client_email = data.data.email;
                    $rootScope.$broadcast('auth-update');
                }

                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                if(error.status == 401)
                {
                login_url = error.data.login_url;
                $rootScope.$broadcast('auth-no-user');
                }

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

            function getClientEmail() {
                return client_email;
            }

            function getLoginUrl()
            {
                return login_url;
            }

            return services;

        });

})();