
var game = [];
var activateGame = 0;

var app = angular.module("browseGamesAng", []);

app.controller("browseGamesCntrl", function ($scope, $http) {

    $scope.obj = [];
    //console.log($scope.obj);

    $scope.getGame = function () {
        $http({
            method: "get",
            url: gameURL + '/browse-record'
        }).then(function (response) {
            game = response.data;
            $scope.obj = game[activateGame];
            $scope.showHide();
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