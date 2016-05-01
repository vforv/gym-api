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
    var UserModal = wagner.invoke(function(User) {
        return User;
    });
    var auth = require('./middlewares/auth')(UserModal);
    var route = express.Router();
    route.use(bodyParser.json());

    

    
    
    
    //GUEST USERS
    route.post('/register', wagner.invoke(function(User){
    	return logic(User).register;
    }));

    route.post('/login', wagner.invoke(function(User) {
        return logic(User).login;
    }));

    //AUTHENTICATED USERS
    route.use(auth.authenticated);
    
    route.get('/test', function(req,res) {
        res.send("HELLOW");
    });
    
    return route;
}