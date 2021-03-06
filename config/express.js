// Invoke 'strict' JavaScript mode
'use strict';
// Load the module dependencies
var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
// Define the Express configuration method
module.exports = function() {
    // Create a new Express application instance
    var app = express();
    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
        app.set('trust proxy', 1); // trust first proxy //hack for not being over https
    }
    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    // Load the routing files
    require('../app/routes/routes.js')(app);
    // Configure static file serving
    app.use(express.static('./public'));
    // Return the Express application instance
    return app;
};
