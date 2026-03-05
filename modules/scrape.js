const cheerio = require('cheerio')

module.exports =  {
  news: function (res) {
    const news = [];
    const html = res.data;
    const $ = cheerio.load(html);
    const aThing = $(".athing");

    aThing.each(function() {
      const id = $(this)
        .attr('id')
      const title = $(this)
        .find(".titleline > a")
        .text();
      const link = $(this)
        .find(".titleline > a")
        .attr("href");
      const from = $(this)
        .find(".titleline .sitestr")
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
  user: function (res) {
    const html = res.data;
    const $ = cheerio.load(html);

    const user = {
      id: $("#hnmain .hnuser").first().text() || '',
      karma: $("tr:contains('karma') td").last().text().trim() || '',
      about: $("tr:contains('about') td").last().text().trim() || '',
      created: $("tr:contains('created') td").last().text().trim() || ''
    };

    return user;
  }
}