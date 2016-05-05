var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var validators = require('mongoose-validators');


var gymSchema = {
    name: {
        type: String,
        required: true,
        es_type: 'multi_field',
        es_fields: {
            multi_field: {
                type: 'string',
                index: 'analyzed'
            },
            untouched: {type: 'completion',index_analyzer: 'simple',search_analyzer: 'simple',payloads: true}
//                es_type: 'completion',
//                es_index_analyzer: 'simple',
//                es_search_analyzer: 'simple',
//                es_payloads: true,
        },
    },
    country: {type: String, required: true},
    town: {type: String, required: true},
    region: {type: String, required: false},
    address: {type: String, required: false},
    email: {type: String, validate: validators.isEmail()},
    tel: {type: String},
    createDate: {type: Date, default: Date.now},
    updateDate: {type: Date, default: Date.now},
    isDeleted: {type: Boolean, default: false},
    deletedDate: {type: Date}

}

var schema = new mongoose.Schema(gymSchema);

schema.plugin(mongoosastic, {
    hosts: [
        'localhost:9200'
    ]
});


module.exports = schema;