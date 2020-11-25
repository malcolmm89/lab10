
function activateSubmitButton() {
    $('#data-submit').click(function () {
        var gameTitle = $('#gameTitle').val();
        var developer = $('#developer').val();
        var publisher = $('#publisher').val();
        var releaseDate = $('#publisher').val();
        var score = $('#score').val();

        var d = new Date();
        var id = "ID" + d.getTime();

        var jsonString = JSON.stringify({ id: id, gameTitle: gameTitle, developer: developer, publisher: publisher, releaseDate: releaseDate, score: score });

        $.ajax({
            url: "http://localhost:4500/write-record",
            type: "post",
            data: { data: jsonString },
            success: function (response) {
                alert(response);
            },
            error: function (err) {
                alert(err);
            }
        });
    });
}

function getGameData() {
    $.ajax({
        url: "http://localhost:4500/read-record",
        type: "get",
        success: function (response) {
            var data = jQuery.parseJSON(response);
            createGameTable(data);
        },
        error: function (err) {
            alert(err);
        }
    });
}

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
        tableHTML += "</tr>"

    }
    $('#gameTable').html(tableHTML);
}