var express = require('express');
var router = express.Router();
var MusicController = require('../controllers/MyMusicalController');

router.get('/', function(req, res, next) {
	res.render('../views/pages/index');
});

router.get('/not-found', function(req, res, next) {
    res.send('Error');
});

router.get('/music', MusicController.getMusicInfo);
router.post('/music', MusicController.addMusicInfo);

module.exports = router;
