(function () {
    angularApp
    /* @ngInject */
        .factory('ClockInService', function ($q, $http, $rootScope) {
            var services = {
                // Get Calls
                isClockedIn: isClockedIn,
                getClockIn: getClockIn,
                deleteClockIn: deleteClockIn,
                postClockIn: postClockIn

            };
            var clockin_api_path = '/rest/clockin'

            var clockin_status = false;

            function success(data) {

                if(data.status == 201)
                {
                    clockin_status = true;
                }
                else if(data.status == 203)
                {
                    clockin_status = false;
                }
                else
                {
                    console.log("error");
                    console.log(data)
                    clockin_status = false;
                }
                $rootScope.$broadcast('clockin-update');
                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }


            function getClockIn(user_id) {
                return $http.get(clockin_api_path + '/' + user_id)
                    .then(success, error);
              }

            function isClockedIn() {
                return clockin_status;
            }
            
            function deleteClockIn(user_id) {
                return $http.delete(clockin_api_path + '/' + user_id)
                    .then(success, error)
            }
            
            function postClockIn(user_id, org_id, place_id) {
                return $http.post(clockin_api_path + '/' + user_id + '/' + org_id + '/' + place_id)
                    .then(success, error)
            }

            return services;

        });

})();