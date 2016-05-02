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
    FB_EVENT_URL: 'http://www.facebook.com/events/1721091454839582/',
    title: 'WEBtlak #6 / 24.5.2016 (Utorok) - 19.00 / Záhrada CNK'
  });
});

module.exports = router;