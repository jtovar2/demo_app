(function () {
    angularApp
    /* @ngInject */
    .controller('FormPopupCtrl', function ($uibModalInstance, forms, org_id) {
  var vm = this;
  vm.forms = forms;
  console.log(org_id);

  vm.ok = function (form) {
    $uibModalInstance.close({'form': form, 'org_id': org_id});
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

})();