/**
 * Statics router.
 */
var express = require('express'),
    router = express.Router(),
    helpers = require('../lib/helpers');


/**
 * GET: Index
 */
router.get('/', function(req, res) {
  res.render('static/index',{
    FB_EVENT_URL: 'https://www.facebook.com/events/867706536694426/',
    title: null
  });
});

/**
 * GET: Anketa
 */
router.get('/vytlak', function(req, res) {
  var quizDatas = require('../../data/quiz.json');
  var quizData = quizDatas[helpers.getRandomNumber(0, quizDatas.length)];

  res.render('static/vytlak',{
    title: 'VYtlak',
    quiz: quizData
  });
});

module.exports = router;
