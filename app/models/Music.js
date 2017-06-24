;(()=>{
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var musicSchema = new Schema({
	    singer : {type: String},
	    song : {type: String},
	    genre : {type: String},
	    year : {type: String}
    });

    module.exports = mongoose.model('Music', musicSchema);

})();