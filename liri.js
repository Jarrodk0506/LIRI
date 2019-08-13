require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify({
    id : keys.spotify.id,
    secret : keys.spotify.secret
})
   
console.log("Please use 'commands' to see the list of commands");



        //Needs work\\
//**************************//
// -Rotten tomatoes score
// -Mr Nobody on no movie submit
// -Bandsintown
// -Spotify
//
//
//
//
//**************************//



var command = process.argv[2];

if(command === "commands"){ //display commands for the user
    console.log("concert-this <insert band-name here> \nspotify-this-song <insert song-name here>"+ 
                "\nmovie-this <insert movie-name here> \ndo-what-it-says");
}

if(command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        console.log("do works"); //delete this check\\
        console.log(data);
        if(error){
            return console.log(error);
        }
        
        

    });
}


if(command === "spotify-this-song"){
console.log("song worked")//delete this check\\

var song = process.argv[3]; // get song name from user

spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
                            //look inside items
    console.log(data.tracks.items); 
    

  });
}

//begin Bands In Town
if(command === "concert-this"){
console.log("band worked"); //delete this check\\

var artist = process.argv[3]; // get band name from user

var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; // use artist to make search URL
axios.get(bandUrl).then(function(response){
console.log(response);

});
}



// begin OMBD
if(command === "movie-this"){
   console.log("movie worked");//delete this check\\

var movieName = process.argv[3]; // get movie name from user

var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"; // use movieName to make search URL

axios.get(movieUrl).then(function(response){ //take url and get movie stats
    
    console.log(response.data); //<---delete when finished
   
    console.log(response.data.Title + 
        "\nThis movie was released in " + response.data.Year + 
        "\nRated: " + response.data.Rated + 
        "\nRotten Tomatoes rating placeholder" + 
        "\nCountry of origin: " + response.data.Country +
        "\nLanguage: " + response.data.Language + 
        "\nPlot: " + response.data.Plot + 
        "\nCast: " + response.data.Actors);
    


    //console.log(respone.data.Ratings.Source) <-- beginning to get to Rotten tomatoes 
});
}