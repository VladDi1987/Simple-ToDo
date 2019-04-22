import $ from 'jquery';

const domManipulations = (function () {
    'use strict';

    let $toDoList = $('#todo'),
      $projectSelectList = $('#project-list');

    function destroyToDoList() {
        $toDoList.html('');
    }

    function destroyProjectList() {
        $projectSelectList.html('');
    }

    function showDescription(element) {
        if (element.parents().children('p').css('display') === 'none') {
            element.text('Свернуть');
            element.parents().children('p').css({'display': 'block'})
        }
        else {
            element.text('Развернуть');
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

export default domManipulations;