import dataAccess from './access.service';

const IdController = (function (dataAccess) {
    'use strict';

    const data = dataAccess.getData();
    const randomRange = {
        min: 1,
        max: 100
    };

    function getUniqueID() {
        let generatedID = getRandomNumber(randomRange.min, randomRange.max);
        return checkedIDs(data, generatedID)
          ? getUniqueID()
          : generatedID;
    }

    function checkedIDs(array, value) {
        let obj = array.find(function (obj) {
            if(obj && obj.id === value) {
                return obj;
            }
        });
        //console.log(obj);
        return !!obj && obj.id;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) * min);
    }

    return {
        setProjectID: getUniqueID
    }

})(dataAccess);

export default IdController;
