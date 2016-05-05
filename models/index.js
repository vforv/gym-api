var _ = require('underscore');
var mongoose = require('mongoose');
var config = require('config');

module.exports = function (wagner) {
    mongoose.connect(config.get('db'));

    var user = mongoose.model('User', require('./user'));
    var gym = mongoose.model('Gym', require('./gym'));

    gym.createMapping(function (err, mapping) {
        if (err) {
            console.log("error creating mapping");
            console.log(err);
        } else {
            console.log("Mapping created");
            console.log(mapping);
        }
    });

    var stream = gym.synchronize();
    var count = 0;

    stream.on('data', function () {
        count++;
    });

    stream.on('close', function () {
        console.log("Indexed " + count + " documents");
    });

    stream.on('error', function (err) {
        console.log(err);
    });

    var models = {
        User: user,
        Gym: gym
    };

    _.each(models, function (value, key) {
        wagner.factory(key, function () {
            return value;
        })
    });

    return models;

};