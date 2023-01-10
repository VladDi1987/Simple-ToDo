import dataAccess from './access.service';

const storageServices = (function () {
    "use strict";

    function setDataToLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(dataAccess.getData()));
    }

    function getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem('todo')) || [];
    }

    return {
        setDataToLocalStorage: setDataToLocalStorage,
        getLocalStorageData: getDataFromLocalStorage
    }

})();

export default storageServices;
