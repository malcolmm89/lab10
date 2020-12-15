var app = angular.module("tableApp", []);

app.controller('tableCtrl', function ($scope, $http) {
    $scope.games = [];

    $scope.getGames = function () {
        $http({
            method: "get",
            url: gameURL + "/read-record"
        }).then(function (response) {
            if (response.data.msg == "success") {
                $scope.games = response.data.games;
            }
            else {
                console.log(response.data.games);
            }
        }, function (response) {
                console.log(response);
        });
    }

    $scope.deleteGame = function (gameID) {
        console.log(gameID);
        $http({
            method: "delete",
            url: gameURL + "/delete-record",
            params: { gameId: gameID }
        }).then(function (response) {
            if (response.data.msg == "success") {
                $scope.getGames();
            }
            else {
                console.log(respones.data.msg);
            }
        }, function (response) {
                console.log(response);
        });
    }

    $scope.getGames();
});


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