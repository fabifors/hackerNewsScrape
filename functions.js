// Dependencies
const axios = require("axios");
// Import scraping functions
const scrape = require('./scrape.js');
// Import config
const config = require('./config.js');

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
    try {
      let result;
      if ((params && params.userid) || (params && params.site)) {
        let QUERY; 

        if (params.userid) {
          console.log('Scraping user')
          // Build new querystring
          QUERY =  query + "?id=" + params.userid;
          // Make request based on user or site
          await axios(config.url + QUERY)
            .then(response => {
              result = this.scraper('user', response)
            })
            .catch(console.error);

        } 
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

      } else {
        // Make regular request
        await axios(config.url + query)
          .then(response => {
            console.log('Scraping news')
            result = this.scraper('news', response)
          })
          .catch(console.error);
      }
      return result;
    }
    catch (err){
      console.error(err);
    }
  }
}