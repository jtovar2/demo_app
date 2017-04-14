'use strict';

var angularApp = angular.module('angularjsFormBuilderApp', ['ui.bootstrap', '$strap.directives',
'xeditable', "dndLists", 'ui.router', 'ngRoute', 'toastr' ]);



    angularApp
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: '/views/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    title: 'Home is where the heart is hahahaha'
                }
            },
            {
                state: 'form_creator',
                config: {
                    url: '/forms/create/:id',
                    templateUrl: '/views/create.html',
                    controller: 'CreateCtrl',
                    title: 'Forms Creator',
                    controllerAs: 'vm',
                    params: {
                        id: null
                    }
                }
            },
            {
                state: 'forms',
                config: {
                    url: '/forms',
                    templateUrl: '/views/forms.html',
                    controller: 'FormsCtrl',
                    controllerAs: 'vm',
                    title: 'Forms Creator'
                }
            },
            {
                state: 'view_form',
                config: {
                    url: '/forms/:id/view',
                    templateUrl: '/views/view.html',
                    controller: 'ViewCtrl',
                    title: 'Form',
                    params: {
                        id: null
                    }
                }
            },
            {
                state: 'inventory',
                config: {
                    url: '/inventory',
                    templateUrl: '/views/inventory.html',
                    controllerAs: 'vm',
                    controller: 'InventoryCtrl',
                    title: 'Inventory'
                }
           },
           {
                state: 'sign_up',
                config: {
                    url: '/signup?referral',
                    templateUrl: '/views/signup.html',
                    controllerAs: 'vm',
                    controller: 'SingUpCtrl',
                    title: 'Sign Up Today',
                    params: {
                        referral: null
                    }
                }
           },
           {
                state: 'team',
                config: {
                    url: '/team',
                    templateUrl: '/views/team.html',
                    controllerAs: 'vm',
                    controller: 'TeamCtrl',
                    title: 'Team'
                }
           }
        ];
    }


