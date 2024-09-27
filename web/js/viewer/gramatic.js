angular.module('myApp').controller('gramaticController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, TeachService, $interval, SoundService) {

        $scope.notation2HTML = function (str) {
            if (str === null)
                return str;
            str = str.replace(/\n/g, '<br>');
            str = str.replace(/{rtl{/g, '<span class="spanRtl">');
            str = str.replace(/{ul{/g, '<span class="underline">');
            str = str.replace(/{lt{/g, '<span class="linethrough">');
            str = str.replace(/{it{/g, '<span class="italic">');
            str = str.replace(/{bl{/g, '<span class="bold">');
            str = str.replace(/{g{/g, '<span class="green">');
            str = str.replace(/{b{/g, '<span class="blue">');
            str = str.replace(/{r{/g, '<span class="red">');
            str = str.replace(/{y{/g, '<span class="yellow">');
            str = str.replace(/{o{/g, '<span class="orange">');
            str = str.replace(/{{/g, '<span>');
            str = str.replace(/}}/g, '</span>');
            return str;
        }



        $scope.$on("teachChanged", function (event, teach) {
            if (teach) {
                teach.HTML = $scope.notation2HTML(teach.description);
                $scope.current.teach = teach;
                console.log("teach",teach)
                // $rootScope.$broadcast("teachFrameChanged",1);
                TeachService.getTeachPointList(teach.teachId).then(result => {
                    console.log("teachChanged getTeachPointList", result);
                    $scope.current.keyList = result;
                    StorageService.setData($scope.current);
                    // $scope.changeFrame(time);
                })
            }
        });



        try {
            levelList = $scope.current.student.selectedCourse.selectedTopic.levelList;
            levelIndex = $scope.current.student.selectedCourse.selectedTopic.levelIndex;
            teachId = levelList[levelIndex].teachId;


            TeachService.getTeach(teachId).then(result=>{
                $rootScope.$broadcast("teachChanged",result);
            })
        }catch (e) {

        }

        $scope.$on("teachPointChanged", function (event, teachPoint) {
            $scope.func.content = $scope.notation2HTML(teachPoint.HTML);
            TeachService.getTeachPointList(teachPoint.teachId).then(result => {
                $scope.current.keyList = result;
                StorageService.setData($scope.current);
            })
        });


        $scope.$on("teachFrameChanged", function (event, time) {
            console.log(">>>>teachFrameChanged", time);
            $scope.changeFrame(time, $scope.current.keyList);
        });

        $scope.func.changeFrame = function (time, keyList) {
            $scope.func.content = "";
            var keyFrameList = $scope.current.keyList.filter(second => {
                return second.startTime <= time
            });
            if (keyFrameList.length > 0) {
                if (keyFrameList[keyFrameList.length - 1].HTML) {
                    html = keyFrameList[keyFrameList.length - 1].HTML;
                    $scope.func.content = $scope.notation2HTML(html);
                }
            }
            $scope.current.time = time;
            StorageService.setData($scope.current);
        }

        $scope.func.goToFrame = function (time) {
            $scope.func.content = "";
            $scope.current.time = time;
            StorageService.setData($scope.current);
        }

    });