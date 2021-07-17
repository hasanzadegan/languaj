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
            lang: "fa",
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
                            img: "teacher",
                            title: "A producer collect needs for creating a course"
                        }, {
                            img: "producer",
                            title: "A teacher create content for ordered course."
                        }, {
                            img: "marketer",
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
                            title: "Create network",
                            desc: "know teachers and marketers in platform and develop your network."
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
        fa: {
            home: {
                slogon: {
                    1: "مانند کودکان یاد بگیرید",
                    2: "نگران اشتباه کردن نباشید"
                },
                benefit:{
                    title: "مزیت برای زبان آموزان چیست؟",
                    list: [
                        {
                            title: "هزینه ها را کاهش دهید",
                            desc: "محتوای زبان برای مدرسین قابل استفاده مجدد است بنابراین هزینه های آن کاهش می یابد."
                        },
                        {
                            title: "عمیق یاد بگیرید",
                            desc: "تکرار و تکرار، دوره ها با این فلسفه ایجاد می شوند. که این به یادگیری عمیق کمک می کند.",
                        },
                        {
                            title: "از زمانهای مرده استفاده کنید",
                            desc: "شما به مکان خاصی محدود نیستید. همیشه م همه جا یاد بگیرید. همه چیز در موبایل شماست." ,
                        },
                    ],
                },
                why: {
                    title: "لنگوئج دات کام چیست?",
                    desc: "لنگوئج دات کام یک پلتفرم برای ایجاد آسان محتوای آموزشی زبان به وسیله اساتید تحت عتوان دوره است. هر دوره می تواند به سادگی به اشتراک گذاشته شود و توسط زبان آموزها یاد گرفته شود. هر دوره از اجزای کوچکی شامل آموزشها و تست ها است که درسواره نامیده می شود. عبارات در انواع مختلف درسواره ها تکرار می شوند. بعنوان یک زبان آموز نگران اشتباه کردن نباشید. فقط ادامه دهید و مانند کودکان یاد بگیرید." ,
                },
                how: {
                    title: "دوره ها چگونه تولید و منتشر می شوند.",
                    list: [
                        {
                            img: "teacher",
                            title: "یک تولید کننده نیاز به یک دوره را شناسایی می کند.",
                        }, {
                            img: "producer",
                            title: "یک مدرس دوره سفارش داده شده را تولید می کند"
                        }, {
                            img: "marketer",
                            title: "یک بازاریاب بازار مناسب برای دوره را تامین می کند"
                        },
                    ]
                },
                quality: {
                    title: "برنامه لنگوئج دات کام برای تضمین کیفیت چیست",
                    desc: "مدرسینی که به تولید دوره دسترسی دارند و تولید کنندگان برای تهیه دوره به این مدرسین محدود هستند. همچنین ما برای هر زبان یک تیم نظارتی برای کنترل صحت محتوا داریم. همچنین در داخل درسواره ها یک االمان ارسال بازخورد پیش بینی شده است و هر فرد می تواند مشکل در محتوا را گزارش دهد." ,
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
                            title: "Create network",
                            desc: "know teachers and marketers in platform and develop your network."
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
        $scope.showMenu = false;
        StorageService.setData($scope.current);
        $scope.refreshLable();
    }

    $scope.signIn = function () {
        window.location.href = "/student.html";
    }
});
