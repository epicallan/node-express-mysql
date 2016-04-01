'use strict';
// Load the module dependencies
var controller = require('../actions/actions');
// Define the routes module' method
module.exports = function(app) {
    app.route('/api/data').post(controller.data);
    app.route('/api/data/:date').get(controller.allData);
};
