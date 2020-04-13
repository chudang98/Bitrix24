const bitrix24Service = require('./../services/bitrix24.js');

module.exports = {
    getAllUser,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    importFromCSV,
    exportToCSV,
    userField,
}
async function userField(request, h){
    return await bitrix24Service.getFieldUser();
    
}

async function getAllUser(request, h){
    return bitrix24Service.getAllUser();
}

async function getUser(request, h){
    var filter = {
        filter : {
            // "NAME": ["Donald", "chu", "AA"],
            // "LAST_NAME" : ["đăng"]
            // ">ID": "3",
            // "%NAME" : ["donald"],
            // "%NAME" : ["date"],
            "%EMAIL" : ["@gmail"],
            // "PHONE" : "03123123",
        },
        select: [ "ID", "NAME", "LAST_NAME", "EMAIL"]
    }
    return await bitrix24Service.filterUser(filter)
}

async function addUser(request, h){
    var obj_data = {
        fields: {
            "LAST_NAME" : 'Duckkkkk',
            "SECOND_NAME" : 'Vannnnnn',
            "NAME" : 'Donaldddd',
        },
        'params' : { 
            "REGISTER_SONET_EVENT" : "Y" 
        }
    };
    return await bitrix24Service.addUser(obj_data);
}

async function updateUser(){
    var data = {
        id: 7,
        fields: {
            "NAME": "UPDATEEEE",
            "EMAIL": [{ 
                "VALUE" : "adonald@edu.com"
            }],
            "PHONE": [{ 
                "VALUE": "1234555", 
                "VALUE_TYPE": "WORK" 
            }]
        }
    }
    return await bitrix24Service.updateUser(data);
}

async function deleteUser(){

}

async function importFromCSV(){

}

async function exportToCSV(){

}