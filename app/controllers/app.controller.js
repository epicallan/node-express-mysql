// Invoke 'strict' JavaScript mode
'use strict';
//error handling for controller method
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};
// creating a new student
exports.create = function(req, res) {
    var path = "http://52.88.221.123:8080/mpocketmav-1.0-SNAPSHOT/webresources/webgui/addStudent";
    var student = JSON.stringify(req.body);
    rest.post(path, student, function(data) {
        //Send json respresentation of the result creating a new student
        data ? res.json(data): res.status(500).end();
    });
};
//edit
exports.edit= function(req, res) {
    var path = "http://52.88.221.123:8080/mpocketmav-1.0-SNAPSHOT/webresources/webgui/updateStudent";
    var student = JSON.stringify(req.body);
    rest.post(path, student, function(data) {
        data ? res.json(data): res.status(500).end();
    });
};
//list students
exports.list = function(req, res) {
    // console.log(req.body);
    var path = "http://52.88.221.123:8080/mpocketmav-1.0-SNAPSHOT/webresources/webgui/listStudents";
    rest.post(path, JSON.stringify(req.body), function(data) {
        //console.log(data);
        data ? res.json(data): res.status(500).end();
    });
};
//retrieving new list of to dos
exports.login = function(req, res) {
    var url = "http://52.88.221.123:8080/mpocketmav-1.0-SNAPSHOT/webresources/webgui/verify";
    rest.post(url, JSON.stringify(req.body), function(data) {
        // console.log('data: ' + data);
        if(data){
          data.username = req.body.username;
          data.token = req.session.token.id;
          res.status(200)
          res.json(data);
        } else{
          res.status(500).end();
        }

    });
};

exports.verify =  function(req, res) {
    var data = {
        results: false
    };
    if (req.session.token) {
        if (req.body.token == req.session.token.id) data.results = true;
    }
    res.json(data);
};
exports.logout =  function(req, res) {
    var data = {
        results: false
    };
    if (req.session.token) {
        if (req.body.token == req.session.token.id){
            data.results = true;
            req.body.token = null;
        }
    }
    res.json(data);
};
