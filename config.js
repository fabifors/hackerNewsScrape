require('dotenv').config();

module.exports = {
  headers: {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*'
  },
  host: {
    url: process.env.HOST_URL || 'localhost',
    port: process.env.PORT || 3000
  },
  url: process.env.HN_BASE_URL || "https://news.ycombinator.com/"
}