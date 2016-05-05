var _ = require('underscore');
var status = require('http-status');
var faker = require('faker');
var module;

function gymWrapper(Gym) {

    var gym = {
        index: function () {

        },
        store: function (req, res) {
            for (var i = 1; i < 100; i++) {
                console.log(faker.address.ukCountry)
                Gym
                        .create({
                            name: faker.company.companyName(),
                            country: faker.address.country(),
                            town: faker.address.city(),
                            region: faker.address.state(),
                            address: faker.address.streetAddress(),
                            email: faker.internet.email()
                        })
                        .then(function (gym) {
                            console.log(gym);
                        }, function (err) {
                            console.log(err);
                        });
            }

            res.status(status.OK)
                    .json({"success": "message"});
        },
        put: function () {

        },
        show: function (req, res) {
            if (req.query.q) {
//                Gym.search(
////                    query_string:{query: req.query.q}
//                        {
//                            query_string: {query: req.query.q}
//                        }, function (err, results) {
//                    if (err)
//                        return res.status(status.INTERNAL_SERVER_ERROR).json(err);
//
//                    var data = results.hits.hits.map(function (hit) {
//                        return hit;
//                    });
//
//                    return res.status(status.OK)
//                            .json(data);
//                });


//, {
//                    "suggest": {
//                        "tag-suggest": {
//                            "text": req.query.q,
//                            "completion": {
//                                "field": "name"
//                            }
//                        }
//                    },
//                    "size": 0
//                }

                Gym.search({
                    "multi_match": {
                        "fields": ["multi_field"],
                        "query": "Leannon LLC",
                        "fuzziness": "AUTO"
                    }


                },
                function (err, results) {
                    if (err) {
                        return console.log(JSON.stringify(err, null, 4));
                    }
                    return console.log(JSON.stringify(results, null, 4));
                });
            }
        }
    };


    return gym;
}

module.exports = gymWrapper;