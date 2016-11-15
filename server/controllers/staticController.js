/**
 * Statics router.
 */
var express = require('express'),
    router = express.Router(),
    helpers = require('../lib/helpers'),
    orderModel = require(process.cwd() + '/server/models/orderModel');


/**
 * GET: Index
 */
router.get('/', function (req, res) {
    res.render('static/index', {
        FB_EVENT_URL: 'https://www.facebook.com/events/1818165248466172/',
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

/**
 * GET: Zachran zapisnik
 */
router.get('/zachran-zapisnik', function (req, res) {

    var date1 = new Date();
    var date2 = new Date(2016, 11, 8);
    var diff = new Date(date2.getTime() - date1.getTime());

    var years = diff.getUTCFullYear() - 1970;
    var months = diff.getUTCMonth();
    var days = diff.getUTCDate()-1;

    console.log(`${years} y, ${months}mon, ${days}days`)

    orderModel.find({}, function(err, orders) {
        if (err) {
            console.log(err);
            return next(err);
        }

        res.render('static/zachran-zapisnik', {
            title: 'Zachráň zápisník — Staň sa hrdinom)',
            orders: orders,
            ordersLength: orders.length,
            orderComplete: req.query.hero || null
        });
    });
});

/**
 * POST: Zachran zapisnik
 */
router.post('/zachran-zapisnik', function (req, res) {
    let newOrder = new orderModel(req.body);

    newOrder.save(function(err, record) {
        if (err) {
            console.log(err);
            return next(err);
        }

        res.redirect('/zachran-zapisnik?hero=true');
    });
});


module.exports = router;
