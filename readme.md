# Hackernews Scraper project
This is a small project I started whilst working in a store.
I was interested in building some kind of scraper in node and started hacking away at the store computer on Repl.it and now I guess it's for the best that this is published on github sice it is quite cool!
Would love some feedback on the code. Just open an issue and write some comments. 

Still learning node. 

## Instructions
There are some steps involved in running this application. Below I will list a set of instructions on how to go about running this shi... I mean... beautiful application.
### Clone repo
Go to the folder you would like to download the project to.
```bash
$ ~ git clone https://github.com/fabifors/hackerNewsScrape
```

### Change directory
Go into the directory of the project
```bash
$ ~ cd hackerNewsScrape
```

### Run the code
To run the code, you will need node installed on your computer. Then run this command in your terminal.
```bash
$ ~ node index.js
```

### Test
The application is set to run at https://localhost:3000. 
Try to go there in your browser, and you should see some information displayed in JSON 


## API Documentation

There are some things you should know about this IF you would be mad enough to tinker with what I've done. Below are some instructions on how this API works. 

### Folders
The project only has one folder ATM. This folder is where the modules are stored.

```
modules/
```
*Here you would put all the functions and modules of the application*

This might change and I will try to update this documentation as this happens. 

### index.js
The index file is used to initialize a new instance of exress and run a server. We set headers from the config file and declare the routes that the application is using. The logic performed in for each route is defined in the module routes.js and are imported here to keep the application managable.

```javascript
// Dependencies
const express = require("express");
const config = require('./config.js');
const ROUTES = require('./modules/routes.js')

// Initiate express app
const app = express();

app.use(function(req, res, next) {
  res.header(config.headers);
  next();
});

// Get the first page
app.get("/", ROUTES.root);

/* Some more routes */

// Start the server
app.listen(3000, () => {
  console.clear();
  console.log("Server running on port 3000");
});
```
This is the basic pattern that the application uses
