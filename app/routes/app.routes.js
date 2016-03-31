/**
 * Created by USER on 4/14/2015.
 */
'use strict';
// Load the module dependencies
var controller = require('../controllers/app.controller');
// Define the routes module' method
module.exports = function(app) {
    app.route('/api/create/students').post(controller.create);
    app.route('/api/list/students').post(controller.list);
    app.route('/api/login').post(controller.login);
    app.route('/api/verify').post(controller.verify);
    app.route('/api/logout').post(controller.logout);
    app.route('/api/edit').post(controller.edit);
};