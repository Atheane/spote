var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');
var lovedTracks = require('./lovedTracks.json');
var app = express();
var port = 3000;
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port + "/callback");
});
var scopes = ['user-library-modify'];
var redirectUri = 'http://localhost:3000/callback';
var state = 'maxmax';
var clientId = process.env['MAX_CLIENT_ID'];
var clientSecret = process.env['MAX_CLIENT_SECRET'];
// uncomment below if you need to generate a new comment
// const spotifyApi = new SpotifyWebApi({
//   redirectUri,
//   clientId
// });
// app.get('/callback', (req, res) => {
//   console.log('redirect done');
//   res.send('waiting for spotify')
// })
// const authorizeURL = spotifyApi.createAuthorizeURL(
//   scopes,
//   state,
//   true,
//   'token'
// );
// console.log(authorizeURL);
var code = 'BQCd9ZSdkfnp_V5DKiEo4IRbOmjr_queQmqH7r7vCoGGVgGzvKbeRMNH93wps2gRkqDd5uaVk-Z7-O_UKXNz4UUsSjDMCBYgfkSpKF_Lw8J4furYpaVetfOkrZ9hqIOVdT3VP0_dPesuheotOISNlABo-p4qPpoROLuBDFHFztM3yw';
var credentials = {
    clientId: clientId,
    clientSecret: clientSecret,
    //Either here
    accessToken: code
};
var spotifyApiAuth = new SpotifyWebApi(credentials);
spotifyApiAuth.setAccessToken(code);
var i, j, temparray, chunk = 50;
for (i = 0, j = lovedTracks.lovedStrack.length; i < j; i += chunk) {
    temparray = lovedTracks.lovedStrack.slice(i, i + chunk);
    spotifyApiAuth.addToMySavedTracks(temparray).then(function (data) {
        console.log('Added tracks!', data);
    })["catch"](console.log);
}
