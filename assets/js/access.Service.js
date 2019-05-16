import localStorageServices from '../js/localStorage.Services';

const dataAccess = (function (localStorageServices) {

    'use strict';

    /*    const data = [
            {
                title: 'title of the task1',
                name: 'project1',
                priority: 1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, nisi, nobis! Ab aliquid, aut dicta nam sint soluta veniam veritatis.'
            },
            {
                title: 'title of the task2',
                name: 'project3',
                priority: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
            },
            {
                title: 'title of the task3',
                name: 'project3',
                priority: 3,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, nisi, nobis! Ab aliquid, aut dicta nam sint soluta veniam veritatis.'
            },
            {
                title: 'title of the task4',
                name: 'project2',
                priority: 1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
            },
            {
                title: 'title of the task5',
                name: 'project5',
                priority: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, nisi, nobis!.'
            },
            {
                title: 'title of the task6',
                name: 'project5',
                priority: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, nisi, nobis!.'
            }
        ];*/

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
        let newData = data.slice();
        return newData.sort(sortByPriority);
    }

    function sortByPriority(a, b) {
        return a.priority - b.priority;
    }

    function getUniqueName(arr) {
        let unique = {};
        for (let key in arr) {
            let str = arr[key].name;
            unique[str] = true;
        }
        return unique;
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

})(localStorageServices);

export default dataAccess;