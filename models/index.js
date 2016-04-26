var _ = require('underscore');
var mongoose = require('mongoose');

module.exports = function (wagner, config) {
    mongoose.connect(config.db);
    
    var user = mongoose.model('User',require("./user"));
    
    var models = {
        User: user
    };
    
    _.each(models, function(value, key){
        wagner.factory(key, function(){
            return value;
        })
    });
    
    return models;

};