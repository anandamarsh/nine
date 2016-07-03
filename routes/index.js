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
        if(!result)
            res.status(400).json({ "error": "Could not decode request: JSON parsing failed" });
        else
            res.status(200).json({"response": result});
    });
});

module.exports = router;
