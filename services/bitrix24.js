const request = require('request');
const qs = require('qs');

var domain = 'b24-g5zxjf',
    key = '4xwhkpcvvhwgm81y';

var webhook = `https://${domain}.bitrix24.com/rest/1/${key}`;

module.exports = {
    getFieldUser,
    getAllUser,
    addUser,
    filterUser,
    updateUser,
}

async function getAllUser(){
    var query = qs.stringify({
        select : ["ID", "NAME", "LAST_NAME", "PHONE", "EMAIL"]
    });
    var url = `${webhook}/crm.contact.list?${query}`;
    return await _makeGetRequest(url);
}

async function addUser(data){
    var query = qs.stringify(data);
    var url = `${webhook}/crm.contact.add?${query}`;
    console.log(url);
    return await _makeGetRequest(url);
}

async function filterUser(filter){
    var query = qs.stringify(filter);
    var url = `${webhook}/crm.contact.list?${query}`
    console.log(url);
    return await _makeGetRequest(url);
}

async function getFieldUser(){
    return await _makeGetRequest(`${webhook}/crm.contact.fields`);
}

async function updateUser(data){
    var query = qs.stringify(data);
    var url = `${webhook}/crm.contact.update?${query}`;
    console.log(url);
    return await _makeGetRequest(url);
}
function _makeGetRequest(url){
    return new Promise((resolve, reject) => {
        request.get(url, (err, resp, body) => {
            if(err) reject(err);
            resolve(JSON.parse(body));
        })
    })
}