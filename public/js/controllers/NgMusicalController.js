;(()=> {
    klikatech.controller('mainCtrl', function ($scope, addMusicService, getMusicService) {

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.songNumbers = 0;
    $scope.pageNumbers = 0;
    $scope.actualPage = 0;

    $scope.order = '';

    $scope.musicFilterAttr = {singer: '', genre: '', year: ''};

    getMusicService.getTheMusic().then(function (response) {
        $scope.music = response;
        $scope.newMusic = response;
        $scope.oldMusic = response;
        $scope.songNumbers = $scope.music.length;
        $scope.getCategories($scope.music);
        $scope.numPages($scope.music);
    });

    $scope.addMusic = function (song) {
        addMusicService.addMusic(song).then(function (response) {
            $scope.music = response;
            $scope.newMusic = response;
            $scope.oldMusic = response;
            $scope.songNumbers = $scope.music.length;
            $scope.getCategories($scope.music);
            $scope.numPages($scope.music);
        });
    }

    $scope.numPages = function (music) {
        $scope.pageNumbers = Math.ceil(music.length / $scope.pageSize);
        $scope.pages($scope.pageNumbers);
    }

    $scope.pages = function (numPages) {
        return new Array(numPages);
    }

    $scope.setResults = function (number) {
        $scope.pageSize = number;
        $scope.numPages($scope.newMusic);
    };

    $scope.previousPage = function (pageIndex) {
        $scope.setPageNum(pageIndex);
    };

    $scope.nextPage = function (pageIndex) {
        $scope.setPageNum(pageIndex);
    }

    $scope.setPageNum = function (pageIndex) {

        $scope.newMusic = $scope.oldMusic;

        if ($scope.actualPage < pageIndex) {

            $scope.actualPage = pageIndex;

            if ($scope.actualPage == 0) {
                $scope.previousDis = true;
            }

            var deleteFields = $scope.pageSize * $scope.actualPage;

            var i = 0;
            var list = [];

            for (music in $scope.oldMusic) {
                i++;
                if (i > deleteFields) {
                    list.push($scope.oldMusic[music]);
                }
            }

            $scope.oldMusic = $scope.newMusic;

        } else {

            $scope.actualPage = pageIndex;
            if ($scope.actualPage == 0) {
                $scope.previousDis = true;
            }

            var deleteFields = $scope.pageSize * $scope.actualPage;

            var i = 0;
            var list = [];

            for (music in $scope.oldMusic) {
                i++;
                if (i > deleteFields) {
                    list.push($scope.oldMusic[music]);
                }
            }

            $scope.oldMusic = $scope.newMusic;

        }

        $scope.$watch(function () {
            $scope.newMusic = list;
        }, function () {
            $scope.numPages($scope.oldMusic);
        });
    }

    $scope.orderByType = function (type) {

        if ($scope.order === '' || $scope.order !== type || $scope.order === '-' + type) {
            $scope.order = type;
        } else {
            if ($scope.order == type) {
                $scope.order = '-' + type;

            } else {
                $scope.order = type;
            }
        }
        $scope.$watch(function () {
            $scope.newMusic = $scope.$eval("music | filter: filterFunction | orderBy: order");
        }, function (oldVal, newVal) {
            $scope.oldMusic = $scope.newMusic;
            $scope.numPages($scope.newMusic);
        });
    }

    $scope.filterFunction = function (element) {

        var status = false;

        if ($scope.musicFilterAttr.genre != '') {
            var genreElement = new RegExp('^' + $scope.musicFilterAttr.genre + '$');
        } else {
            var genreElement = new RegExp('');
        }

        if ($scope.musicFilterAttr.singer != '') {
            var singerElement = new RegExp('^' + $scope.musicFilterAttr.singer + '$');
        } else {
            var singerElement = new RegExp('');
        }

        if ($scope.musicFilterAttr.year != '') {
            var yearElement = new RegExp('^' + $scope.musicFilterAttr.year + '$');
        } else {
            var yearElement = new RegExp('');
        }

        if (element.genre.match(genreElement) && element.singer.match(singerElement) && element.year.match(yearElement)) {
            status = true;
        }

        return status;
    };


    $scope.setNewMusic = function () {

        $scope.newMusic = $scope.music;
        $scope.actualPage = 0;

        $scope.$watch(function () {
            $scope.newMusic = $scope.$eval("music | filter: filterFunction | orderBy: order");
        }, function (oldVal, newVal) {
            $scope.oldMusic = $scope.newMusic;
            $scope.numPages($scope.newMusic);
        });
    }

    $scope.getCategories = function (musics) {

        var singerExists = 0;
        var genreExists = 0;
        var yearExists = 0;

        function smallToBig(prop) {
            return function (a, b) {
                if (a[prop] > b[prop]) {
                    return 1;
                } else if (a[prop] < b[prop]) {
                    return -1;
                }
                return 0;
            }
        }

        function bigToSmall(prop) {
            return function (a, b) {
                if (a[prop] < b[prop]) {
                    return 1;
                } else if (a[prop] > b[prop]) {
                    return -1;
                }
                return 0;
            }
        }


        $scope.singers = [{desc: 'All Singers', val: ''}];
        $scope.genres = [{desc: 'All Genres', val: ''}];
        $scope.years = [{desc: 'All Years', val: ''}];

        for (music in musics) {

            for (singer in $scope.singers) {
                if (musics[music].singer == $scope.singers[singer].desc) {
                    singerExists = 1;
                }
            }

            for (genre in $scope.genres) {
                if (musics[music].genre == $scope.genres[genre].desc) {
                    genreExists = 1;
                }
            }

            for (year in $scope.years) {
                if (musics[music].year == $scope.years[year].desc) {
                    yearExists = 1;
                }
            }

            if (singerExists == 0) {
                $scope.singers.push({desc: musics[music].singer, val: musics[music].singer});
            }

            if (genreExists == 0) {
                $scope.genres.push({desc: musics[music].genre, val: musics[music].genre});
            }

            if (yearExists == 0) {
                $scope.years.push({desc: musics[music].year, val: musics[music].year});
            }

            singerExists = 0;
            genreExists = 0;
            yearExists = 0;

        }

        $scope.singers.sort(smallToBig('desc'));
        $scope.genres.sort(smallToBig('desc'));
        $scope.years.sort(bigToSmall('desc'));

    }
});
})();