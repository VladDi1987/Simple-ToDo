import $ from 'jquery';

const formFields = (function () {
    "use strict";

    const $projectTitle = $('#project-title'),
      $projectName = $('#project-name'),
      $projectPriority = $('#project-priority'),
      $projectDescription = $('#project-description'),
      descriptionObject = {
          defaultPositionNumber: 1
      };

    const formFields = {
        name: {
            element: $projectName,
            value: null,
            defaultValue: null
        },
        title: {
            element: $projectTitle,
            value: null,
            defaultValue: null
        },
        description: {
            element: $projectDescription,
            value: null,
            defaultValue: null
        },
        priority: {
            element: $projectPriority,
            value: descriptionObject.defaultPositionNumber,
            defaultValue: descriptionObject.defaultPositionNumber
        }
    };

    return {
        getFormFields: function() {
            return formFields;
        },
        getInputValueForFill(key) {
            return formFields[key].value;
        },
        getInputValueForClean(key) {
            return formFields[key].defaultValue;
        }
    }


})();

export default formFields;