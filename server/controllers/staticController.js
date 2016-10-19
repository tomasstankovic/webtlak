/**
 * Statics router.
 */
var express = require('express'),
    router = express.Router(),
    helpers = require('../lib/helpers');


/**
 * GET: Index
 */
router.get('/', function (req, res) {
    res.render('static/index', {
        FB_EVENT_URL: 'https://www.facebook.com/events/537564236454762/',
        title: null
    });
});

/**
 * GET: Vysledky prieskumu.
 */
router.get('/vytlak', function (req, res) {
    var quizDatas = require('../../data/quiz.json');
    var quizData = quizDatas[helpers.getRandomNumber(0, quizDatas.length)];

    res.render('static/vytlak', {
        title: 'VYtlak',
        quiz: quizData,
        autoRefresh: false
    });
});

/**
 * GET: Vysledky ankety - auto refresh.
 */
router.get('/vytlak-refresh', function (req, res) {
    var quizDatas = require('../../data/quiz.json');
    var quizData = quizDatas[helpers.getRandomNumber(0, quizDatas.length)];

    res.render('static/vytlak', {
        title: 'VYtlak',
        quiz: quizData,
        autoRefresh: true
    });
});

module.exports = router;
