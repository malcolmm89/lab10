const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectId;

const dbURL = process.env.DB_URL || "mongodb://localhost";

var services = function (app) {

    //write mongo
    app.post('/write-record', function (req, res) {
        var gameTitle = req.body.gameTitle;
        var developer = req.body.developer;
        var publisher = req.body.publisher;
        var releaseDate = req.body.releaseDate;
        var score = req.body.score;

        var newGame = {
            gameTitle: gameTitle,
            developer: developer,
            publisher: publisher,
            releaseDate: releaseDate,
            score: score
        }

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "error " + err }));
            }
            else {
                var dbo = client.db("gameDB");

                dbo.collection("games").insertOne(newGame, function (err, response) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "success" }));
                    }
                    else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "success" }));
                    }
                });
            }
        });
    });  //end of write

    //read mongo
    app.get('/read-record', function (req, res) {
        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "error " + err }));
            }
            else {
                var dbo = client.db("gameDB");

                dbo.collection("games").find().toArray(function (err, data) {
                    if (err) {
                        client.close();
                        return res, status(200).send(JSON.stringify({ msg: "error " + err }));
                    }
                    else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "success", games: data }));
                    }
                });
            }
        });
    });  //end read

    app.get('/read-type', function (req, res) {
        var type = req.query.publisher;
        var search = (type == "") ? {} : { publisher: type };
        var sortBy = { gameTitle: 1 };

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "error " + err }));
            }
            else {
                var dbo = client.db("gameDB");

                dbo.collection("games").find(search).sort(sortBy).toArray(function (err, data) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "error " + err }));
                    }
                    else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "success", games: data }));
                    }
                })
            }
        })
    }); // end of read-type

    app.delete('/delete-record', function (req, res) {
        var gameID = req.query.gameId;

        var g_id = new ObjectID(gameID);
        var search = { _id: g_id };

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "error " + err }));
            }
            else {
                var dbo = client.db("gameDB");

                dbo.collection("games").deleteOne(search, function (err) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "error " + err }));
                    }
                    else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "success" }));
                    }
                });
            }
        });

    });  //end of delete

    app.put('/update-game', function (req, res) {
        var gameID = req.body.gameId;
        var gameTitle = req.body.gameTitle;
        var developer = req.body.developer;
        var publisher = req.body.publisher;
        var releaseDate = req.body.releaseDate;
        var score = req.body.score;

        var g_id = new ObjectID(gameID);
        var search = { _id: g_id };
        var updateData = {
            $set: {
                gameTilte: gameTitle,
                developer: developer,
                publisher: publisher,
                releaseDate: releaseDate,
                score: score
            }
        }

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "error " + err }));
            }
            else {
                var dbo = client.db("gameDB");

                dbo.collection("games").updateOne(search, updateData, function (err) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "error " + err }));
                    }
                    else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "success" }));
                    }
                });
            }
        });
    });

}  //end of sevices function

module.exports = services;