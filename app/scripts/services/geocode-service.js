(function () {
    angularApp
    /* @ngInject */
        .factory('GeocodeService', function ($q, $http) {
            var services = {
                // Get Calls
                lookUpAddress: lookUpAddress

            };
            var api_key = "AIzaSyAhEbYVA1e2vNAcc4_YIBgcPYbJC47Yo5s";

            var geocode_url = "https://maps.googleapis.com/maps/api/geocode/json";


            function success(data) {
                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }

            function lookUpAddress(address_input)
            {
                return $http.get(geocode_url, {
                    params: { address: address_input, key: api_key }
                    })
                    .then(success, error);
            }

            return services;

        });

})();