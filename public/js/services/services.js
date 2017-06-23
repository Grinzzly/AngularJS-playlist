klikatech.factory('addMusicService', function($http){
	return {
		addMusic: function(music){
			return $http.post('/music', music).then(function(data) {
				return data.data;
			})
			.catch(function(data) {
				console.log('Error occurred: ' + data);
			});
		}
	}
});

klikatech.factory('getMusicService', function($http){
	return {
		getTheMusic: function(){
			return $http.get('/music').then(function(data) {
				return data.data;
			})
			.catch(function(data) {
				console.log('Error occurred: ' + data);
			});
		}
	}
});