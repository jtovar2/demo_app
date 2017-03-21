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
                    title: 'Home is where the heart is hahahaha'
                }
            },
            {
                state: 'form_creator',
                config: {
                    url: '/forms/create',
                    templateUrl: '/views/create.html',
                    controller: 'CreateCtrl',
                    title: 'Forms Creator'
                }
            },
            {
                state: 'forms',
                config: {
                    url: '/forms',
                    templateUrl: '/views/forms.html',
                    controller: 'FormsCtrl',
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
                    controller: 'InventoryCtrl',
                    title: 'Inventory'
                }
           }
        ];
    }


