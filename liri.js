require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");

// spotify.search({ type: 'track', query: 'Sem Amor - big band' })
// .then(function(response) {
//     console.log(response.tracks.items[0].artists[0].name);
//     console.log(response.tracks.items[0].name); 
//     console.log(response.tracks.items[0].album.name); 
//     console.log(response.tracks.items[0].preview_url); 
// })
// .catch(function(err) {
//     console.log(err);
// });

var bandsintown = "https://rest.bandsintown.com/artists/thundercat/events?app_id=codingbootcamp"

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

console.log("Hello");