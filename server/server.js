'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//*******************
// 1. Parse forms & JSON in body
//*******************
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//****************
// 2. Set up middleware in for serving static files (HTML, CSS, images)
//****************
app.use(express.static(__dirname + '/public'));

// API
app.get('/api', function (req, res) {
  res.send(' Usage: send POST-request with user data ("username" and "email") to http://localhost:3000/api/user');
});

//****************
// 3. Example route to handle POST-request
//****************
app.post('/api/user', function (req, res) {

  let user = {};

  // Handle incoming request. For now we assume the
  // parameters 'username' and 'email' being in the request body.
  // TODO: error checking!

  console.log(req.body);
  user.username = req.body.username;
  user.email = req.body.email;
  user.timestamp = new Date().toLocaleString();
  user.id = Math.floor(Math.random() * 1000);

  // In real life app: validate HERE and go to db for live data.
  // For now: echo user-object to the client
  // TODO: validate user!

  if (user.username && user.email) {
    res.json(user);
  } else {
    res.json({'error': 'No user provided'});
  }
});

//****************
// 4. start server
//****************
app.listen(3000, function () {
  console.log('Server started at http://localhost:3000...');
});
