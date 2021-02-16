const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const lovedTracks = require('./lovedTracks.json');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/callback`)
})

const scopes = ['user-library-modify'];
const redirectUri = 'http://localhost:3000/callback';
const state = 'maxmax';
const clientId = process.env['MAX_CLIENT_ID'];
const clientSecret = process.env['MAX_CLIENT_SECRET'];

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

const code = process.env['MAX_TOKEN'];

const credentials = {
  clientId,
  clientSecret,
  //Either here
  accessToken: code
};

const spotifyApiAuth = new SpotifyWebApi(credentials)
spotifyApiAuth.setAccessToken(code);

var i,j,temparray,chunk = 50;
for (i=0,j=lovedTracks.lovedStrack.length; i<j; i+=chunk) {
    temparray = lovedTracks.lovedStrack.slice(i,i+chunk);
    spotifyApiAuth.addToMySavedTracks(temparray).then((data) => {
      console.log('Added tracks!', data);
    }).catch(console.log)
}


