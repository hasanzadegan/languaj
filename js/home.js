app = angular.module('myApp', [
    'ngMaterial',
    'ngAnimate',
    'ngStorage'
]);

app.controller('HomeCtrl', function ($rootScope, $scope, $http, $window,
                                     $timeout,
                                     StorageService,
                                     $location,
                                     $q,
) {

    $scope.current = StorageService.getData();
    if (!$scope.current)
        $scope.current = {};
    if (!$scope.current.site) {
        $scope.current.site = {
            lang: "en",
            page: "home"
        };
        StorageService.setData($scope.current);
    }


    $scope.pages = ['home', 'teacher', 'producer', 'marketer']
    $scope.colors = {
        home: '#F56788',
        teacher: '#2CB6BF',
        producer: '#3A9DF3',
        marketer: '#AF73EC',
    }

    $scope.lables = {
        en: {
            home: {
                slogon: {
                    1: "Learn like children",
                    2: "Do not worry about making mistakes"
                },
                benefit:{
                    title: "What is benefit for a learners?",
                    list: [
                    {
                        title: "Decrease cost",
                        desc: "Language contents are reusable so cost of them decreased."
                    },
                    {
                        title: "Learn deep",
                        desc: "repeat and repeat. courses created with this concept.so this help to learn deep."
                    },
                    {
                        title: "Use waste time",
                        desc: "you are not limited to place learn every time and everywhere everything is on your mobile."
                    },
                ],
                },
                why: {
                    title: "What is languaj.com?",
                    desc: "languaj.com is an IT platform for easy creation of language contents by teachers as language courses. each courses can share easily and used with language learners. They are consist of small peace of lessons and tests which mixed together called quizlet. phrases repeated in different types of quizlet. as a learner don't worry about making mistakes. just go on and learn like children."
                },
                how: {
                    title: "How to courses created and published?",
                    list: [
                        {
                            img: "/site/img/teacher.svg",
                            title: "A producer collect needs for creating a course"
                        }, {
                            img: "/site/img/producer.svg",
                            title: "A teacher create content for ordered course."
                        }, {
                            img: "/site/img/marketer.svg",
                            title: "marketers can find suitable target market."
                        },
                    ]
                },
                quality: {
                    title: "what is languaj.com plan for quality assurance?",
                    desc: "teachers that have access to teacher section have teaching certificate and producers are limited to this teachers. also we have a supervision team for checking courses accuracy. also there is a feedback element in each quizlet and each people can report problem in content."
                }
            },
            teacher: {
                slogon: {
                    1: "Don't sale your time cheap",
                    2: "focus on better content"
                },
                benefit:{
                    title: "what is benefit for a teacher?",
                    list: [
                        {
                            title: "Teach better",
                            desc: "don't stop in the past. young people need new tools for learning."
                        },
                        {
                            title: "Get seen",
                            desc: "personal branding is important. create content with your own name and get seen."
                        },
                        {
                            title: "Earn more",
                            desc: "don't sale your time. create language content and earn many time"
                        },
                    ],
                },
            },
            producer: {
                slogon: {
                    1: "Language content always is new",
                    2: "Invest smart, focus on better"
                },
                benefit:{
                    title: "What is benefit for a producer?",
                    list: [
                        {
                            title: "Help people to learn",
                            desc: "more courses means more choice, invest to help people for learning."
                        },
                        {
                            title: "Invest smarter",
                            desc: "Language content always is new,produce one time gain many time."
                        },
                        {
                            title: "Earn More",
                            desc: "connect to marketer and don't worry about sale. they knows the way."
                        },
                    ],
                },
            },
            marketer: {
                slogon: {
                    1: "always there is new customer",
                    2: "sale courses again and again"
                },
                benefit:{
                    title: "What is benefit for a marketer?",
                    list: [
                        {
                            title: "Private Link",
                            desc: "each course has a private link contain your info. each sale has its own commission."
                        },
                        {
                            title: "Sale many time",
                            desc: "many people needs to learn new languages and old customers need new courses."
                        },
                        {
                            title: "Sale online",
                            desc: "you are not limited to specific place. new learners are everywhere."
                        },
                    ],
                },
            },
        },
        // fa:{
        //     // home :{
        //     //     test:"سلام"
        //     // },
        //     // teacher:{
        //     //     test:"چطوری"
        //     // },
        // }
    };

    $scope.refreshLable = function () {
        $scope.langLable = $scope.lables[$scope.current.site.lang];
        $scope.lable = $scope.langLable[$scope.current.site.page];
    }
    $scope.refreshLable();

    $scope.setLang = function (lang) {
        $scope.current.site.lang = lang;
        StorageService.setData($scope.current);
        $scope.refreshLable();
    }

    $scope.setPage = function (page) {
        $scope.current.site.page = page;
        StorageService.setData($scope.current);
        $scope.refreshLable();
    }

    $scope.signIn = function () {
        window.location.href = "/student.html";
    }
});
