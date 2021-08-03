app = angular.module('myApp', ['ngMaterial',
    'ngAnimate',
    'ngStorage',
    'ngDraggable',
    'oc.lazyLoad',
    'ngSanitize',
    'ngclipboard',
    // 'ngAudio',
    // 'ngWavesurfer',
]).config(function($mdThemingProvider,$compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp):/);

})
    .directive('ccjmneCardFlip', function () {
    return {
        restrict: 'E',
        templateUrl: 'ccjmne-card-flip.html',
        transclude: {
            front: 'cardFlipFront',
            back: 'cardFlipBack'
        },
        scope: {
            flipped: '=',
            flipAlong: '@'
        }
    };
})
    .directive('resizeDirective', ['$window', function ($window) {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {
            angular.element($window).bind('resize', function () {
                scope.windowWidth = $window.innerWidth;
                scope.windowHeight = $window.innerHeight;
            });
        }
    }])
    .directive('ngFiles', ['$parse', function ($parse) {
        // console.log("ngFiles")
        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, {$files: event.target.files});
            });
        };

        return {
            link: fn_link
        }
    }])
    .directive('fadeIn', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element, attrs) {
                $element.addClass("ng-hide-remove");
                $element.on('load', function () {
                    $element.addClass("ng-hide-add");
                });
            }
        };
    })
    .directive('typewrite', ['$timeout', function ($timeout) {
        function linkFunction(scope, iElement, iAttrs) {
            var timer = null,
                initialDelay = iAttrs.initialDelay ? getTypeDelay(iAttrs.initialDelay) : 200,
                typeDelay = iAttrs.typeDelay ? getTypeDelay(iAttrs.typeDelay) : 200,
                blinkDelay = iAttrs.blinkDelay ? getAnimationDelay(iAttrs.blinkDelay) : false,
                cursor = iAttrs.cursor ? iAttrs.cursor : '|',
                blinkCursor = iAttrs.blinkCursor ? iAttrs.blinkCursor === "true" : true,
                auxStyle;
            if (iAttrs.text) {
                timer = $timeout(function () {
                    updateIt(iElement, 0, iAttrs.text);
                }, initialDelay);
            }

            function updateIt(element, i, text) {
                if (i <= text.length) {
                    element.html(text.substring(0, i) + cursor);
                    i++;
                    timer = $timeout(function () {
                        updateIt(iElement, i, text);
                    }, typeDelay);
                    return;
                } else {
                    if (blinkCursor) {
                        if (blinkDelay) {
                            auxStyle = '-webkit-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-moz-animation:blink-it steps(1) ' + blinkDelay + ' infinite ' +
                                '-ms-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-o-animation:blink-it steps(1) ' + blinkDelay + ' infinite; ' +
                                'animation:blink-it steps(1) ' + blinkDelay + ' infinite;';
                            element.html(text.substring(0, i) + '<span class="blink" style="' + auxStyle + '">' + cursor + '</span>');
                        } else {
                            element.html(text.substring(0, i) + '<span class="blink">' + cursor + '</span>');
                        }
                    } else {
                        element.html(text.substring(0, i));
                    }
                }
            }

            function getTypeDelay(delay) {
                if (typeof delay === 'string') {
                    return delay.charAt(delay.length - 1) === 's' ? parseInt(delay.substring(0, delay.length - 1), 10) * 1000 : +delay;
                }
            }

            function getAnimationDelay(delay) {
                if (typeof delay === 'string') {
                    return delay.charAt(delay.length - 1) === 's' ? delay : parseInt(delay.substring(0, delay.length - 1), 10) / 1000;
                }
            }

            scope.$on('$destroy', function () {
                if (timer) {
                    $timeout.cancel(timer);
                }
            });
        }

        return {
            restrict: 'A',
            link: linkFunction,
            scope: false
        };

        $window.onload = function () {
            $scope.windowHeight = $window.innerHeight;
        };
    }])
    .directive('timelineaudio', function () {
        var template = `<div class="audio-container">
            <div class="keyFrameList" flex="100" layout="row">
                <div>
                     <md-button class="md-icon-button" ng-click="play()" >{{title}} {{!audio.paused ? "&#9632;" : "&#9658;"}} </md-button>
                </div>
                <div class="progress"  ng-mousedown="setTime($event)" ng-mouseup="reset()" >
                    <div 
                        ng-show="timeline"
                        ng-repeat="point in keyFrames track by $index" class="keyFrame"
                        style="max-height:30px; width:{{keyFrameWidth}};left:{{getPosition(point)}}" 
                        ng-click="clickComponentFrame($event,point)" 
                        ng-dblclick="setAudioTime(point)"
                        >
                    <div class="{{getClass(point)}}"  >&nbsp;</div>
                </div>
                </div>
            </div>
        </div>`;
        return {
            restrict: 'E',
            template: template,
            replace: true,
            scope: {
                durationData: '=',
                lengthData: '=',
                timeline: '=',
                pointsData: '=',
                clickFrame: '=',
                changeFrame: '=',
                url: '@',
                artist: '@',
                title: '@',
            },
            link: function ($scope, $element) {
                //Width of progress bar element
                $scope.timelineWidth = $element[0].querySelectorAll(".progress")[0].offsetWidth;
                $scope.audio = new Audio();
                $scope.audio.type = "audio/mpeg";
                $scope.audio.src = $scope.url;
                $scope.duration = '0:00';
                $scope.barstyle = {width: "0%"};
                $scope.test = function () {
                    // console.log("test")
                }

                $scope.play = function () {
                    if (!$scope.audio.paused) {
                        $scope.audio.pause();
                    } else {
                        $scope.audio.play();
                    }
                };

                $scope.pause = function () {
                    $scope.audio.pause();
                }

                $scope.keyFrameWidth = 0;
                $scope.getPosition = function (point) {
                    return (point) * $scope.keyFrameWidth;
                }

                $scope.getClass = function (point) {
                    if (point < $scope.audio.currentTime) {
                        if ($scope.pointsData.includes(point)) {
                            return "playedKeyFrame";
                        } else {
                            return "played";
                        }
                    } else if ($scope.pointsData.includes(point)) {
                        return "selectedKeyFrame";
                    }
                }

                $scope.clickComponentFrame = function ($event, point) {
                    $scope.audio.currentTime = point + 1;
                    if($event.ctrlKey){
                        // call localClickFrame set in clickFrame attributes
                        $scope.clickFrame($event, point);
                    }
                    else{
                        $scope.pause();
                    }
                }


                $scope.setAudioTime = function (point) {
                    $scope.audio.currentTime = point;
                    $scope.play();
                }
                $scope.setTime = function ($event) {
                    $scope.audio.removeEventListener('timeupdate', timeupdate, true);
                    var position = $event.clientX - $event.target.offsetLeft;
                    $scope.time = (position / $scope.timelineWidth) * 100;
                    $scope.audio.currentTime = ($scope.time * $scope.audio.duration) / 100;
                    $scope.barstyle.width = $scope.time + "%";
                };

                $scope.reset = function () {
                    $scope.audio.addEventListener('timeupdate', timeupdate);
                };

                $scope.audio.addEventListener('timeupdate', timeupdate);

                //
                $scope.changeTime = function (time) {
                    $scope.changeFrame(time);
                }

                $scope.keyFrames = [];
                for (i = 0; i < Math.floor($scope.lengthData); i++) {
                    $scope.keyFrames.push(i);
                }
                $scope.timelineWidth = $element[0].querySelectorAll(".progress")[0].offsetWidth;
                $scope.keyFrameWidth = ($scope.timelineWidth / $scope.lengthData);
                $scope.barstyle.width = ($scope.audio.currentTime / $scope.lengthData) * 100 + "%";

                function timeupdate() {
                    var sec_num = $scope.audio.currentTime;

                    var minutes = Math.floor(sec_num / 60);
                    var seconds = sec_num - (minutes * 60);
                    if (minutes < 10) {
                        minutes = "0" + minutes;
                    }
                    minutes += "";
                    if (seconds < 10) {
                        seconds = "0" + seconds;
                    }
                    seconds += "";

                    var time = minutes + ':' + seconds.substring(0, 2);
                    $scope.duration = time;
                    $scope.durationData = $scope.audio.currentTime;
                    $scope.changeTime(Math.ceil($scope.audio.currentTime));
                    $scope.$apply();


                };

            }
        };
    })
    .directive("focusNextInput", function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                element.bind('input', function (e) {
                        var pageElems = document.querySelectorAll('input'),
                            elem = e.target,
                            focusNext = false,
                            len = pageElems.length;
                        for (var i = 0; i < len; i++) {
                            var pe = pageElems[i];
                            if (focusNext) {
                                if (pe.style.display !== 'none') {
                                    angular.element(pe).focus();
                                    break;
                                }
                            } else if (pe === elem) {
                                focusNext = true;
                            }
                        }
                });
                element.bind('keyup', function (e) {
                    if(e.keyCode==8){
                        var pageElems = document.querySelectorAll('input');
                            elem = e.target,
                            focusPervious = false
                        for (var i = pageElems.length-1; i > 0; i--) {
                            var pe = pageElems[i];
                            if (focusPervious) {
                                if (pe.style.display !== 'none') {
                                    angular.element(pe).focus();
                                    break;
                                }
                            } else if (pe === elem) {
                                focusPervious = true;
                            }
                        }

                    }
                });
            }
        };
    });


