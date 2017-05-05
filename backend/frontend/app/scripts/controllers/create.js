'use strict';

angularApp.controller('CreateCtrl', function ($scope, $stateParams, FormService, AuthService, editableOptions) {

    console.log($stateParams);
    var vm = this;
    vm.form_id = $stateParams.id;
    editableOptions.theme = 'bs2';
    vm.c = false;
    // preview form mode
    vm.previewMode = false;

    // new form
    vm.form = {};
    vm.form.form_id = 1;
    vm.form.form_name = 'My Form';
    vm.form.form_fields = [];
    vm.form.field_last_added_id = 0;

    //alert for no fields in form for preview
    vm.no_fields_alert = {type: 'danger', msg: 'No fields in the forms.', toggle: false};


    if(vm.form_id != null)
    {
        FormService.getForm(AuthService.getClientId(), vm.form_id).then(function(data)
        {
            console.log(data);
            vm.form = data.data;
        })
    }

    // previewForm - for preview purposes, form will be copied into this
    // otherwise, actual form might get manipulated in preview mode
    vm.previewForm = {};

    // add new field drop-down:
    vm.addField = {};
    vm.addField.types = FormService.fields;
    vm.addField.new = vm.addField.types[0].name;

    // accordion settings
    vm.accordion = {}
    vm.accordion.oneAtATime = true;

    // create new field button click
    vm.addNewField = function(){

        // incr field_id counter
        vm.form.field_last_added_id++;


        var newField = {
            "field_id" : vm.form.field_last_added_id,
            "field_title" : "New field - " + (vm.form.field_last_added_id),
            "field_type" : vm.addField.new,
            "field_value" : "",
            "field_required" : true,
			"field_disabled" : false,
			"isCollapsed": false
        };

        // put newField into fields array
        vm.form.form_fields.push(newField);
    }

    // deletes particular field on button click
    vm.deleteField = function (field_id){
        for(var i = 0; i < vm.form.form_fields.length; i++){
            if(vm.form.form_fields[i].field_id == field_id){
                vm.form.form_fields.splice(i, 1);
                break;
            }
        }
    }

    // add new option to the field
    vm.addOption = function (field){
        if(!field.field_options)
            field.field_options = new Array();

        var lastOptionID = 0;

        if(field.field_options[field.field_options.length-1])
            lastOptionID = field.field_options[field.field_options.length-1].option_id;

        // new option's id
        var option_id = lastOptionID + 1;

        var newOption = {
            "option_id" : option_id,
            "option_title" : "Option " + option_id,
            "option_value" : option_id
        };

        // put new option into field_options array
        field.field_options.push(newOption);
    }

    // delete particular option
    vm.deleteOption = function (field, option){
        for(var i = 0; i < field.field_options.length; i++){
            if(field.field_options[i].option_id == option.option_id){
                field.field_options.splice(i, 1);
                break;
            }
        }
    }


    // preview form
    vm.previewOn = function(){
        console.log("on preview function");
        if(vm.form.form_fields == null || vm.form.form_fields.length == 0) {
            console.log('Error');
            var msg = 'No fields added yet, please add fields to the form before preview.';
            var btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];

            vm.no_fields_alert.toggle = true;
        }
        else {
            console.log("now on preview mode");
            vm.previewMode = !vm.previewMode;
            vm.form.submitted = false;
            angular.copy(vm.form, vm.previewForm);
        }
    }
    // close no field alert
    vm.closeFieldAlert = function(){
        vm.no_fields_alert.toggle = false;
    }

    // hide preview form, go back to create mode
    vm.previewOff = function(){
        vm.previewMode = !vm.previewMode;
        vm.form.submitted = false;
    }

    // decides whether field options block will be shown (true for dropdown and radio fields)
    vm.showAddOptions = function (field){
        if(field.field_type == "radio" || field.field_type == "dropdown")
            return true;
        else
            return false;
    }

    // deletes all the fields
    vm.reset = function (){
        vm.form.form_fields.splice(0, vm.form.form_fields.length);

        vm.form.field_last_added_id = 0;
    }

    vm.saveForm = function()
    {
        if(vm.form_id == null)
        {
            FormService.postForm(AuthService.getClientId(), {data: vm.form}).then(function(data)
            {
                console.log(data);
            })

        }
        else
        {
            FormService.putForm(AuthService.getClientId(), vm.form_id, {data: vm.form}).then(function(data)
            {
                console.log(data);
            })

        }
    }
});
