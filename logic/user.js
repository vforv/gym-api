_ = require('underscore');
status = require('http-status');

function userWrapper(User) {

    var user = {
        login: function (req, res) {
            res.send("TEST");

        },
        register: function(req,res) {
        	var body = _.pick(req.body, 'name' ,'email', 'password');

        	User.create({
        		name: body.name,
        		email: body.email,
        		hash: body.password
        	})
        	.then(function(user){
        		return res.send(user.toPublicJSON());
        	}, function(err){
        		if(err.code === 11000) {
        			return res
        				.status(status.BAD_REQUEST)
        				.json({"error": "This email already exists."});
        		}

        		return res
        				.status(status.INTERNAL_SERVER_ERROR)
        				.json({"error": "Internal server error."});
        		
        	});
        }
    }

    return user;
}

module.exports = userWrapper;