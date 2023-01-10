import $ from 'jquery';

const domService = (function () {
    'use strict';

    const $toDoList = $('#todo');
    const $projectSelectList = $('#project-list');

    function destroyToDoList() {
        $toDoList.html('');
    }

    function destroyProjectList() {
        $projectSelectList.html('');
    }

    function showDescription(element) {
        if (element.parents().children('p').css('display') === 'none') {
            element.text('Open');
            element.parents().children('p').css({'display': 'block'})
        }
        else {
            element.text('Close');
            element.parents().children('p').css({'display': 'none'})
        }
    }
    
    function destroyLists() {
        destroyToDoList();
        destroyProjectList();
    }

    return {
        destroyLists: destroyLists,
        destroyToDoList: destroyToDoList,
        destroyProjectList: destroyProjectList,
        showDescription: showDescription
    }

})();

export default domService;
