/**
 * App router.
 */
var sitemap = require('express-sitemap');

var setup = function(app) {
  var staticController = require('./controllers/staticController');

  app.use('/', staticController);

  var map = sitemap({
    url: 'www.webtlak.sk',
    sitemap: 'data/sitemap.xml',
    robots: 'data/robots.txt',
    generate: app,
    sitemapSubmission: '/sitemap.xml',
    map: {
      '/': ['get']
    },
    route: {
      '/': {
        changefreq: 'always',
        priority: 1.0
      }
    }
  });

  map.generate(app);
  map.XMLtoFile();

};

module.exports.setup = setup;