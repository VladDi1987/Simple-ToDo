import $ from 'jquery';
import dataAccess from '../js/access.Service';
import modalActions from '../js/modalActions';
import domManipulations from '../js/domManipulations';
import toDo from '../js/ToDo.Service';
import formFields from '../js/formFields.Service';
import localStorageServices from '../js/localStorage.Services';

const form = (function (dataAccess, modalActions, toDo, domManipulations, formFields, localStorageServices) {
    'use strict';

    const formInputs = formFields.getFormFields();
    let $saveButton = $('#save'),
      project = {};
    const data = dataAccess.getData();

    $saveButton.on('click', addItemToData);

    function addItemToData() {
        let isEdit = modalActions.editParam.toggle,
          editIndex = modalActions.editParam.index;
        project = {};
        Object.keys(formInputs).forEach(function (key) {
            project[key] = formInputs[key].element.val();
        });
        (isEdit) ? editMode(editIndex) : addMode();
        modalActions.editParam.toggle = false;
    }

    function addMode() {
        console.log("add");
        toDo.sharedDataFromForm(project);
        modalActions.modalShutDown();
    }

    function editMode(i) {
        console.log("edit");
        dataAccess.editItem(i, project);
        localStorageServices.setDataToLocalStorage();
        modalActions.modalShutDown();
        domManipulations.destroyLists();
        toDo.displayLists(dataAccess.getData());
    }


})(dataAccess, modalActions, toDo, domManipulations, formFields, localStorageServices);

export default form;