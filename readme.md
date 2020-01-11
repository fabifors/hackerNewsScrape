# 🐱‍💻 Hackernews Scraper project
Ahhh finally a non cliché project from good ol' fabifors...

Not really! This is probably a very common project to get started in some backend/api programming. Just create a simple node api that use express and some scraper to take information from another page (i.e. hackernews) and pass it through to your own front-end application to create a clone. This is what I did.

A small project I started whilst working in a store at my side hustle during school.
I was interested in building some kind of scraper in node and started hacking away at the store computer on Repl.it and now I guess it's for the best that this is published on github sice it is quite cool!
Would love some feedback on the code. Just open an issue and write some comments. 

I'm still learning node, but tbh I am quite enjoying this.

This is the link for the react front-end non-sence I built in codesandbox. 

Front-End: https://github.com/fabifors/hackernews-react-front

Front-End Codesandbox: https://codesandbox.io/s/github/fabifors/hackernews-react-front/tree/master/



## 🕵️‍♀️ Instructions
There are some steps involved in running this application. Below I will list a set of instructions on how to go about running this shi... I mean... beautiful application.

### 💾 Clone repo
Go to the folder you would like to download the project to and run:
```bash
$ ~ git clone https://github.com/fabifors/hackerNewsScrape
```

### 💻 Change directory
Go into the directory of the project
```bash
$ ~ cd hackerNewsScrape
```

### 🐱‍👓 Run the code
To run the code, you will need node installed on your computer. Then run this command in your terminal.
```bash
$ ~ node index.js
```

### 🚦 Test
The application is set to run at https://localhost:3000. 
Try to go there in your browser, and you should see some information displayed in JSON 


## 🌁 API Documentation

There are some things you should know about this IF you would be mad enough to tinker with what I've done. Below are some instructions on how this API works. 

### Folders
The project only has one folder ATM. This folder is where the modules are stored.

```
modules/
```
*Here you would put all the functions and modules of the application*

This might change and I will try to update this documentation as this happens. 

### index.js
The index file is used to initialize a new instance of exress and run a server. We set headers from the config file and declare the routes that the application is using. The logic performed in each route is defined in the module routes.js and are imported here to keep the application managable.

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
app.listen(config.host.port, () => {
  console.clear();
  console.log(`Server running on ${config.host.url} with port ${config.host.port}`);
});
```
This is the basic pattern that the application uses. The config.host is supposed to be switched out for an .EVN file setup but I haven't looked into it yet. Please write a pull request with a solution if you have the time. 🤓

### functions.js
This file holds two methods at the moment of writing this. The `makeRequest` method is the backbone of the operation. It checks if the request is for user or a specitic site, and determine what scraping function to run. 

Very simple actually. It also builds a new query string to pass into the scraper like below:
```javascript 
if (params.site) {
  console.log(`Scraping news from ${params.site}`)
  // Build new querystring
  QUERY = query + "?site=" + params.site;
  // Make request based on user or site
  await axios(config.url + QUERY)
    .then(response => {
      result = this.scraper('news', response)
    })
    .catch(console.error);
}
```

The scraping method just consists of a switch statement that will check if the request type is for news or for a user. Then it passes down the response object to the scraper.
```javascript
scraper: function scraper(type, res) {
  switch (type) {
    case 'news': {
      return scrape.news(res);
    }
    case 'user': {
      return scrape.user(res);
    }
  }  
},
```

More will come to this section ... 

### scrape.js

The scrape module handle the scraping of both the user site request (under construction ATM), and the news request. It consist of a module per type of scraping action. The news scraper obviously is going to be different to the news scraper. This is because the website changes structure and the old classes that are targeted in the news scraper will not, for the most part, be found or will not contain the information that we want. 

```javascript
news: function (res) {
  const news = [];
  const html = res.data;
  const $ = cheerio.load(html);
  const aThing = $(".athing");

  aThing.each(function() {
    const id = $(this)
      .attr('id')
    const title = $(this)
      .find(".title > .storylink")
      .text();
    const link = $(this)
      .find(".title > .storylink")
      .attr("href");
    const from = $(this)
      .find(".title > .sitebit > a > .sitestr")
      .text();
    const age = $(this)
      .next()
      .find(".age")
      .text();
    const score = $(this)
      .next()
      .find(".score")
      .text();
    const author = $(this)
      .next()
      .find(".hnuser")
      .text();

    news.push({
      id,
      title,
      from,
      link,
      age,
      score,
      author
    });
  });

  return news;
},
```

This above is the news scraper. It is very specific and in the furutre may contain more logic to make it less specific. The user scraper is not working ATM so this will be updated with more information.


## Thank you!

Thank you for checking out my silly projects. 🐱‍👤
