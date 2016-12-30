/**
 * Created by bridgeit on 19/12/16.
 */
angular.module('myAPp')
    .controller('navCtrl', function($scope, $auth) {
        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
    });
