;(()=>{
/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var musicSchema = new Schema({
	singer : {type: String},
	song : {type: String},
	genre : {type: String},
	year : {type: String}
});

module.exports = mongoose.model('Music', musicSchema);*/

    var orm = require("orm");

    orm.connect("mysql://Grinzzly:EZxCqBQ81a!EZxCqBQ81a!@klikachalange.csj2th7yy5el.us-east-2.rds.amazonaws.com/KlikaChalange", function (err, db) {
        if (err){
            throw err;
        }

        // var musicSchema = new Schema({
        //     singer : {type: String},
        //     song : {type: String},
        //     genre : {type: String},
        //     year : {type: String}
        // });

        console.log(db);
    });
})();