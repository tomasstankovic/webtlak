/**
 * Statics router.
 */
const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const orderModel = require(process.cwd() + '/server/models/orderModel');


/**
 * GET: Index
 */
router.get('/', function (req, res) {
  res.render('static/index', {
    FB_EVENT_URL: 'https://www.facebook.com/webtlak/',
    title: null
  });
});

/**
 * GET: Vysledky prieskumu.
 */
router.get('/vytlak', function (req, res) {
  const quizDatas = require('../../data/quiz.json');
  const quizData = quizDatas[helpers.getRandomNumber(0, quizDatas.length)];

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
  const quizDatas = require('../../data/quiz.json');
  const quizData = quizDatas[helpers.getRandomNumber(0, quizDatas.length)];

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
  let today = new Date();
  let start = new Date(2016, 11, 1, 19);
  let end = new Date(2016, 11, 10, 19);
  let diff = new Date(end.getTime() - today.getTime());
  let days = diff.getUTCDate() - 1;
  let hours = diff.getUTCHours();
  let minutes = diff.getUTCMinutes();
  let seconds = diff.getUTCSeconds();
  let percentage = Math.round(((today - start) / (end - start)) * 100);

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  orderModel.find({}, function (err, orders) {
    if (err) {
      console.log(err);
      return next(err);
    }

    res.render('static/zachran-zapisnik', {
      title: 'Zachráň zápisník — Staň sa hrdinom)',
      orders: orders,
      ordersLength: orders.length,
      orderComplete: req.query.hero || null,
      time: {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        percentage: percentage
      }
    });
  });
});

/**
 * POST: Zachran zapisnik
 */
router.post('/zachran-zapisnik', function (req, res) {
  const newOrder = new orderModel(req.body);

  newOrder.save(function (err, record) {
    if (err) {
      console.log('Form required fields must be filled.');
      res.redirect('/zachran-zapisnik?hero=false');
      return true;
    }
    res.redirect('/zachran-zapisnik?hero=true');
  });
});


module.exports = router;
