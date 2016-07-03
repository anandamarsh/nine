var express = require('express');
var filter = require('../service/filter');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'mi9 Coding Challenge' });
});

/* filter the passed JSON */
router.post('/', function(req, res, next) {
    filter.doFilter(req, function(result){
        if(!result) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({"error": "Could not decode request: JSON parsing failed"}));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({"response": result}));
        }
    });
});

module.exports = router;
