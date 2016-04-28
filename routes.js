var logic = require('./logic/user');
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
    
    //User routes

    api.post('/register', wagner.invoke(function(User){
    	return logic(User).register;
    }));

    api.post('/login', wagner.invoke(function(User) {
        return logic(User).login;
    }));

    
    
    return api;
}