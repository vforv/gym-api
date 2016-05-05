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
    var roles = require('./middlewares/roles')(UserModal);
    var route = express.Router();
    route.use(bodyParser.json());

    

    
    
    
    //GUEST USERS
    route.get('/',roles.admin ,function(req,res) {
        res.send("Hello World");
    });
    
    route.post('/register', wagner.invoke(function(User){
    	return logic(User).register;
    }));

    route.post('/login', wagner.invoke(function(User) {
        return logic(User).login;
    }));

    //AUTHENTICATED USERS
    route.use(auth.authenticated);
    
    route.get('/test',roles.admin ,function(req,res) {
        res.send("Hello World");
    });
    
    route.get('/profile',function(req,res) {
        res.json(req.user);
    });
    
    return route;
}