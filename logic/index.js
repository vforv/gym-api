function meWrapper(User) {

    var me = {
        me: function (req, res) {
            console.log(User);
            res.send("TEST");

        }
    }

    return me;
}

module.exports = meWrapper;