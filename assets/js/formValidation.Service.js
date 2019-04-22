import $ from 'jquery';
import formFields from '../js/formFields.Service';

const validationService = (function (formFields) {
    "use strict";

    const formInputs = formFields.getFormFields();
    let $saveButton = $('#save');


    const ValidationTypes = {
        Required: 1,
        MaxLength: 2,
        MinLength: 3,
        RegExp: 4,
        Website: 5,
        Email: 6,
        MaxNumber: 7,
        IsDate: 8,
        DateMoreThan: 9,
        DateLessThan: 10,
        DateInPeriod: 11
    };

    const rules = {
        "FormName": {
            formInput: {
                rules: [
                    {
                        type: ValidationTypes.Required,
                        errorMessage: "Form input cannot be empty"
                    }
                ]
            },
            anotherFormInput: {
                rules: [
                    {
                        type: ValidationTypes.Required,
                        errorMessage: "Another form input entity cannot be empty"
                    }
                ]
            }
        }
    };


})(formFields);

export default validationService;