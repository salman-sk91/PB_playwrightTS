var express = require('express');

const controller = require('../controller');
module.exports = (app) => {
    app.route('/runtest').get(controller.runtest);
    app.route('/getstatus').get(controller.getstatus);
};