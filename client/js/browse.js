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
        console.log(gameID + " <-- why null");
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
//*/

/* Delete function
var del = function deleteGame2(gameID) {
    $('.del-submit2').click(function () {
        console.log("button hit");
        console.log(gameID);
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