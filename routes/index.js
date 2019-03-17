var express = require('express');
var router = express.Router();
var stats = require('../statistics.js')


router.get('/game',function(req, res, next){
	res.sendFile("game.html", {root: "./public"})
});


module.exports = router;
