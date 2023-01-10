import $ from 'jquery';
import dataAccess from './access.service';
import domService from './dom.service';
import modalActionsService from './modal-actions.service';
import storageServices from './storage.services';

const toDo = (function (dataAccess, domManipulations, modalActions, localStorageServices) {
    'use strict';

    const $toDoList = $('#todo');
    const $isPrioritySelected = $('#isPrioritySelected');
    const $projectSelectList = $('#project-list');
    let defaultSelect = null;
    let $removeButtons = null;
    let $infoButtons = null;
    let $editButtons = null;

    function drawList(arr) {
        let list = '';
        for (let key in arr) {
            list += `<li class="list-group-item">
                      <h2 class="task__title mb-3"> ${arr[key].title}  </h2>
                         <div class="task__info">
                            <div class="row mb-3">
                               <div class="task__name col-md-6"><span>Project: </span> ${arr[key].name} </div>
                               <div class="task__priority col-md-6 text-md-right"><span>Priority: </span> ${arr[key].priority} </div></div>
                                 <p class="description text-justify mb-3">
                                     ${arr[key].description}
                                 </p>
                                <div class="task__buttons row justify-content-between">
                                     <div class="btn btn-secondary btn_change col-md-3 mt-2 mt-md-0" index="${key}">Change</div>
                                     <div class="btn btn-danger btn_remove col-md-3 mt-2 mt-md-0" index="${key}">Close</div>
                                     <div class="btn btn-info col-md-3 mt-2 mt-md-0" index="${key}">Open</div>
                                </div>
                             </div>
                          </li>`;
        }
        $toDoList.html(list);
        $removeButtons = $('.btn_remove');
        $removeButtons.on('click', onRemoveButtonClick);

        function onRemoveButtonClick() {
            let item = $(this).attr('index');
            dataAccess.removeItem(item);
            localStorageServices.setDataToLocalStorage();
            domManipulations.destroyLists();
            displayLists(dataAccess.getData());
        }

        $infoButtons = $('.btn-info');
        $infoButtons.on('click', onInfoButtonClick);

        function onInfoButtonClick() {
            let item = $(this);
            domManipulations.showDescription(item);
        }

        $editButtons = $('.btn_change');
        $editButtons.on('click', onEditButtonClick);

        function onEditButtonClick() {
            let index = +$(this).attr('index');
            modalActions.fillFields(dataAccess.getItem(index));
            modalActions.editParam = {
                index: index,
                toggle: true
            };
            modalActions.openModal();
        }
    }

    function drawProjectList(data) {
        let optionsList = '';
        const defaultSelect = {name: 'All', value: ''};
        const list = [defaultSelect, ...data];
        list.forEach(function (item) {
            optionsList += `<option value=${item.value}>${item.name}</option>`;
        })
        $projectSelectList.html(optionsList);
    }

    function priorityControl() {
        $isPrioritySelected.on('change', function () {
            if ($isPrioritySelected.prop('checked')) {
                //console.log('checked');
                domManipulations.destroyLists();
                displayLists(dataAccess.getDataByPriority());
            } else {
                //console.log('not checked');
                domManipulations.destroyLists();
                displayLists(dataAccess.getData());
            }
        });
    }

    function sharedDataFromForm(newProject) {
        //console.log(newProject);
        uncheckPriorityControl();
        dataAccess.addItem(newProject);
        domManipulations.destroyLists();
        displayLists(dataAccess.getData());
        localStorageServices.setDataToLocalStorage();
    }

    function uncheckPriorityControl() {
        if ($isPrioritySelected.prop('checked')) {
            $isPrioritySelected.prop('checked', false);
        }
    }

    function getProjectName() {
        $projectSelectList.on('change', function () {
            getDataByProjectName($(this).val());
        });
    }

    function getDataByProjectName(projectName) {
        if (projectName) {
            domManipulations.destroyToDoList();
            filterByProjectName(dataAccess.getData(), projectName);
        } else {
            domManipulations.destroyToDoList();
            displayLists(dataAccess.getData());
        }
    }

    function filterByProjectName(arr, projectName) {
        let array = arr.filter(function (item) {
            if (item.name === projectName) {
                return item;
            }
        });
        //console.log(newData);
        domManipulations.destroyToDoList();
        drawList(array);
    }

    function displayLists(data) {
        drawList(data);
        drawProjectList(dataAccess.getUniqueName(data));
    }

    function init() {
        displayLists(dataAccess.getData());
        priorityControl();
        getProjectName();
    }

    return {
        init: init,
        displayLists: displayLists,
        sharedDataFromForm: sharedDataFromForm
    }


})(dataAccess, domService, modalActionsService, storageServices);

export default toDo;
