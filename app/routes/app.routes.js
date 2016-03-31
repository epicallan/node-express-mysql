'use strict';
// Load the module dependencies
var controller = require('../controllers/app.controller');
// Define the routes module' method
module.exports = function(app) {
    app.route('/api/data').post(controller.data);
};
