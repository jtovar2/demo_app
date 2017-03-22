'use strict';

angularApp.controller('MainCtrl', function ($scope, AuthService) {
    console.log('wtff');
    var vm = this;
    var role = 'error';

    AuthService.getCredentials().then(function(data)
    {
        console.log(data);
    })
});
