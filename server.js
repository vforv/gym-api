var express = require("express");
var wagner = require("wagner-core");
var config = require("./config.json");
var PORT = process.env.PORT || 3000;

var app = express();

require('./models')(wagner,config);

app.use(config.version, require('./routes')(wagner));

app.listen(PORT, function() {
    console.log("Server started");
});