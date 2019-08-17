require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require("moment");


//get spotify ID and secret
var spotify = new Spotify({
    id : keys.spotify.id,
    secret : keys.spotify.secret
})
  

//capture users input 

var command = process.argv[2];

//show commands if asked
if(command === "commands"){
    console.log("\nspotify-this-song  " + "\nconcert-this" + "\nmovie-this" + "\ndo-what-it-says");
}

//do what it says
if(command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            console.log(error);
        }

        var dataArr = data.split(" ");

     var song = "";
     for(i = 1; i < dataArr.length; i++){
        song += dataArr[i] + " ";
     }

spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) { //search for song
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    //catching paths into variables
    var songName = data.tracks.items[0].name;
    var artist = data.tracks.items[0].album.artists[0].name;
    var album = data.tracks.items[0].album.name;
    var link = data.tracks.items[0].album.external_urls.spotify;

    //Display song stats
    console.log("\nSong Name: " + songName + 
                "\nArtist Name: " + artist +
                "\nAlbum Name: " + album +
                "\nClick here to listen! " + link);
  }); 

});
}




                                            //begin spotify
if(command === "spotify-this-song"){
// get song name from user
var song = "";
    for(i = 3; i < process.argv.length; i++){
       song += process.argv[i] + " ";
    }

spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) { //search for song
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    //catching paths into variables
    var songName = data.tracks.items[0].name;
    var artist = data.tracks.items[0].album.artists[0].name;
    var album = data.tracks.items[0].album.name;
    var link = data.tracks.items[0].album.external_urls.spotify;

    //Display song stats
    console.log("\nSong Name: " + songName + 
                "\nArtist Name: " + artist +
                "\nAlbum Name: " + album +
                "\nClick here to listen! " + link);
  }); 
}



                                            //begin Bands In Town\\
if(command === "concert-this"){

var artist = ""; // get band name from user
for(i = 3; i < process.argv.length; i++){
    artist += process.argv[i] + "";
 }

var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; // use artist to make search URL

axios.get(bandUrl).then(function(response){
    var showData = response.data;
    
    console.log("\nThe next 5 upcoming shows" +
                 "\n -----------------------"   );

    for (var i = 0; i < 5; i++) {
        var show = showData[i];
        // Print data about each concert
        // If a concert doesn't have a region, display the country instead
        // Use moment to format the date
        console.log(
            show.venue.city +
            "," +
            (show.venue.region || show.venue.country) +
            " at " +
            show.venue.name +
            " " +
            moment(show.datetime).format("MM/DD/YYYY") +
            "\n"
        );
    }
     
});
}



                                            // begin OMBD
if(command === "movie-this"){

var movieName= process.argv.slice(3).join(" ");
     // get movie name from user
    if(!movieName){
        movieName = "Mr Nobody";
    }


var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"; // use movieName to make search URL

    axios.get(movieUrl).then(function(response){ //take url and get movie stats
    
    //display movie stats
    console.log("\n" + response.data.Title + 
        "\nThis movie was released in " + response.data.Year + 
        "\nRated: " + response.data.Rated + 
        "\n" + response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value +
        "\nCountry of origin: " + response.data.Country +
        "\nLanguage: " + response.data.Language + 
        "\nPlot: " + response.data.Plot + 
        "\nCast: " + response.data.Actors);

    });
}
