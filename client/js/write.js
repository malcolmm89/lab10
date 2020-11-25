
$('#data-submit').click(function () {
    var gameTitle = $('#gameTitle').val();
    var developer = $('#developer').val();
    var publisher = $('#publisher').val();
    var releaseDate = $('#releaseDate').val();
    var score = $('#score').val();

    var d = new Date();
    var id = "ID" + d.getTime();

    var jsonString = JSON.stringify({ id: id, gameTitle: gameTitle, developer: developer, publisher: publisher, releaseDate: releaseDate, score: score });

    $.ajax({
        url: gameURL + "/write-record",
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
