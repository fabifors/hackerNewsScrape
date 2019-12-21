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

// Get the first page
app.get("/", ROUTES.root);

// Get the first page
app.get("/news", ROUTES.news);

// Get the page with newest posts
app.get("/newest", ROUTES.newest);

// Get the page with old posts
app.get("/past", ROUTES.past);

// Get the page form specific site
app.get("/user/:userid", ROUTES.user_id);

// Get the page form specific site
app.get("/from/:site", ROUTES.from_site);

app.listen(3000, () => {
  console.clear();
  console.log("Server running on port 3000");
});
