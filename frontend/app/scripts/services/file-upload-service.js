'use strict';
(function() {
angularApp
.factory('fileUploadService', function ($q, $http) {
    var services = {
        uploadFileToUrl: uploadFileToUrl,
        deleteBlob: deleteBlob,
        getUploadUrl: getUploadUrl
    }

    var path_to_photo_api = '/rest/photo';
    var path_to_get_upload_url = './rest/blobstore/url';

    function success(data) {

        return $q.resolve(data.data);
    }

    function error(error) {
        console.log(error);
        console.log("There was an error");


        return $q.reject(error);
    }

    function uploadFileToUrl(file, uploadUrl)
    {
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(success, error);
    }

    function deleteBlob(blob_key)
    {
        return $http.delete(path_to_photo_api + '/' + blob_key)
        .then(success, error);
    }

    function getUploadUrl()
    {
        return $http.get(path_to_get_upload_url).then(success, error);
    }

    return services;
});

})();