var _ = require('underscore');
var mongoose = require('mongoose');

module.exports = function (wagner, config) {
    mongoose.connect(config.db);
    
    


};