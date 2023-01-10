import $ from 'jquery';
import formControllerService from './form-controller.service';

const modalActionsService = (function (formControllerService) {
    'use strict';

    const $modal = $('#modal');
    const $modalHead = $('.modal__head');
    const $openModalButton = $('#open-modal');
    const $closeModalButton = $('#cancel');
    const formInputs = formControllerService.getFormFields();
    const inputKeys = Object.keys(formControllerService.getFormFields())

    function modals() {
        $openModalButton.on('click', function () {
            openModal();
        });
        $closeModalButton.on('click', function () {
            modalShutDown();
            modalActionsService.editParam.toggle = false;
            //console.log(modalActionsService.editParam.toggle);
        });
    }

    function cleanModal() {
        inputKeys.forEach(function (key) {
            formInputs[key].element.val(formControllerService.getDefaultValue(key)).removeClass('has-success');
        });
    }

    function closeModal() {
        $modal.removeClass('modal_opened');
    }

    function openModal() {
        $modal.addClass('modal_opened');
        checkFormTitle();
    }

    function fillFields(obj) {
        inputKeys.forEach(function (key) {
            formInputs[key].element.val(obj[key]);
        });
    }

    function checkFormTitle() {
        (modalActionsService.editParam.toggle) ? $modalHead.text("Change") : $modalHead.text("Add");
    }

    function modalShutDown() {
        cleanModal();
        closeModal();
        checkFormTitle();
    }

    return {
        modals: modals,
        openModal: openModal,
        fillFields: fillFields,
        modalShutDown: modalShutDown,
        editParam: {
            index: null,
            toggle: false
        }
    }

})(formControllerService);

export default modalActionsService;
