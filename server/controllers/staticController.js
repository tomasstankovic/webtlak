/**
 * Statics router.
 */
var express = require('express'),
    router = express.Router();

/**
 * GET: Index
 */
router.get('/', function(req, res) {
  res.render('static/index',{
    FB_EVENT_URL: 'http://www.facebook.com/events/1533086333687286/'
  });
});

module.exports = router;