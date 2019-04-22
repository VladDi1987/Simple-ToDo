import dataAccess from '../js/access.Service';

const localStorageServices = (function () {
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

export default localStorageServices;