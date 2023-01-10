import storageServices from './storage.services';

const dataAccess = (function (localStorageServices) {

    'use strict';

    const data = localStorageServices.getLocalStorageData();

    function getData() {
        return data;
    }

    function addItem(item) {
        data.push(item);
    }

    function removeItem(i) {
        data.splice(i, 1);
    }

    function getItem(i) {
        return data[i];
    }

    function editItem(i, obj) {
        data.splice(i, 1, obj);
    }

    function getDataByPriority() {
        //let newData = data.slice();
        return [...data].sort(sortByPriority);
    }

    function sortByPriority(a, b) {
        return b.priority - a.priority;
    }

    function getUniqueName(arr) {
        let unique = {};
        for (let key in arr) {
            let str = arr[key].name;
            unique[str] = true;
        }
        return Object.keys(unique).map(function (value){
            return {
                name: value,
                value: value,
            };
        });
    }


    return {
        getData: getData,
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem,
        editItem: editItem,
        getDataByPriority: getDataByPriority,
        getUniqueName: getUniqueName
    };

})(storageServices);

export default dataAccess;
