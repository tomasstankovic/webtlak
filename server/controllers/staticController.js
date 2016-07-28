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
    FB_EVENT_URL: 'http://www.facebook.com/webtlak/',
    title: null
  });
});

/**
 * GET: Anketa
 */
router.get('/anketa', function(req, res) {
  var quizDatas = require('../../data/quiz.json');
  var quizData = quizDatas[helpers.getRandomNumber(0, quizDatas.length)];

  res.render('static/quiz',{
    title: 'Výsledky ankety',
    quiz: quizData
  });
});

module.exports = router;
