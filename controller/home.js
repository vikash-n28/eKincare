angular.module('myAPp', ['ngMaterial','$auth'])
    .controller('navCtrl', AppCtrl);
if ($auth.isAuthenticated()) {
    function AppCtrl($scope) {
        $scope.currentNavItem = '';
}

}