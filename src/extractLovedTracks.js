var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');
var axios = require('axios');
var fs = require('fs');
var app = express();
var port = 3000;
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port + "/callback");
});
var scopes = ['user-library-read'];
var redirectUri = 'http://localhost:3000/callback';
var state = 'eloelo';
var clientId = '59c7fad61fc747dd8533ad485293c70d';
var clientSecret = 'dfecdc67d1564c5dad4ab16b7337e3fa';
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
var code = 'BQA4U_-7jFANYakl8gMZHh5wg-i_YBr-wBxIkGQwAqAq_I9u09LLLVFfIGoCSo2grF0Q3A4BOitpxWrGT1ZGXw3FktJhg_7dn_OU9TYytg2qN0CdCqm9x6XVZ7CWVKDYUeaQbOVPeVx9GDlUcYO8eaT2ig';
var credentials = {
    clientId: clientId,
    clientSecret: clientSecret,
    //Either here
    accessToken: code
};
var spotifyApiAuth = new SpotifyWebApi(credentials);
spotifyApiAuth.setAccessToken(code);
// for (let step = 1; step < 47; step++) {
var LOVED_TRACKS = [];
for (var step = 1; step < 47; step++) {
    console.log('------ step', step);
    spotifyApiAuth.getMySavedTracks({ limit: 50, offset: step * 50 }).then(function (data) {
        data.body.items.forEach(function (item) { return LOVED_TRACKS.push(item.track.id); });
        if (LOVED_TRACKS.length === 1456) {
            console.log('------- GOT ALL OF THEM');
            fs.writeFile('./lovedTracks.json', JSON.stringify({ lovedStrack: LOVED_TRACKS, date: new Date() }), function (err) {
                if (err)
                    throw err;
                console.log("The file was succesfully saved!");
            });
        }
    })["catch"](console.log);
}
