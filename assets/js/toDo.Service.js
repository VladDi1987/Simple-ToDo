import $ from 'jquery';
import dataAccess from '../js/access.Service';
import domManipulations from '../js/domManipulations';
import modalActions from '../js/modalActions';
import localStorageServices from '../js/localStorage.Services';

const toDo = (function (dataAccess, domManipulations, modalActions, localStorageServices) {
    'use strict';

    let $toDoList = $('#todo'),
      $isPrioritySelected = $('#isPrioritySelected'),
      $projectSelectList = $('#project-list'),
      defaultSelect = 'all',
      currentProject = null,
      $removeButtons = null,
      $infoButtons = null,
      $editButtons = null;

    function drawList(arr) {
        let list = '';
        for (let key in arr) {
            list += `<div class="list-group-item">
                      <h2 class="task__title mb-3"> ${arr[key].title}  </h2>
                         <div class="task__info">
                            <div class="row mb-3">
                               <div class="task__name col-md-6"><span>Проект: </span> ${arr[key].name} </div>
                               <div class="task__priority col-md-6 text-md-right"><span>Priority: </span> ${arr[key].priority} </div></div>
                                 <p class="description text-justify mb-3">
                                     ${arr[key].description}
                                 </p>
                                <div class="task__buttons row justify-content-between">
                                     <div class="btn btn-secondary btn_change col-md-3 mt-2 mt-md-0" index="${key} ">Изменить</div>
                                     <div class="btn btn-danger btn_remove col-md-3 mt-2 mt-md-0" index="${key} ">Закрыть</div>
                                     <div class="btn btn-info col-md-3 mt-2 mt-md-0" index="${key} ">Развернуть</div>
                                </div>
                             </div>
                          </div>`;
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
        for (let j in  data) {
            optionsList += '<option value="' + j + '">' + j + '</option>';
        }
        $projectSelectList.html('<option value="' + defaultSelect + '">' + 'Все' + '</option>' + optionsList);
    }

    function priorityControl() {
        $isPrioritySelected.on('change', function () {
            if ($isPrioritySelected.prop('checked')) {
                //console.log('checked');
                dataAccess.getDataByPriority();
                domManipulations.destroyLists();
                displayLists(dataAccess.getDataByPriority());
            }
            else {
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
            currentProject = $(this).val();
            getDataByProjectName();
        });
    }

    function getDataByProjectName() {
        if (currentProject === defaultSelect) {
            domManipulations.destroyToDoList();
            displayLists(dataAccess.getData());
        }
        else {
            //console.log('else');
            domManipulations.destroyToDoList();
            filterByProjectName(dataAccess.getData());
        }
    }

    function filterByProjectName(arr) {
        let newData = arr.filter(function (item) {
            if (item.name === currentProject) {
                return item;
            }
        });
        //console.log(newData);
        domManipulations.destroyToDoList();
        drawList(newData);
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


})(dataAccess, domManipulations, modalActions, localStorageServices);

export default toDo;