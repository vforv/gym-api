var logic = require('./logic');
var express = require('express');
var bodyParser = require('body-parser');


/**
 * 
 * Routes /api/v*
 * 
 * @param {obj} wagner
 * @returns {obj}
 */
module.exports = function (wagner) 
{
    
    var api = express.Router();
    api.use(bodyParser.json());
    
    api.get('/me', wagner.invoke(function(User) {
        return logic(User).me
    }));
    
    return api;
}