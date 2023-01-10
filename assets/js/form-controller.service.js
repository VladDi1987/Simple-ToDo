import $ from 'jquery';

const formControllerService = (function () {
    "use strict";

    const $formName = $("form[name='project']");
    const $projectTitle = $('#title');
    const $projectName = $('#name');
    const $projectPriority = $('#priority');
    const $projectDescription = $('#description');

    const form = {
        formName: $formName,
        fields: {
            name: {
                element: $projectName,
                value: null,
                defaultValue: null,
                required: true,
                messages: "Field is empty"
            },
            title: {
                element: $projectTitle,
                value: null,
                defaultValue: null,
                required: true,
                messages: "Field is empty"

            },
            description: {
                element: $projectDescription,
                value: null,
                defaultValue: null,
                required: false,
                messages: ""
            },
            priority: {
                element: $projectPriority,
                value: 1,
                defaultValue: 1,
                required: true,
                messages: ""
            }
        }
    };

    return {
        getForm: function () {
            return form;
        },
        getFormFields: function () {
            return form.fields;
        },
        getInputValue(key) {
            return form.fields[key].value;
        },
        getDefaultValue(key) {
            return form.fields[key].defaultValue;
        }
    }


})();

export default formControllerService;
