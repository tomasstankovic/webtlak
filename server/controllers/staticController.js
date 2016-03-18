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
    FB_EVENT_URL: 'http://www.facebook.com/events/1252817861398596/',
    title: 'WEBtlak #4 / 24.3.2016 - 19.00 / Záhrada CNK'
  });
});

module.exports = router;