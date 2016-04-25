var express = require("express");
var wagner = require("wagner-core");
var config = require("./config.json");

var app = express();

require('./models')(wagner,config);

app.use(config.version, require('./routes')(wagner));

app.listen(3000, function() {
    console.log("Server started");
});