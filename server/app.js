/**
 * Main app start point.
 */
const express = require('express');
const app = express();

const config = require('./config');
const error = require('./lib/error_handler');

config.appSetup(app);
config.dbConnect();
error.setup(app);

app.listen(config.port, function () {
  console.log('Listening on port %d', config.port);
});
