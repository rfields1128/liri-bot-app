require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var userCommand = process.argv[2]
var userInput = "";
var args = process.argv;

// after process.argv[4] it puts a "+" after every argument for the url so the search works with spaces
for (var i = 4; i < args.length; i++) {

    if (i > 4 && i < args.length) {
      userInput = userInput + "+" + args[i];
    } else {
      userInput += args[i];
  
    }
}

switch (userCommand) {
    case "concert-this":
        concertThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("Please enter a valid search term");
        break;
}



function spotifyThis() {
    if (!userInput){
        userInput = "The Sign Ace of Base";
    }
spotify.search({type: "track", query: userInput})
.then(function(response) {
    console.log(response.tracks.items[0].artists[0].name);
    console.log(response.tracks.items[0].name); 
    console.log(response.tracks.items[0].album.name); 
    console.log(response.tracks.items[0].preview_url); 
})
.catch(function(err) {
    console.log(err);
});
};

function concertThis() {
    if (!userInput){
        userInput = "flying+lotus"
        console.log("------------")
        console.log("The function couldn't find your band, so go see flying lotus")
        console.log("------------")
    }

var bandsintown = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
axios.get(bandsintown)
.then(function(response){
    for(var i = 0; i < response.data.length; i++) {
        console.log("Venue:" + response.data[i].venue.name)
        console.log("Venue Location:" + response.data[i].venue.city + "," + response.data[i].venue.country)
        console.log("Date:" + moment(response.data[i].datetime).format("L"));
    }
})
.catch(function(error){
    console.log(error);
})
}

function movieThis(){
    console.log()
    if (!userInput){
        userInput = "Mr Nobody"
    }
    var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
    console.log(queryURL)
    axios.get(queryURL)
    .then(function(response){
        console.log("Title: " + response.data.Title);
        console.log("Year Released: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country/Countries Produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Cast: " + response.data.Actors);
    });
};

function doThis() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err)
        }

        var readArray = data.split(",");
        userInput = readArray[1];

        spotifyThis(userInput)
        
    })
};
