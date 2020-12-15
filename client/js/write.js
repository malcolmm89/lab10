
 //angular
var app = angular.module("addGame", []);

app.controller("addGameCntrl", function ($scope, $http) {
    $scope.submitGame = function () {
        //console.log("Buttom Clicked");
        $http({
            method: "post",
            url: gameURL + "/write-record",
            data: {
                "gameTitle": $scope.gameTitle,
                "developer": $scope.developer,
                "publisher": $scope.publisher,
                "releaseDate": $scope.releaseDate,
                "score": $scope.score
            }

        }).then(function (response) {
            if (response.data.msg == "success") {
                $scope.gameTitle = "";
                $scope.developer = "";
                $scope.publisher = "";
                $scope.releaseDate = "";
                $scope.score = "";
                $scope.addResults = "Game Added";
            }
            else {
                $scope.addResults = response.data.msg;
                console.log(response.data.msg);
            }
        }, function (response) {
            console.log(response);
        });
    }
});


///////////////////////////////////////////////////////////////////////

/*
//jQeary
$('#data-submit').click(function () {
    var gameTitle = $('#gameTitle').val();
    var developer = $('#developer').val();
    var publisher = $('#publisher').val();
    var releaseDate = $('#releaseDate').val();
    var score = $('#score').val();

    //var d = new Date();
    //var id = "ID" + d.getTime();

    //var jsonString = JSON.stringify({ id: id, gameTitle: gameTitle, developer: developer, publisher: publisher, releaseDate: releaseDate, score: score });
    var newGame = {
        gameTitle: gameTitle,
        developer: developer,
        publisher: publisher,
        releaseDate: releaseDate,
        score: score
    }

    $.ajax({
        url: gameURL + "/write-record",
        type: "post",
        data: { data: newGame },
        success: function (response) {
            alert(response);
        },
        error: function (err) {
            alert(err);
        }
    });
});
*/