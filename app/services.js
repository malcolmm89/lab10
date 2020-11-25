const fs = require('fs');

var outputFile = './files/game.txt';

var services = function (app) {

    //write
    app.post('/write-record', function (req, res) {
        var data = req.body.data;

        console.log(data + "<-- dtat?");

        if (fs.existsSync(outputFile)) {
            data = "," + data;
        }

        fs.appendFile(outputFile, data, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send("success");
                console.log("\n write is working \n");
            }
        });
    });

    //read
    app.get('/read-record', function (req, res) {
        fs.readFile(outputFile, "utf8", function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                data = "[" + data + "]";
                //console.log(data);
                console.log("\nread is working \n");
                res.send(data);
            }
        });
    });

    //delete
    app.delete('/delete-record', function (req, res) {
        console.log("Starting Delete...\n");
        var delData = req.body.data; //there is no data here
        console.log(delData + "<-- no data\n");
        var delID = delData.id;

        fs.readFile(outputFile, "utf8", function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                data = "[" + data + "]";
                res.send(data);
                //console.log(data + " <-- data?");

                var parsedData = JSON.parse(data);
                for (var i = 0; i < parsedData.length; i++) {
                    if (delID == parsedData[i].id) {
                        parsedData.splice(i, 1);
                        break;
                    }
                    //console.log(parsedData[i].id + " <-- data?");
                }
                var deleteStr = JSON.stringify(parsedData);
                //remove []
                deleteStr = deleteStr.replace("[", "");
                deleteStr = deleteStr.replace("]", "");

                //fs.write
                fs.writeFile(outputFile, deleteStr, function (err) {
                    if (err) {
                        res.send(err);
                        console.log("error");
                    }
                    else {
                        res.send("success");
                        console.log("\n it worked \n");
                    }
                });
            }
        });
    });

}

module.exports = services;