app.service('SoundService', function ($rootScope, $path, HttpService, StorageService, ArchiveService, $q) {
    return {
        playSound: function (soundId, force) {
            if (force)
                $rootScope.isPlaying = false;
            const def = $q.defer();
            if(soundId>0){
                HttpService.get($path.url + "/api/doc/" + soundId).then(result => {
                        if ($rootScope.isPlaying) {
                            def.resolve("isPlaying");
                        } else {
                            $rootScope.isPlaying = true;
                            audio = new Audio(result);
                            audio.onloadedmetadata = function(data) {
                                console.log("Metadata for audio loaded",audio.duration);
                            };
                            audio.play();
                            audio.onended = function () {
                                $rootScope.isPlaying = false;
                                def.resolve("ok");
                            };
                        }
                    },
                    function (error) {
                        def.reject(error);
                    }
                );
                return def.promise;
            }
            else {
                def.reject("soundId is null");
            }
        },
        loadSoundDuration: function (soundId) {
            const def = $q.defer();
            if(soundId>0){
                HttpService.get($path.url + "/api/doc/" + soundId).then(result => {
                        audio = new Audio(result);
                        audio.onloadedmetadata = function(data) {
                            def.resolve(audio.duration);
                        };
                    },
                    function (error) {
                        def.reject(error);
                    }
                );
            }
            else{
                def.reject("soundId is null");
            }

            return def.promise;
        },
        playSoundFile: function (sound, force) {
            if (force)
                $rootScope.isPlaying = false;

            const def = $q.defer();
            if ($rootScope.isPlaying) {
                def.resolve("isPlaying");
            } else {
                $rootScope.isPlaying = true;
                audio = new Audio(sound);
                audio.play();
                audio.onended = function () {
                    $rootScope.isPlaying = false;
                    return def.resolve("ok");
                };
            }
            return def.promise;
        },
    }
});

