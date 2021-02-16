const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/callback`)
})

const scopes = ['user-library-read'];
const redirectUri = 'http://localhost:3000/callback';
const state = 'eloelo';
const clientId = process.env['ELO_CLIENT_ID'];
const clientSecret = process.env['ELO_CLIENT_SECRET'];

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

const code = process.env['ELO_TOKEN'];

const credentials = {
  clientId,
  clientSecret,
  //Either here
  accessToken: code
};

const spotifyApiAuth = new SpotifyWebApi(credentials)
spotifyApiAuth.setAccessToken(code);

// for (let step = 1; step < 47; step++) {
const LOVED_TRACKS = [];
for (let step = 1; step < 47; step++) {
  console.log('------ step', step);
  spotifyApiAuth.getMySavedTracks({ limit: 50, offset: step*50 }).then((data) => {
    data.body.items.forEach(item => LOVED_TRACKS.push(item.track.id))
    if (LOVED_TRACKS.length === 1456) {
      console.log('------- GOT ALL OF THEM')
      fs.writeFile('./lovedTracks.json', JSON.stringify({lovedStrack: LOVED_TRACKS, date: new Date()}), (err) => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
      });
    }
  }).catch(console.log)
}


