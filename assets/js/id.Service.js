import dataAccess from '../js/access.Service';

const IdController = (function (dataAccess) {
    'use strict';

    const data = dataAccess.getData();

    let randomDiapazone = {
        min: 1,
        max: 100
    };

    function getUniqueID() {
        let generatedID = getRandomNumber(randomDiapazone.min, randomDiapazone.max);
        return checkedIDs(data, generatedID)
          ? getUniqueID()
          : generatedID;
    }

    function checkedIDs(array, value) {
        let findedObj = array.find(function (obj) {
            if(obj && obj.id === value) {
                return obj;
            }
        });
        console.log(findedObj);
        return !!findedObj && findedObj.id;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) * min);
    }

    return {
        setProjectID: getUniqueID
    }

})(dataAccess);

export default IdController;