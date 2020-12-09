const path = require('path');

//router listeners
var router = function (app) {

    app.get('/write-game', function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/write-game.html"));
    });

    app.get('/browse-game', function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/browse-game.html"));
    });

    app.get('/', function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/index.html"));
    });

    app.get('/angular', function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/game.html"));
    });

}

module.exports = router;