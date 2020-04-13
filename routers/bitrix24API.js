const prefix_domain = 'bitrix24API';

const bitrix24Controller = require('../controller/bitrix24Controller');

module.exports = [
    {
        method: 'GET',
        path: `/${prefix_domain}/user.field`,
        handler: bitrix24Controller.userField,
    },
    {
        method: 'GET',
        path: `/${prefix_domain}/user`,
        handler: bitrix24Controller.getAllUser,
    },
    {
        method: 'GET',
        path: `/${prefix_domain}/user/filter`,
        handler: bitrix24Controller.getUser,
    },
    {
        method: 'GET',
        path: `/${prefix_domain}/user/update`,
        handler: bitrix24Controller.updateUser,
    },
    {
        method: 'GET',
        path: `/${prefix_domain}/addUser`,
        handler: bitrix24Controller.addUser,
    },
];