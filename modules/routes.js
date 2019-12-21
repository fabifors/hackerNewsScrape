const functions = require('./functions.js');

module.exports = {
  root: function (req, res, next) {
    console.log('Accessing root')
    res.json({
      info: 'This is the api route / which is not used. Try /news or /past to get some news from hackernews'
    });
  },
  
  news: async function (req, res, next) {
    console.log('Requesting news')
    const result = await functions.makeRequest('news');
    console.log('Success: News sent')
    res.json(result);
  },

  newest: async function (req, res, next) {
    console.log('Requesting newest')
    const result = await functions.makeRequest('newest');
    console.log('Success: Newest sent')
    res.json(result);
  },

  past: async function (req, res, next) {
    console.log('Requesting past')
    const result = await functions.makeRequest('front');
    console.log('Success: Past sent')
    res.json(result);
  },

  user_id: async function (req, res, next) {
    console.log('Requesting user', req.params)
    const { params } = req;
    const result = await functions.makeRequest('user', params);
    console.log('Success: User sent')
    res.json(result);
  },

  from_site: async function (req, res, next) {
    console.log('Requesting site', req.params)
    const { params } = req;
    const result = await functions.makeRequest('from', params);
    console.log('Success: Site sent')
    res.json(result);
  }
}