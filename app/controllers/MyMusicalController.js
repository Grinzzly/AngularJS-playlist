var Music = require('../models/Music.js');

exports.getMusicInfo = function (req, res) {
    db.driver.execQuery(`
insert into funnymusic values(
            singer,
            song,
            genre,
            year
);    `, function (err, data) {});

	Music.find().sort({singer:1}).exec(function(err, musicInfo) {
		if(err) {
			res.send(err);
		} else {
			console.log(' getMusicInfo: ',musicInfo);
			res.json(musicInfo); 
		}
	});
}

exports.addMusicInfo = function (req, res) {
	Music.create(
		{ singer : req.body.singer, song: req.body.song, genre: req.body.genre, year: req.body.year }, 
		function(err, musicInfo) {
			if (err) {
				res.send(err);
			} else {
				Music.find().sort({singer:1}).exec(function(err, musicInfo) {
					if(err) {
						res.send(err);
					} else {
						console.log(musicInfo);
						res.json(musicInfo); 
					}
				});
			}
	});
}
