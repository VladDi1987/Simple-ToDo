import modalsController from '../js/modals.Controller';
import toDo from '../js/ToDo.Service';
import form from '../js/form.Controller';
import localStorageServices from '../js/localStorage.Services';

(function (modalsController, toDo) {
    'use strict';

    activate();

    function activate() {
        modalsController.modals();
        toDo.init();
    }

})(modalsController, toDo);