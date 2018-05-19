var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        var query = {};
        if (req.query.user_id) {
            query.userId = req.query.user_id;
        }
        db.Dreams.findAll({
            where: query
        }).then(function(dbDreams) {
            res.json(dbDreams);
        });
    });
};