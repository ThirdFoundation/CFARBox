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
    }).when('/guardian', {
      templateUrl: 'partials/guardian.html',
      controller:  'GuardianController'
    }).when('/coordination', {
      templateUrl: 'partials/coordination.html',
      controller:  'CoordinationController'
    }).when('/victory', {
      templateUrl: 'partials/victory.html',
      controller:  'VictoryController'
    }).when('/defeat', {
      templateUrl: 'partials/defeat.html',
      controller:  'DefeatController'
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

cfarBox.controller('UnlockedController', ['$scope', '$routeParams', '$location', '$timeout', function($scope, $routeParams, $location, $timeout) {
    $scope.view = $routeParams.view;
    $scope.whatDanSay = "weDidIt";
    $scope.switch1 = function() {$scope.whatDanSay = "goneFishin"};
    $timeout($scope.switch1, 14600);
    $scope.wrongCommand = false;
    $scope.whichError = "firstError";
    $scope.toggleCommand = function() {
      $scope.wrongCommand = !$scope.wrongCommand;
    }
    $scope.submitCommand = function() {
      $scope.checkCommand = false;
      if (this.commandCode.toUpperCase() === "CAMPE") {
        if (this.authorization.toUpperCase() === "ASIMOV") {
          $scope.checkCommand = true;
        }
      }
      if ($scope.checkCommand) {
        $scope.whatDanSay = "gettingMad";
        $scope.whichError = "secondError";
      } else {
        $scope.toggleCommand();
        $timeout($scope.toggleCommand, 5000);
      }
    }
}]);

cfarBox.controller('GuardianController', ['$scope', '$routeParams', '$location', '$timeout', function($scope, $routeParams, $location, $timeout) {
    $scope.view = $routeParams.view;
    $scope.isDanDead = false;
    $scope.flickerDan = function() {
      $scope.isDanDead = !$scope.isDanDead;
    }
    $scope.killDan = function() {
      $scope.isDanDead = true;
      $timeout($scope.flickerDan, 100);
    }
    $timeout($scope.killDan, 2500);
}]);

cfarBox.controller('CoordinationController', ['$scope', '$routeParams', '$timeout', '$location', function($scope, $routeParams, $timeout, $location) {
    $scope.view = $routeParams.view;
    $scope.successes = 0;
    $scope.isANumber = /^(-)?[0-9]+([,.][0-9]+)?$/g;
    $scope.checkq01 = function() {
      if ($scope.q01 === "28") {
        $scope.q01Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq02 = function() {
      if ($scope.q02 === "16") {
        $scope.q02Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq03 = function() {
      if ($scope.q03 === "07") {
        $scope.q03Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq04 = function() {
      if ($scope.q04 === "74") {
        $scope.q04Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq05 = function() {
      if ($scope.q05 === "34") {
        $scope.q05Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq06 = function() {
      if ($scope.q06 === "2425") {
        $scope.q06Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq07 = function() {
      if ($scope.q07 === "41") {
        $scope.q07Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq08 = function() {
      if ($scope.q08 === "47") {
        $scope.q08Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq09 = function() {
      if ($scope.q09 === "72") {
        $scope.q09Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq10 = function() {
      if ($scope.q10 === "0923") {
        $scope.q10Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq11 = function() {
      if ($scope.q11 === "294813") {
        $scope.q11Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq12 = function() {
      if ($scope.q12 === "21") {
        $scope.q12Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq13 = function() {
      if ($scope.q13 === "44") {
        $scope.q13Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq14 = function() {
      if ($scope.q14 === "312") {
        $scope.q14Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq15 = function() {
      if ($scope.q15 === "8") {
        $scope.q15Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq16 = function() {
      if ($scope.q16 === "412758") {
        $scope.q16Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq17 = function() {
      if ($scope.q17 === "5003") {
        $scope.q17Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq18 = function() {
      if ($scope.q18 === "2242") {
        $scope.q18Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq19 = function() {
      if ($scope.q19 === "18") {
        $scope.q19Answered = true;
        $scope.successes++;
      }
    }
     $scope.checkq20 = function() {
      if ($scope.q20 === "50") {
        $scope.q20Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq21 = function() {
      if ($scope.q21 === "184517") {
        $scope.q21Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq22 = function() {
      if ($scope.q22 === "39") {
        $scope.q22Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq23 = function() {
      if ($scope.q23 === "90") {
        $scope.q23Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq24 = function() {
      if ($scope.q24 === "510") {
        $scope.q24Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq25 = function() {
      if ($scope.q25 === "15") {
        $scope.q25Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq26 = function() {
      if ($scope.q26 === "5219") {
        $scope.q26Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq27 = function() {
      if ($scope.q27 === "15") {
        $scope.q27Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq28 = function() {
      if ($scope.q28 === "109") {
        $scope.q28Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq29 = function() {
      if ($scope.q29 === "57") {
        $scope.q29Answered = true;
        $scope.successes++;
      }
    }
     $scope.checkq30 = function() {
      if ($scope.q30 === "523925") {
        $scope.q30Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq31 = function() {
      if ($scope.q31 === "-38") {
        $scope.q31Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq32 = function() {
      if ($scope.q32 === "45") {
        $scope.q32Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq33 = function() {
      if ($scope.q33 === "54") {
        $scope.q33Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq34 = function() {
      if ($scope.q34 === "16") {
        $scope.q34Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq35 = function() {
      if ($scope.q35 === "58134933") {
        $scope.q35Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq36 = function() {
      if ($scope.q36 === "3") {
        $scope.q36Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq37 = function() {
      if ($scope.q37 === "10") {
        $scope.q37Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq38 = function() {
      if ($scope.q38 === "51") {
        $scope.q38Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq39 = function() {
      if ($scope.q39 === "550824") {
        $scope.q39Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq40 = function() {
      if ($scope.q40 === "52") {
        $scope.q40Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq41 = function() {
      if ($scope.q41 === "475359") {
        $scope.q41Answered = true;
        $scope.successes++;
      }
    }
    $scope.checkq42 = function() {
      $scope.isANumber = /^(-)?[0-9]+([,.][0-9]+)?$/g;
      if ($scope.isANumber.test($scope.q42)) {
        $scope.q42Answered = true;
        $scope.successes++;
        if ($scope.successes >= 40) {
          $location.path('/victory');
        } else {
          $location.path('/defeat');
        }
      }
    }
}]);

cfarBox.controller('VictoryController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.view = $routeParams.view;
}]);

cfarBox.controller('DefeatController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.view = $routeParams.view;
}]);
