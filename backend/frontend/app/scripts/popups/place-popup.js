(function () {
    angularApp
    /* @ngInject */
    .controller('PlacePopupCtrl', function ($uibModalInstance, places, org_id) {
  var vm = this;
  vm.places = places;

  vm.ok = function (place) {
    $uibModalInstance.close({'place': place, 'org_id': org_id});
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

})();