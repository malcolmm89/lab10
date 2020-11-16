const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname + "/../client")));

//router listeners
app.get('/write-game', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/write-game.html"));
});

app.get('/browse-game', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/browse-game.html"));
});

var outputFile = './files/game.txt';

//service listener
app.post('/write-record', function (req, res) {
    var data = req.body.data;

    console.log(data);

    if (fs.existsSync(outputFile)) {
        data = "," + data;
    }

    fs.appendFile(outputFile, data, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("success");
        }
    })
});

app.get('/read-record', function (req, res) {
    fs.readFile(outputFile, "utf8", function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            data = "[" + data + "]";
            console.log(data);
            res.send(data);
        }
    });
});

app.listen(4500);

console.log("Server is Running...");
