/**
 * Created by bridgeit on 19/12/16.
 */

angular.module('myAPp')
    .controller('logoutCtrl', function($location, $auth) {
        if (!$auth.isAuthenticated()) { return; }
        $auth.logout()
            .then(function() {
                console.log("You have been logged out");
                // toastr.info('You have been logged out');
                $location.path('/login');
            });
    });
