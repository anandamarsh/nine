var express = require('express');
var filter = require('../service/filter');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'mi9 Coding Challenge' });
});

/* filter the passed JSON */
router.post('/', function(req, res, next) {
    console.log("\n\nREQ: "+JSON.stringify(req.headers));
    filter.doFilter(req, function(result){
        console.log("doFilter() called with "+JSON.stringify(result));
        if(!result) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({"error": "Could not decode request: JSON parsing failed"}));
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({"response": result}));
            res.end();
        }
    });
});

module.exports = router;
