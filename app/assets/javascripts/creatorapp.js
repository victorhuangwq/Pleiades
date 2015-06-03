function buttoncontroller($scope) {
    $scope.visible1 = false;
    $scope.visible2 = false;
    $scope.visible3 = false;
    $scope.visible4 = false;
    
    $scope.button1 = function() {
        $scope.visible1 = true;
        $scope.visible2 = false;
        $scope.visible3 = false;
        $scope.visible4 = false;
    }
    
    $scope.button2 = function() {
        $scope.visible1 = false;
        $scope.visible2 = true;
        $scope.visible3 = false;
        $scope.visible4 = false;
    }
    
    $scope.button3 = function() {
        $scope.visible1 = false;
        $scope.visible2 = false;
        $scope.visible3 = true;
        $scope.visible4 = false;
    }
    
    $scope.button4 = function() {
        $scope.visible1 = false;
        $scope.visible2 = false;
        $scope.visible3 = false;
        $scope.visible4 = true;
    }
    
    $scope.button5 = function() {
        $scope.visible1 = false;
        $scope.visible2 = false;
        $scope.visible3 = false;
        $scope.visible4 = false;
    }
}