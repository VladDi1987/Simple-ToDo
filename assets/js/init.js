import toDo from './to-do.service';
import form from './form-actions.service';
import storageServices from './storage.services';
import validationService from './form-validation.service';
import IdController from './id-generator.service';
import modalActionsService from "./modal-actions.service";

(function (modalActionsService, validationService,toDo) {
    'use strict';

    activate();

    function activate() {
        modalActionsService.modals();
        validationService.init();
        toDo.init();
    }

})(modalActionsService, validationService, toDo);
