const functions = require('./functions.js');

module.exports = {
  root: function (req, res, next) {
    console.log('Accessing root')
    res.json({
      info: 'This is the api route / which is not used. Try /news or /front to get some news from hackernews'
    });
  },
  
  news: async function (req, res, next) {
    console.log('Requesting news')
    const result = await functions.makeRequest('news');
    res.json(result);
  },

  newest: async function (req, res, next) {
    console.log('Requesting newest')
    const result = await functions.makeRequest('newest');
    res.json(result);
  },

  past: async function (req, res, next) {
    console.log('Requesting front')
    const result = await functions.makeRequest('front');
    res.json(result);
  },

  user_id: async function (req, res, next) {
    console.log('Requesting user', req.params)
    const { params } = req;
    const result = await functions.makeRequest('user', params);
    res.json(result);
  },

  from_site: async function (req, res, next) {
    console.log('Requesting site', req.params)
    const { params } = req;
    const result = await functions.makeRequest('from', params);
    res.json(result);
  }
}