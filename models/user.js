var mongoose = require('mongoose');

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