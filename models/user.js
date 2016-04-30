var mongoose = require('mongoose');
var crypto = require('crypto');
var _ = require('underscore');

var userSchema = {
    name: {type: String, required: false},
    picture: {type: String, required: false},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: false},
    salt: {type: String, required: false},
    createDate: {type: Date, default: Date.now},
    updateDate: {type: Date, default: Date.now},
    activationCode: {type: String, required: false},
    activationDate: {type: Date, required: false},
    status: {type: String},
    deletedDate: {type: Date},
    isDeleted: {type: Boolean, default: false},
}

var schema = new mongoose.Schema(userSchema);

schema.pre('save', function (next) {
    var _this = this;
    _this.updateDate = Date.now;
    next();
});


schema.virtual('hash').set(function (password) {
    var _this = this;

    _this.salt = new Buffer(32).toString('base64');

    var hash = crypto.pbkdf2Sync(password, _this.salt, 1000, 32).toString('hex');
    _this.password = hash;
});

schema.methods.toPublicJSON = function () {
    var json = this.toJSON();

    return _.pick(json, 'name', 'email', '_id', 'updateDate', 'createDate', 'picture');
};

schema.methods.validatePassword = function (password) {
    var _this = this;

    var hash = crypto.pbkdf2Sync(password, _this.salt, app.config.bcrypt.iterations, app.config.bcrypt.bytes).toString('hex');
    return _this.password === hash;
};


module.exports = schema;
