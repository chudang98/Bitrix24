const express = require('express');
const request = require('request');
const util = require('util')
const queryString = require('query-string');

const requestAwait = util.promisify(request);
const router = express.Router();

var client_id = 'b24-g5zxjf',
    application_id = 'local.5e85b4fb8b9279.08502386',
    application_key = 'swasWRcIUWRd8vQDfEnpyRmtbBesZWmz7kKnGDKDE1fDpNOtNe';

var domain = `https://${client_id}.bitrix24.com/`;

var urlGetCode = domain + `oauth/authorize/?response_type=code&client_id=${application_id}&redirect_uri=app_URL`,
    url_user = domain + 'rest/user.fields?',
    urlGetAccessToken = domain + `oauth/token/?client_id=${application_id}&grant_type=authorization_code&client_secret=${application_key}&redirect_uri=http%3A%2F%2Flocalhost%3A70005&code=authentication_request_code&scope=required_permission`,
    urlGetUserFields = domain + `rest/user.fields?auth=authentication_code`;


var url = 'https://b24-3cd5eh.bitrix24.com/oauth/authorize/?response_type=code&client_id=local.5e843effeeeff0.59621536&redirect_uri=app_URL',
 next = 'https://b24-3cd5eh.bitrix24.com/oauth/token/?client_id=local.5e843effeeeff0.59621536&grant_type=authorization_code&client_secret=Yl5ro0iXQEA6fWdoQ67MNDwGJkzs29nM2O1BuVkaotb11AbxD0&redirect_uri=http%3A%2F%2Flocalhost%3A70005&code=authentication_request_code&scope=required_permission',
 url_user = 'https://b24-3cd5eh.bitrix24.com/rest/user.fields?auth=authentication_code',
 url_add_contact = 'https://b24-3cd5eh.bitrix24.com/rest/crm.contact.list?auth=authentication_code',
 url_add_user = 'https://b24-3cd5eh.bitrix24.com/rest/user.add?auth=authentication_code'

var obj_data = {
    EMAIL: 'testemail@gmail.com',
    NAME: 'Duck Donald',
    EXTRANET : 'Y',
    SONET_GROUP_ID: '[...]',
    UF_DEPARTMENT: '[...]'
};

router.route('/getAccess').get((req, res) => {
    return res.redirect(urlGetCode);
});

var access_token;
router.route('/getCode').get(async (req, res) => {
    var code = req.query.code;
    console.log(code);
    /* 
        To take a token after access_token expried
    
        next = next.replace('grant_type=authorization_code', 'grant_type=refresh_token');
        next = next.replace('code=', 'refresh_token=');
        
        and replace authentication_request_code the refresh_token
    */

   urlGetAccessToken = urlGetAccessToken.replace('authentication_request_code', code);
    // request.get(next, (err, resp, body) => {
    //     body = JSON.parse(body);
    //     access_token = body.access_token;
    //     // console.log(access_token);
    //     // request.get();

    //     // var url_get_user = `https://b24-3cd5eh.bitrix24.com/rest/user.get.json?ID=1&auth=${access_token}`
    //     // console.log(url_get_user);
    //     // return res.redirect(url_get_user);
    // });

    try{
        var infor = await getAccessKey(urlGetAccessToken);
        console.log('GET ACCESS_KEY');
        access_token = infor.access_token;
        url_user = urlGetUserFields;
        url_user = url_user.replace('authentication_code', access_token);
    }catch(err){
        console.log(err);
    }

    // var query = '&' + queryString.stringify(obj_data);
    // url_user += query;
    console.log(url_user);

    return res.redirect(url_user);
    // console.log(access_token);
    return res.json({
        datat: 'test',
    })
})

function getAccessKey(url){
    return new Promise((resolve, reject) => {
        request.get(url, (err, resp, body) => {
            if(err) reject(err);
            resolve(JSON.parse(body));
        })
    })
}


module.exports = router;