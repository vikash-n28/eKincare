var app = angular.module('myAPp',['ui.router','ngMaterial','ngAnimate','ngAria','ngMessages','satellizer']);
app.config(['$stateProvider','$urlRouterProvider' ,'$httpProvider','$authProvider', function ($stateProvider,$urlRouterProvider ,$httpProvider,$authProvider) {

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
            templateUrl: 'template/home.html',
            controller:'navCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('home.calendar', {
            url: '/calendar',
            templateUrl:'template/calendar1.html',
            controller:'calendarCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html',
            controller: 'loginCtrl',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })

        .state('forgot', {
          url: '/forgot',
          templateUrl: 'template/forgot.html',
          conroller: null,
        })

        // .state('signup', {
        //     url: '/signup',
        //     templateUrl: 'template/signup.html',
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
        //     templateUrl: 'template/profile.html',
        //     controller: 'ProfileCtrl',
        //     resolve: {
        //         loginRequired: loginRequired
        //     }
        // });

}]);
