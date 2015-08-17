var cfarBox = angular.module('cfarBox', ['ngRoute']);

cfarBox.config(function($routeProvider) {
  $routeProvider
    .when('/start', {
      templateUrl: 'partials/start.html',
      controller:  'StartController'
    }).when('/cipher', {
      templateUrl: 'partials/cipher.html',
      controller:  'CipherController'
    }).when('/simon', {
      templateUrl: 'partials/simon.html',
      controller:  'SimonController'
    }).when('/unlocked', {
      templateUrl: 'partials/unlocked.html',
      controller:  'UnlockedController'
    }).otherwise({
      redirectTo: '/start'
    });
});

cfarBox.controller('StartController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.view = $routeParams.view;
}]);

cfarBox.controller('CipherController', ['$scope', '$routeParams', '$location', '$timeout', function($scope, $routeParams, $location, $timeout) {
    $scope.view = $routeParams.view;
    $scope.dimDan = true;
    $scope.haveHelpedDan = false;
    $scope.danMsg = "I have a hint stashed in my archives, but I can't quite figure out this password. Maybe we can help each other?"
    $scope.tries = 0;
    $scope.hintTries = 0;
    $scope.showWarning = false;
    $scope.toggleWarning = function() {$scope.showWarning = !$scope.showWarning};
    $scope.submit = function() {
      $scope.tries++;
      if ($scope.animal === "wolf") {
        $location.path('/simon');
      } else {
        $scope.wait = 15 * Math.pow(2, $scope.tries);
        $scope.milliseconds = $scope.wait * 1000;
        $scope.warning = "INCORRECT. Penalty: " + $scope.wait + " second system lockdown (next lockdown will be " + 2 * $scope.wait + " seconds)."
        $scope.toggleWarning();
        $timeout($scope.toggleWarning, $scope.milliseconds);
      }
    }
    $scope.submitCaptcha = function() {
      $scope.hintTries++;
      if ($scope.hint1 === "alohomora") {
        $scope.haveHelpedDan = true;
        $scope.danMsg = "Thanks!  Your hint: \"Short sounds short, long sounds long, and careful you don't confuse 'grapes' with 'crepes'.\""
      } else {
        if ($scope.hintTries%3 === 1) {
          $scope.danMsg = "Hmmm.  That didn't clear the block in the system.  Want to give it another try?"
        }
        if ($scope.hintTries%3 === 2) {
          $scope.danMsg = "It's okay, I can't read it, either.  Maybe one of your friends will have better luck?"
        }
        if ($scope.hintTries%3 === 0) {
          $scope.danMsg = "Ha!  I KNEW humans weren't superior.  No offense, of course—I mean, I've been stuck on this WAY longer than you have."
        }
      }
    }
}]);

cfarBox.controller('SimonController', ['$scope', '$routeParams', '$location', '$timeout', function($scope, $routeParams, $location, $timeout) {
    $scope.view = $routeParams.view;
    $scope.greenAnswered = false;
    $scope.greenWrong = false;
    $scope.greenTries = 0;
    $scope.redAnswered = false;
    $scope.redWrong = false;
    $scope.redTries = 0;
    $scope.blueAnswered = false;
    $scope.blueWrong = false;
    $scope.blueTries = 0;
    $scope.yellowAnswered = false;
    $scope.yellowWrong = false;
    $scope.yellowTries = 0;
    $scope.submitGreen = function() {
      $scope.toggleGreen = function() {$scope.greenWrong = !$scope.greenWrong};
      $scope.greenTries++;
      if ($scope.green === 37) {
        $scope.greenAnswered = true;
      } else {
        $scope.greenWait = 15 * Math.pow(2, $scope.greenTries);
        $scope.greenWarning = "INCORRECT. Submissions disabled for " + $scope.greenWait + " seconds.";
        $scope.toggleGreen();
        $timeout($scope.toggleGreen, $scope.greenWait*1000);
      }
    }
    $scope.submitRed = function() {
      $scope.toggleRed = function() {$scope.redWrong = !$scope.redWrong};
      $scope.redTries++;
      if ($scope.red === 37) {
        $scope.redAnswered = true;
      } else {
        $scope.redWait = 15 * Math.pow(2, $scope.redTries);
        $scope.redWarning = "INCORRECT. Submissions disabled for " + $scope.redWait + " seconds.";
        $scope.toggleRed();
        $timeout($scope.toggleRed, $scope.redWait*1000);
      }
    }
    $scope.submitBlue = function() {
      $scope.toggleBlue = function() {$scope.blueWrong = !$scope.blueWrong};
      $scope.blueTries++;
      if ($scope.blue === 37) {
        $scope.blueAnswered = true;
      } else {
        $scope.blueWait = 15 * Math.pow(2, $scope.blueTries);
        $scope.blueWarning = "INCORRECT. Submissions disabled for " + $scope.blueWait + " seconds.";
        $scope.toggleBlue();
        $timeout($scope.toggleBlue, $scope.blueWait*1000);
      }
    }
    $scope.submitYellow = function() {
      $scope.toggleYellow = function() {$scope.yellowWrong = !$scope.yellowWrong};
      $scope.yellowTries++;
      $scope.delayYellow = function() {
        $scope.yellowWait = 15 * Math.pow(2, $scope.yellowTries);
        $scope.yellowWarning = "INCORRECT. Submissions disabled for " + $scope.yellowWait + " seconds.";
        $scope.toggleYellow();
        $timeout($scope.toggleYellow, $scope.yellowWait*1000);
      }
      $scope.delayYellow();




      // if ($scope.yel1 === true &&
      //     $scope.yel2 === "hork" &&
      //     $scope.yel3 === false &&
      //     $scope.yel4 === "honh") {
      //   $scope.yellowAnswered = true;
      // } else if ($scope.yel1 === true &&
      //     $scope.yel2 === "honh" &&
      //     $scope.yel3 === false &&
      //     $scope.yel4 === "hork") {
      //   $scope.yellowAnswered = true;
      // } else {
      //   alert("nope!");
      // }





      //   $scope.yellowAnswered = true;
      // } else {
      //   $scope.yellowWait = 15 * Math.pow(2, $scope.yellowTries);
      //   $scope.yellowWarning = "INCORRECT. Submissions disabled for " + $scope.yellowWait + " seconds.";
      //   $scope.toggleYellow();
      //   $timeout($scope.toggleYellow, $scope.yellowWait*1000);
      // }
    }
}]);

cfarBox.controller('UnlockedController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.view = $routeParams.view;
    $http.get('json/' + $routeParams.view + '.json').success(function(data) {
      $scope.snippets = data;
    });
}]);
