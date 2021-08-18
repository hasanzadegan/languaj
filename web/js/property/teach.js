console.log("salam")
angular.module('myApp').controller('teachPropertyController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService, ArchiveService, TeachService, SoundService,
              $interval, $ocLazyLoad) {
        console.log("salam")

        pointList = {};
        $scope.secondList = [];
        $scope.$watch('duration', function () {
        })


        $scope.$on("teachChanged", function (event, teach) {
            $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach = teach;
            $scope.current.point = null;
            $scope.teach = teach;
            StorageService.setData($scope.current);

            $scope.points = [];

            if (teach) {
                $scope.current.maxTime = Math.ceil(teach.duration);
                for (i = 0; i < Number($scope.current.maxTime); i++) {
                    $scope.secondList[i] = {startTime: i};
                }
                TeachService.getTeachPointList(teach.teachId).then(result => {
                    for (point of result) {
                        $scope.points.push(point.startTime)
                        // $scope.secondList[point.startTime] = {};
                        $scope.secondList[point.startTime] = point;
                    }
                })
                $scope.voiceId = teach.voiceId;
            }
        });

        $scope.$on("teachPointChanged", function (event, teachPoint) {
            $scope.current.point.HTML = teachPoint.HTML;
            StorageService.setData($scope.current);
        });


        $scope.localClickFrame = function ($event, point) {
            $rootScope.$broadcast("teachFrameChanged", point);

            // $scope.current.point.HTML = "";

            if ($scope.secondList[point].teachPointId) {
                TeachService.deleteTeachPoint($scope.secondList[point].teachPointId).then(result => {
                    $rootScope.$broadcast("teachChanged", $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach);
                })
            } else {
                var newPoint = {
                    teachId: $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach.teachId,
                    startTime: point
                };
                TeachService.addTeachPoint(newPoint).then(result => {
                    $rootScope.$broadcast("teachChanged", $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach);
                })
            }
        }

        $rootScope.$broadcast("teachChanged", $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach);

        $scope.current.selectedTime = null;

        $scope.loadKeyframe = function (selectedSecond) {
            $scope.current.point = null;
            $scope.current.selectedTime = selectedSecond;
            var keyframeList = $scope.secondList.filter(function (secondObj) {
                return selectedSecond > secondObj.startTime && secondObj.teachPointId;
            })
            var keyFrame = keyframeList[keyframeList.length - 1];
            if (keyFrame)
                $scope.current.point = keyFrame;
        }

        $scope.deleteSound = function ($event) {
            if (!$event.ctrlKey)
                return alert("press ctrl key for deleting");
            teach = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach;
            teach.voiceId = null;
            teach.duration = null;
            TeachService.updateTeach(teach).then(teachResult => {
                $rootScope.$broadcast("teachChanged", teach);
            })
        }

        $scope.updateTeach = function (teach) {
            TeachService.updateTeach(teach).then(teachResult => {
                $rootScope.$broadcast("teachChanged", teach);
            })
        }

        $scope.uplaodFiles = function () {
            document.getElementById("fileTeachSound").click()
        }

        $scope.getTheFiles = function ($files) {
            if(!$scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach)
                return alert("please select a teach")
            var f = $files[0];
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var binaryData = e.target.result;
                    var base64String = window.btoa(binaryData);
                    docData = "data:" + f.type + ";base64," + base64String;
                    fileData = {docData: docData}
                    ArchiveService.saveDoc(fileData).then(result => {
                        teach = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach;
                        teach.voiceId = result.insertId;
                        SoundService.loadSoundDuration(teach.voiceId).then(result => {
                            teach = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach;
                            teach.duration = Math.ceil(result);
                            TeachService.updateTeach(teach).then(teachResult => {
                                $rootScope.$broadcast("teachChanged", teach);
                            })
                        })
                        $scope.current.teachSoundId = result.insertId;
                    });
                };
            })(f);
            reader.readAsBinaryString(f);
        };


        $scope.updatePoint = function () {
            TeachService.updateTeachPoint($scope.current.point).then(result => {
                var teach = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach;
                $rootScope.$broadcast("teachPointChanged", $scope.current.point);
            })
        }


    })
