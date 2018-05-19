var db = require("../models");

module.exports = function (app) {

    //GET route for getting all of the dreams
    app.get("/", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.userId = req.query.user_id;
        }
        db.Dreams.findAll({
            where: query
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    //GET route for retrieving a single dream
    app.get("/", function (req, res) {
        db.Dreams.findOne({
            where: {
                id: re.params.id
            }
        }).then(function (dbDreams) {
            console.log(dbDreams);
            res.json(dbDreams);
        });
    });

    // POST route for saving a new Dream
    app.post("/", function (req, res) {
        db.Dreams.create(req.body).then(function (dbDreams) {
            res.json(dbDreams)
        });
    });

    // DELETE route for deleting Dream
    app.delete("/", function (req, res) {
        db.Dream.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    //PUT route for updating Dream
    app.put("/", function (req, res) {
        db.Dreams.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbDreams) {
                res.json(dbDreams);
            });
    });
};