import $ from 'jquery';
import dataAccess from './access.service';
import modalActionsService from './modal-actions.service';
import domService from './dom.service';
import toDo from './to-do.service';
import storageServices from './storage.services';
import formControllerService from "./form-controller.service";

const form = (function (dataAccess, modalActions, toDo, domManipulations, formControllerService, localStorageServices) {
    'use strict';

    const formInputs = formControllerService.getFormFields();
    const form = formControllerService.getForm();
    const $saveButton = $('#save');

    $saveButton.on('click', addItemToData);

    function addItemToData() {
        let isEdit = modalActions.editParam.toggle;
        let editIndex = modalActions.editParam.index;
        let project = {};

        if (!form.formName.valid()) {
            return false;
        }
        Object.keys(formInputs).forEach(function (key) {
            project[key] = formInputs[key].element.val();
        });
        (isEdit) ? editMode(editIndex, project) : addMode(project);
        modalActions.editParam.toggle = false;
    }

    function addMode(project) {
        console.log("add");
        toDo.sharedDataFromForm(project);
        modalActions.modalShutDown();
    }

    function editMode(i, project) {
        console.log("edit");
        dataAccess.editItem(i, project);
        localStorageServices.setDataToLocalStorage();
        modalActions.modalShutDown();
        domManipulations.destroyLists();
        toDo.displayLists(dataAccess.getData());
    }


})(dataAccess, modalActionsService, toDo, domService, formControllerService, storageServices);

export default form;
