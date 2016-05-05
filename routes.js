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
    route.get('/' ,function(req,res) {
        res.send("Hello World");
    });
    
    var userLogic = require('./logic/user');
    var gymLogic = require('./logic/gym');
    
    route.post('/register', wagner.invoke(function(User){
    	return userLogic(User).register;
    }));

    route.post('/login', wagner.invoke(function(User) {
        return userLogic(User).login;
    }));
    
    route.get('/gyms', wagner.invoke(function(Gym){
        return gymLogic(Gym).index;
    }));
    
    route.get('/gym/search', wagner.invoke(function(Gym){
        return gymLogic(Gym).show;
    }));
    
    route.post('/gyms/add', wagner.invoke(function(Gym){
        return gymLogic(Gym).store;
    }));
    
    route.post('/gym/claim', wagner.invoke(function(Gym) {
        return gymLogic(Gym).put;
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
};