/**
 * Middleware config.
 */
const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const i18n = require('i18n');
const router = require('./router');
const pjson = require('../package.json');

let DEV_ENV = 'DEVELOPMENT',
  CURRENT_ENV = process.env.NODE_ENV || DEV_ENV,
  APP_VER = pjson.version,
  APP_HOST,
  port = process.env.PORT || 8000,
  DB_URL = process.env.DB_URL;

/**
 * Basic app setup.
 * @param {Object} app Express object
 */
let appSetup = function (app) {
  app.locals.CURRENT_ENV = CURRENT_ENV;
  app.locals.APP_VER = APP_VER;
  app.set('view engine', 'jade');
  app.set('views', 'server/views');
  app.use(favicon(__dirname + '/../build/img/favicon/favicon.ico'));
  app.use(compress());
  app.use(methodOverride());

  i18n.configure({
    locales: ['en', 'sk'],
    defaultLocale: 'en',
    directory: __dirname + '/../locales',
    cookie: 'lang'
  });
  app.use(cookieParser());
  app.use(i18n.init);

  app.use(session({
    secret: 'somesecrettokenhere',
    resave: false,
    saveUninitialized: false
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(flash());

  // i18n cookie and locals
  app.use(function (req, res, next) {
    if (typeof req.query.lang === 'string') {
      res.cookie('lang', req.query.lang, {
        maxAge: 900000,
        httpOnly: true
      });
      req.setLocale(req.query.lang);
      res.locals.locale = req.query.lang;
    }
    next();
  });

  // Public dir to locals middleware.
  app.use(function (req, res, next) {
    if (CURRENT_ENV === DEV_ENV) {
      res.locals.publicPrefix = '/client';
    } else {
      res.locals.publicPrefix = '/build';
    }
    next();
  });

  // APP URL
  app.use(function (req, res, next) {
    APP_HOST = req.protocol + '://' + req.get('host');
    app.locals.APP_HOST = APP_HOST;
    next();
  });

  // Public folder setup.
  if (CURRENT_ENV === DEV_ENV) {
    app.use('/bower_components', express.static(path.join(__dirname, '../bower_components'), {
      redirect: false
    }));
    app.use('/client', express.static(path.join(__dirname, '../client'), {
      redirect: false
    }));
    app.use('/build', express.static(path.join(__dirname, '../build'), {
      redirect: false
    }));
    app.use('/', express.static(path.join(__dirname, '../data')));
  } else {
    app.use('/build', express.static(path.join(__dirname, '../build'), {
      redirect: false
    }));
    app.use('/', express.static(path.join(__dirname, '../data')));
  }

  router.setup(app);
};

/**
 * Database connection.
 */
let dbConnect = function () {
  mongoose.connect(DB_URL, function (err) {
    if (err) {
      console.log('MongoDB: Connecting error : ' + err);
    } else {
      console.log('MongoDB: Succeeded connected!');
    }
  });
};

module.exports = {
  CURRENT_ENV: CURRENT_ENV,
  port: port,
  dbConnect: dbConnect,
  appSetup: appSetup
};
