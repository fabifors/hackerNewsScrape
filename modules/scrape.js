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
  user: function (res) {
    const user = []
  
    const html = res.data;
    const $ = cheerio.load(html);
    const tbody = $("#hnmain>tbody>tbody");

    tbody.each(function() {
      console.log(this);
    })
    return user;
  }
}