'use strict';

angularApp.service('PlaceService', function PlaceService($q, $http) {

    var services = {
        getPlace: getPlace,
        putPlace: putPlace,
        deletePlace: deletePlace,
        postPlace: postPlace,
        getPlacesByOrg: getPlacesByOrg
    };

    var place_api_path = '/rest/place';
    var place_by_org_api_path = '/rest/place/org';
    
    function success(data) {
        return $q.resolve(data.data);
        }
    function error(error) {
        console.log(error);
        console.log("There was an error");
        return $q.reject(error);
    }
    
       function getPlace(org_id, place_id) {
                return $http.get(place_api_path + '/' + org_id + '/' + place_id)
                    .then(success, error)
              }

            function putPlace(org_id, place_id, place_details) {
                return $http.put(place_api_path + '/' + org_id + '/' + place_id, place_details)
                    .then(success, error)
            }

            function deletePlace(org_id, place_id) {
                return $http.delete(place_api_path + '/' + org_id + '/' + place_id)
                    .then(success, error)
            }

            function postPlace(org_id, place_details) {
                return $http.post(place_api_path + '/' + org_id, place_details)
                    .then(success, error)
            }

            function getPlacesByOrg(org_id) {
                return $http.get(place_by_org_api_path + '/' + org_id )
                    .then(success, error)
              }
     return services;
    
});