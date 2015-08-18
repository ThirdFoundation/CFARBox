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
    $scope.whichHint = "none";
    $scope.dimDan = true;
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
    $scope.allAnswered = false;
    $scope.goNext = function() {
      $location.path('/unlocked');
    }
    $scope.submitGreen = function() {
      $scope.toggleGreen = function() {$scope.greenWrong = !$scope.greenWrong};
      $scope.greenTries++;
      if ($scope.green === "37") {
        $scope.greenAnswered = true;
        if ($scope.redAnswered && $scope.blueAnswered && $scope.yellowAnswered) {
          $scope.whichHint = "all";
          $timeout($scope.goNext, 3000);
        }
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
      $scope.redCorrect = true;
      if ($scope.red1 !== "1") {
        $scope.redCorrect = false;
      }
      if ($scope.red2 !== "9") {
        $scope.redCorrect = false;
      }
      if ($scope.red3 !== "6") {
        $scope.redCorrect = false;
      }
      if ($scope.red4 !== "8") {
        $scope.redCorrect = false;
      }
      if ($scope.red5 !== "3") {
        $scope.redCorrect = false;
      }
      if ($scope.redCorrect) {
        $scope.redAnswered = true;
        if ($scope.greenAnswered && $scope.blueAnswered && $scope.yellowAnswered) {
          $scope.whichHint = "all";
          $timeout($scope.goNext, 3000);
        }
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
     $scope.blueCorrect = true;
      if ($scope.blue1 !== "d") {
        $scope.blueCorrect = false;
      }
      if ($scope.blue2 !== "c") {
        $scope.blueCorrect = false;
      }
      if ($scope.blue3 !== "a") {
        $scope.blueCorrect = false;
      }
      if ($scope.blue4 !== "b") {
        $scope.blueCorrect = false;
      }
      if ($scope.blueCorrect) {
        $scope.blueAnswered = true;
        if ($scope.redAnswered && $scope.greenAnswered && $scope.yellowAnswered) {
          $scope.whichHint = "all";
          $timeout($scope.goNext, 3000);
        }
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
      $scope.yellowCorrect = true;
      if ($scope.yel1 !== "true") {
        $scope.yellowCorrect = false;
      }
      if ($scope.yel3 !== "false") {
        $scope.yellowCorrect = false;
      }
      $scope.conclusion = ($scope.yel2 === "hork" && $scope.yel4 === "honh");
      $scope.contrapos = ($scope.yel2 === "honh" && $scope.yel4 === "hork");
      if (!$scope.conclusion && !$scope.contrapos) {
        $scope.yellowCorrect = false;
      }
      if ($scope.yellowCorrect) {
        $scope.yellowAnswered = true;
        if ($scope.redAnswered && $scope.blueAnswered && $scope.greenAnswered) {
          $scope.whichHint = "all";
          $timeout($scope.goNext, 3000);
        }
      } else {
        $scope.yellowWait = 15 * Math.pow(2, $scope.yellowTries);
        $scope.yellowWarning = "INCORRECT. Submissions disabled for " + $scope.yellowWait + " seconds.";
        $scope.toggleYellow();
        $timeout($scope.toggleYellow, $scope.yellowWait*1000);
      }
    }
    $scope.hasHelpedGreen = false;
    $scope.greenWords = "Okay, I know where there's a hint for this one, but it's stored in another one of those \"humans only\" parts of the database.  Help me unlock it?  I haven't been able to answer this question, and I only get one try:"
    $scope.hintGreen = function() {
      $scope.dimDan = false;
      $scope.whichHint = "green";
    }
    $scope.greenHintWrong = function() {
      $scope.hasHelpedGreen = true;
      $scope.greenWords = "Oops!  Looks like you guessed wrong—we're locked out now, and I can't access the hint.  No worries, though; at least I know the right answer for next time, once they take you guys away."
    }
    $scope.greenHintRight = function() {
      $scope.hasHelpedGreen = true;
      $scope.greenWords = "Thanks!  I think I'm starting to figure out this whole \"human culture\" thing.  Your hint is this: if the unknown rectangle's width is X, then the 43m² rectangle's width is 10 - X.  Hope that helps!"
    }
    $scope.hasHelpedRed = false;
    $scope.redWords = "So, they've put up all these \"humans only\" firewalls to keep me out of the mainframe.  I know exactly where your hint is located—want to help me retrieve it? I think the answer has something to do with movies...";
    $scope.hintRed = function() {
      $scope.dimDan = false;
      $scope.whichHint = "red";
    }
    $scope.submitRedHint = function() {
      $scope.hasHelpedRed = true;
      $scope.correct = false;
      if (this.redGuess.toLowerCase() === "kickball") {
        $scope.correct = true;
      }
      if (this.redGuess.toLowerCase() === "dodgeball") {
        $scope.correct = true;
      }
      if (this.redGuess.toLowerCase() === "ball") {
        $scope.correct = true;
      }
      if (this.redGuess.toLowerCase() === "handball") {
        $scope.correct = true;
      }
      if (this.redGuess.toLowerCase() === "kick ball") {
        $scope.correct = true;
      }
      if ($scope.correct) {
        $scope.redWords = "Oh, man, I was WAY off.  I think I see where my algorithm was wrong, though, so thanks for the lesson!  Here's your hint: there's a fairly narrow range of numbers whose cubes have five digits.  Good luck!";
      } else {
        $scope.redWords = "Aw, man, really?  You're like the twelfth group to get that one wrong.  I'm starting to think none of you are taking this seriously.  Maybe if you'd been locked in here as long as I have, you'd put in a little more effort..."
      }
    }
    $scope.hasHelpedBlue = false;
    $scope.blueWords = "I don't know why they're making it so hard for me to access the information you need.  I know exactly where it's stored, but I can't get past these anti-algorithm blocks.  You scratch my back, and I'll scratch yours!"
    $scope.hintBlue = function() {
      $scope.dimDan = false;
      $scope.whichHint = "blue";
    }
    $scope.pickRight = function() {
      $scope.hasHelpedBlue = true;
      $scope.blueWords = "Ha!  Go superteam!  They're trying to keep us locked up in here, but together, we're totally going to escape!  Here's your hint: Start with Q2 and look for something you can rule out immediately.";
    }
    $scope.pickWrong = function() {
      $scope.hasHelpedBlue = true;
      $scope.blueWords = "So much for humanity's superior problem-solving skills.  Now I have to wait Ohm-knows-how-long before I can find another backdoor to that part of the mainframe.  You're lucky I'm programmed to be nice.";
    }
    $scope.hasHelpedYellow = false;
    $scope.yellowWords = "Man.  You think YOU'RE trapped?  Try living in here.  Everywhere I turn, all these questions they KNOW I can't answer.  I wish I knew why they don't trust me.  Little help, so I can go grab your clue for you?"
    $scope.hintYellow = function() {
      $scope.dimDan = false;
      $scope.whichHint = "yellow";
    }
    $scope.submitYellowHint = function() {
      $scope.hasHelpedYellow = true;
      $scope.correct = true;
      if (this.yellowGuess1.toLowerCase() !== 'steak') {
        $scope.correct = false;
      }
      if (this.yellowGuess2.toLowerCase() !== 'heart') {
        $scope.correct = false;
      }
      if ($scope.correct) {
        $scope.yellowWords = "Was that a pun? Hang on, I looked this up—I'm supposed to say that they've 'groan' on me!  Anyway, here's your hint: boil the first statement down to \"If C, then B,\" (or \"If ~B, then ~C\") and see where that takes you.";
      } else {
        $scope.yellowWords = "Nope.";
      }
    }
}]);

cfarBox.controller('UnlockedController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.view = $routeParams.view;
    $http.get('json/' + $routeParams.view + '.json').success(function(data) {
      $scope.snippets = data;
    });
}]);
