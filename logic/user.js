var _ = require('underscore');
var status = require('http-status');
var module;

function userWrapper(User) {

    var user = {
        login: function (req, res) {
            var body = _.pick(req.body, 'email', 'password');

            User.findOne({
                    email: body.email
             })
                .then(function(user) {

                    if(user && user !== null && user.validatePassword(body.password)) {

                        return res.status(status.OK)
                                  .json({"user": user.toPublicJSON(), "token": user.getToken()});
                    };
                        return res.status(status.UNAUTHORIZED)
                                  .json({"error": "Wrong email or password."});
                })
                .catch(function(err) {
                        return res.status(status.UNAUTHORIZED)
                                  .json({"error": "Wrong email or password."});
                });

        },
        register: function (req, res) {
            var body = _.pick(req.body, 'name', 'email', 'password', 'role');
            return res
                                .status(status.INTERNAL_SERVER_ERROR)
                                .json({"error": "Internal server error."});
            User.create({
                name: body.name,
                email: body.email,
                hash: body.password,
                roles: body.role
            })
                    .then(function (user) {
                        return res.send(user.toPublicJSON());
                    }, function (err) {
                        if (err.code === 11000) {
                            return res
                                    .status(status.BAD_REQUEST)
                                    .json({"error": "This email already exists."});
                        }

                        return res
                                .status(status.INTERNAL_SERVER_ERROR)
                                .json({"error": "Internal server error."});

                    });
        }
    };

    return user;
};

module.exports = userWrapper;