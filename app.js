var topics = ["Spongebob", "Anime", "Disney", "Pixar"]

function displayGifs() {

    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response);

        var results = response.data;

        $("#gifs-appear-here").empty();

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<h6>").text("Rating: " + rating);
            
            p.addClass("text-uppercase font-italic");

            var personImage = $("<img>");

            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.addClass("gif");
            personImage.addClass("rounded-sm");

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
        }

        $(".gif").on("click", function () {

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"))
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still");
            }

        });
    });
};


function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topics");
        a.addClass("btn btn-info m-2");
        a.attr("data-person", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
});

$(document).on("click", ".topics", displayGifs);

renderButtons();
