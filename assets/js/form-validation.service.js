import formControllerService from "./form-controller.service";
import $ from 'jquery';

const formValidationService = (function (formControllerService) {
    "use strict";

    const form = formControllerService.getForm();
    const fields = formControllerService.getFormFields();

    function init() {
        Object.keys(formControllerService.getFormFields()).forEach(function (key) {
            $(key).rules("add", {
                required: fields[key].required,
                message: fields[key].required.message
            });
        });

        form.formName.validate({
            submitHandler: function () {
                return false;
            }
        });
    }

    return {
        init: init,
    }


})(formControllerService);

export default formValidationService;
