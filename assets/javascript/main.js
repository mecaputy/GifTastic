var animals = ["dog", "cat", "rabbit", "hamster", "skunk"];

function display() {

    var userInput = $(this).attr("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userInput + "&api_key=YD0szooQbzKyuftqi9OoQZwr8r4YItjy&limit=10";


    //create an AJAX call for button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $("#gifs-view").html("");

        for (var i = 0; i < response.data.length; i++) {
            //log the response from API
            console.log(response);
            //still image URL
            console.log(response.data[i].images.fixed_height_still.url);
            //animated image URL
            console.log(response.data[i].images.fixed_height.url);
            //get the rating
            console.log(response.data[i].rating);
            //display gif

            var gifImage = $("<img>").addClass("imgAnimate");
            //initial image to show as still
            gifImage.attr("src", response.data[i].images.fixed_height_still.url);
            //animated path
            gifImage.attr("data-animate", response.data[i].images.fixed_height.url);
            gifImage.attr("data-still", response.data[i].images.fixed_height_still.url);

            gifImage.attr("data-state", "still");
            //add animate funtion on click
            gifImage.on("click", playGif);

            var displayDiv = $("<div>").addClass("container-div");
            var ratingDiv = $("<div>").addClass("rating-div");

            ratingDiv.text("Rating: " + response.data[i].rating);

            displayDiv.append(ratingDiv);
            displayDiv.append(gifImage);

            $("#gifs-view").prepend(displayDiv);


        }

    });

};

function playGif() {
    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
}

$(document).on("click", ".animal-btn", display);


$(document).ready(function () {
    //function to render buttons when the submit button is clicked
    $("#add-animal").on('click', function (e) {
        e.preventDefault();

        var userInput = $("#animal-input").val().trim();

        if (userInput === "") {
            // alert the user of invalid response
            alert("You must enter an animal")

        } else {
            //if the button doesn't already exists
            if (animals.indexOf(userInput) == -1) {
                animals.push(userInput);
                //create new button from input
                var newBtn = $("<button>");
                newBtn.attr("value", userInput);
                newBtn.addClass('animal-btn');
                newBtn.text(userInput);
                //add new button to existing buttons
                $("#animal-btns").append(newBtn);
            }
            //clear the input box
            $("#animal-input").val("");
        }

    });
});