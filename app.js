var app = angular.module('myAPp',['ui.router','ngMaterial','ngAnimate','ngAria','ngMessages','satellizer']);
app.config(['$stateProvider','$urlRouterProvider' ,'$httpProvider','$authProvider',function ($stateProvider,$urlRouterProvider ,$httpProvider,$authProvider) {

    /**
     * Helper auth functions
     **/

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.withCredentials = false;
    $authProvider.loginUrl = "https://staging.ekincare.com/v1/core/login";
    var skipIfLoggedIn = ['$q', '$auth', function ($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }
        return deferred.promise;
    }];


    /**
     * App routes
     */

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller:'navCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.calender', {
            url: '/calendar',
            templateUrl: 'templates/calender.html',
            controller:'navCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })

        // .state('signup', {
        //     url: '/signup',
        //     templateUrl: 'templates/signup.html',
        //     controller: 'SignupCtrl',
        //     resolve: {
        //         skipIfLoggedIn: skipIfLoggedIn
        //     }
        // })
        .state('logout', {
            url: '/logout',
            template: null,
            controller: 'logoutCtrl'
        })
        // .state('profile', {
        //     url: '/profile',
        //     templateUrl: 'templates/profile.html',
        //     controller: 'ProfileCtrl',
        //     resolve: {
        //         loginRequired: loginRequired
        //     }
        // });

}]);
