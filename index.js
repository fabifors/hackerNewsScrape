// Dependencies
const express = require("express");

// Import config
const config = require('./config.js');

// Initiate express app
const app = express();

// Routes
const ROUTES = require('./modules/routes.js')

app.use(function(req, res, next) {
  res.header(config.headers);
  next();
});

// Get the root info page
app.get("/", ROUTES.root);

// Get the front page news
app.get("/news", ROUTES.news);

// Get the page with newest posts
app.get("/newest", ROUTES.newest);

// Get the page with old posts
app.get("/past", ROUTES.past);

// Get the page form specific site
app.get("/user/:userid", ROUTES.user_id);

// Get the page form specific site
app.get("/from/:site", ROUTES.from_site);

app.listen(config.host.port, () => {
  console.clear();
  console.log(`Server running on ${config.host.url} with port ${config.host.port}`);
});

// Central error handler
app.use(function(err, req, res, next) {
  console.error(err.message);
  res.status(500).json({ error: 'Failed to fetch data. Please try again later.' });
});
