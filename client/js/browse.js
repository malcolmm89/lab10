var app = angular.module("tableApp", []);

app.controller('tableCtrl', function ($scope, $http) {
    $scope.games = [];
    $scope.publishers = [];

    $scope.getGames = function () {
        $http({
            method: "get",
            url: gameURL + "/read-record"
        }).then(function (response) {
            if (response.data.msg == "success") {
                $scope.games = response.data.games;
                $scope.publishers = getPub(response.data.games);
                $scope.selectedPublisher = $scope.publishers[0];
            }
            else {
                console.log(response.data.games);
            }
        }, function (response) {
                console.log(response);
        });
    } //end of get
    
    $scope.redraw = function () {
        var type = $scope.selectedPublisher.value;

        $http({
            method: "get",
            url: gameURL + "/read-type",
            params: { publisher: type }
        }).then(function (response) {
            if (response.data.msg == "success") {
                $scope.games = response.data.games;
                //$scope.getGames();
            }
            else {
                console.log(response.data.msg);
            }
        }, function () {
            console.log(response);
        });
    } // end of redraw
    
    $scope.deleteGame = function (gameID) {
        console.log(gameID);
        $http({
            method: "delete",
            url: gameURL + "/delete-record",
            params: { gameId: gameID }
        }).then(function (response) {
            if (response.data.msg == "success") {
                $scope.redraw();
            }
            else {
                console.log(respones.data.msg);
            }
        }, function (response) {
                console.log(response);
        });
    } // end of delete

    $scope.editGame = function (gameIndex) {
        $scope.gameTitle = $scope.games[gameIndex].gameTitle;
        $scope.developer = $scope.games[gameIndex].developer;
        $scope.publisher = $scope.games[gameIndex].publisher;
        $scope.releaseDate = $scope.games[gameIndex].releaseDate;
        $scope.score = $scope.games[gameIndex].score;
        $scope.gameID = $scope.games[gameIndex]['_id'];

        $scope.hideTable = true;
        $scope.hideForm = false;


    }

    $scope.updateGame = function () {
        $http({
            method: "put",
            url: gameURL + "/update-game",
            data: {
                gameId: $scope.gameID,
                gameTitle: $scope.gameTitle,
                developer: $scope.developer,
                publisher: $scope.publisher,
                releaseDate: $scope.releaseDate,
                score: $scope.score
            }
        }).then(function (response) {
            if (response.data.msg == "success") {
                $scope.hideTable = false;
                $scope.hideForm = true;
                $scope.redraw();

                $scope.gameTitle = "";
                $scope.developer = "";
                $scope.publisher = "";
                $scope.releaseDate = "";
                $scope.score = "";
                $scope.gameID = "";
            }
            else {
                console.log(response.data.msg);
            }
        }, function () {
                console.log(response);
        });
    }

    $scope.getGames();

}); //end of app controller


function getPub(pubData) {
    //console.log(pubData);
    var pubExists;
    var pubArray = [{ value: "", display: "ALL" }];

    for (var i = 0; i < pubData.length; i++) {
        pubExists = pubArray.find(function (element) {
            return element.value == pubData[i].publisher;
        });

        console.log("exist = " + pubExists);

        if (pubExists) {
            continue;
        }
        else {
            pubArray.push({ value: pubData[i].publisher, display: pubData[i].publisher });
        }
    }
    console.log(pubArray);
    return pubArray;
}

///////////////////////////////////////////////////////////////

/*
//Read
function read() {
    $.ajax({
        url: gameURL + "/read-record",
        type: "get",
        success: function (response) {
            var data = JSON.parse(response);
            createGameTable(data);
        },
        error: function (err) {
            alert(err);
        }
    });
}

read();

//Creates Table
function createGameTable(gameData) {
    var tableHTML = ""

    for (var i = 0; i < gameData.length; i++) {
        tableHTML += "<tr>";
        tableHTML += "<td>" + gameData[i].id + "</td>";
        tableHTML += "<td>" + gameData[i].gameTitle + "</td>";
        tableHTML += "<td>" + gameData[i].developer + "</td>";
        tableHTML += "<td>" + gameData[i].publisher + "</td>";
        tableHTML += "<td>" + gameData[i].releaseDate + "</td>";
        tableHTML += "<td>" + gameData[i].score + "</td>";
        tableHTML += "<td><button class='del-submit' data-id='" + gameData[i].id + "'>Delete</button></td>";
        //tableHTML += "<td><button class='del-submit' onclick='deleteGame2(" + gameData[i].id + ")'>Delete</button></td>";
        tableHTML += "</tr>"

    }
    $('#gameTable').html(tableHTML);
    delGame();
    //deleteGame2();

}

///*
function delGame() {
    $('.del-submit').click(function () {
        console.log("button hit");
        var gameID = this.getAttribute("data-id");
        //console.log(gameID + " <-- why null");
        $.ajax({
            url: gameURL + "/delete-record",
            type: "delete",
            data: { data: gameID },
            success: function (response) {
                read();
            },
            error: function (err) {
                alert(err);
            }
        });
    });
}
*/