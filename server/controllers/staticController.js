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
    FB_EVENT_URL: 'http://www.facebook.com/events/118594131876503/',
    title: 'WEBtlak #5 / 27.4.2016 - 19.00 / Záhrada CNK'
  });
});

module.exports = router;