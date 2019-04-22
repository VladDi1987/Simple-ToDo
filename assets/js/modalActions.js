import $ from 'jquery';
import formFields from '../js/formFields.Service';

const modalActions = (function (formFields) {
    'use strict';

    const formInputs = formFields.getFormFields();
    const $toDoModal = $('#myModal'),
      $modalHead = $('.modal__head');


    function cleanModal() {
        Object.keys(formInputs).forEach(function (key) {
            formInputs[key].element.val(formFields.getInputValueForClean(key)).removeClass('has-success');
        });
    }

    function closeModal() {
        $toDoModal.removeClass('modal_opened');
    }

    function openModal() {
        $toDoModal.addClass('modal_opened');
        checkFormTitle();
    }

    function fillFields(obj) {
        Object.keys(formInputs).forEach(function (key) {
            formInputs[key].element.val(obj[key]);
        });
    }

    function checkFormTitle() {
        (modalActions.editParam.toggle) ? $modalHead.text("Изменить") : $modalHead.text("Добавить");
    }

    function modalShutDown() {
        cleanModal();
        closeModal();
        checkFormTitle();
    }

    return {
        openModal: openModal,
        fillFields: fillFields,
        modalShutDown: modalShutDown,
        editParam: {
            index: null,
            toggle: false
        }
    }

})(formFields);

export default modalActions;