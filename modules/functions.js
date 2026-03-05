// Dependencies
const axios = require("axios");
// Import scraping functions
const scrape = require('./scrape.js');
// Import config
const config = require('../config.js');

module.exports = {
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
  makeRequest: async function (query, params) {
    let QUERY = query;

    if (params && params.userid) {
      console.log('Scraping user');
      QUERY = query + "?id=" + params.userid;
      const response = await axios(config.url + QUERY);
      return this.scraper('user', response);
    }

    if (params && params.site) {
      console.log(`Scraping news from ${params.site}`);
      QUERY = query + "?site=" + params.site;
      const response = await axios(config.url + QUERY);
      return this.scraper('news', response);
    }

    console.log('Scraping news');
    const response = await axios(config.url + QUERY);
    return this.scraper('news', response);
  }
}