var axios = require("axios");

var bandUrl = "https://rest.bandsintown.com/artists/her/events?app_id=codingbootcamp"; // use artist to make search URL

axios.get(bandUrl).then(function(response){
    console.log(response.data);
});