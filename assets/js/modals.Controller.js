import $ from 'jquery';
import modalActions from '../js/modalActions';


const modalsController = (function (modalActions) {
    'use strict';

    let $openModalButton = $('#open-modal'),
      $closeModalButton = $('#cancel');

    function modals() {
        $openModalButton.on('click', function () {
            modalActions.openModal();
        });
        $closeModalButton.on('click', function () {
            // console.log('click');
            modalActions.modalShutDown();
            modalActions.editParam.toggle = false;
            console.log(modalActions.editParam.toggle);
        });
    }

    return {
        modals: modals
    }

})(modalActions);

export default modalsController;