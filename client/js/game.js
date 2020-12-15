
var game = [];
var activateGame = 0;

var app = angular.module("browseGamesAng", []);

app.controller("browseGamesCntrl", function ($scope, $http) {

    $scope.obj = [];
    //console.log($scope.obj);

    $scope.getGame = function () {
        $http({
            method: "get",
            url: gameURL + '/read-record'
        }).then(function (response) {
            if (response.data.msg == "success") {
                game = response.data.games;
                $scope.obj = game[activateGame];
                $scope.showHide();
            }
            else {
                console.log(response.data.msg);
            }
        }, function (response) {
                console.log(response);
        });
    };

    $scope.getGame();

    $scope.changeGame = function (direction) {
        activateGame += direction;
        $scope.obj = game[activateGame];
        $scope.showHide();
    }

    $scope.showHide = function () {
        $scope.hidePrev = (activateGame == 0) ? true : false;
        $scope.hideNext = (activateGame == game.length - 1) ? true : false;
    }
});