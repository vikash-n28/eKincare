angular.module('myAPp')
    .controller('loginCtrl', function($scope, $location, $auth) {
        // var config = {method: 'POST',url: 'https://staging.ekincare.com/v1/core/login'};
        $scope.login = function() {
            var user = {
                email : $scope.email,
                password : $scope.password
            }
            $auth.login(user)
                .then(function(data) {
                    console.log(data.headers()['x-ekincare-key']);

                    $location.path('/home');
                })
                .catch(function(error) {
                    console.log(error.data.message, error.status);
                    $scope.error="Incorrect email / password !";
                });
        };
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function() {
                    console.log("You have successfully signed in!"+provider+"!");
                    $location.path('/home');
                })
                .catch(function(error) {
                    if (error.message) {
                        // Satellizer promise reject error.
                        console.log(error.message);
                    } else if (error.data) {
                        // HTTP response error from server
                        console.log(error.data.message, error.status);
                    } else {
                        console.log(error);
                    }
                });
        };
    });
