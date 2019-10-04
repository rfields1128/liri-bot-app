require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");

spotify.search({ type: 'track', query: 'Sem Amor - big band' })
.then(function(response) {
    console.log(response.tracks.items[0].artists[0].name);
    console.log(response.tracks.items[0].name); 
    console.log(response.tracks.items[0].album.name); 
    console.log(response.tracks.items[0].preview_url); 
})
.catch(function(err) {
    console.log(err);
});

console.log("Hello");