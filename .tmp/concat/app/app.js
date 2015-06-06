'use strict';

angular.module('recuserstudyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'chart.js'
])
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/step1');

    $locationProvider.html5Mode(true);
  }]);

'use strict';

angular.module('recuserstudyApp')
  .controller('ResultCtrl', ["$scope", "$http", "Modal", function ($scope, $http, Modal) {
    $scope.loading = true;
    $scope.withImages = [1, 1];
    $scope.withoutImages = [1, 1];

    $http.get('/api/movies/getStats')
      .success(function (res) {
        $scope.stats = res;
        $scope.withImages = [res.withImages.chosen, res.withImages.amount - res.withImages.chosen];
        $scope.withoutImages = [res.withoutImages.chosen, res.withoutImages.amount - res.withoutImages.chosen];
        $scope.loading = false;
      })
      .error(function(err){
        Modal.confirm.info(function () {
          $scope.loading = false;
        })("Error", err, "Ok");
      });

    $scope.labels = ["chose a recommendation", "did not choose a recommendation"];
    $scope.colors = ['#FD1F5E','#1EF9A1'];

  }]);

'use strict';

angular.module('recuserstudyApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('result', {
        url: '/result',
        templateUrl: 'app/result/result.html',
        controller: 'ResultCtrl'
      });
  }]);

'use strict';

angular.module('recuserstudyApp')
  .controller('Step1Ctrl', ["$scope", "Modal", "$state", "Movies", function ($scope, Modal, $state, Movies) {

    Movies.user = [];
    Movies.withImages = null;
    Movies.alreadyDecided = false;
    Movies.completed = 0;

    var initial = true;

    var step1Html = '' +
    '<h3>Welcome to our user study experiment.</h3><br>' +
    '<p>The experiment will take an average time of 15 minutes, during this time we will introduce movies reccomendations from which you are required to pick the ones that best suites you.<br>In case none of the reccomendations appeals to you, you can choose to not make a choice and move forward.</br></p>' +
    '<br><p>In-order to show you the best reccomendations, we are going to begin with showing you a list of very known and successful movies from which you are asked to pick 10 that you most like.<br>You can always regret your pick of choice and replace it with another one.</br></p>';


    Modal.confirm.info()("Welcome!", step1Html, "I am ready. lets start");

    $scope.firstIndex = 0;
    $scope.lastIndex = 9;


    $scope.allMovies = Movies.all;

    $scope.totalMovies = Object.keys($scope.allMovies).length - 1;


    $scope.userMovies = Movies.user;
    $scope.movies = [];


    var alreadyFinished = false;
    $scope.$watch('userMovies.length', function(){
      if ($scope.userMovies.length === 1 && initial){
        initial = false;
        Modal.confirm.info()('Notice&nbsp&nbsp<span class="glyphicon glyphicon glyphicon-info-sign" aria-hidden="true"></span>', '<p>If you regret you choice you can always click the movie again to remove it.</p>', "Got it");

      }
      if ($scope.userMovies.length === 10 && !alreadyFinished){
        alreadyFinished = true
        Modal.confirm.confirm(function(){$state.go("step2", {"recId": 1})})("You have finished the first step", '<p>You can move forward or change your choices if you wish.</p>', "Continue");
      }
    });

    for (var i = 0; i < 10; i++) {
      $scope.movies.push($scope.allMovies[i]);
    }

    $scope.left = function () {
      if ($scope.firstIndex > 0) {
        $scope.movies.pop();
        $scope.lastIndex--;
        $scope.firstIndex--;
        $scope.movies.unshift($scope.allMovies[$scope.firstIndex]);
        return;
      }
    };

    $scope.right = function () {
      if ($scope.lastIndex < Object.keys($scope.allMovies).length - 1) {
        $scope.movies.shift();
        $scope.lastIndex++;
        $scope.firstIndex++;
        $scope.movies.push($scope.allMovies[$scope.lastIndex]);
        return;
      }
    };

    $scope.addMovie = function(index) {
      for (var i = 0; i < $scope.userMovies.length; i++){
        if ($scope.userMovies[i].name === $scope.movies[index].name){
          $scope.removeMovie(i);
          return;
        }
      }
      $scope.userMovies.push($scope.movies[index]);
    };

    $scope.removeMovie = function(index) {
      $scope.userMovies.splice(index, 1);
    };

    $scope.calcMovie = function (movie) {
      for (var i = 0; i < $scope.userMovies.length; i++){
        if ($scope.userMovies[i].name === movie.name){
          return 'thumbnail chosen';
        }
      }
      return 'thumbnail';
    }


  }]);

'use strict';

angular.module('recuserstudyApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('step1', {
        url: '/step1',
        templateUrl: 'app/step1/step1.html',
        controller: 'Step1Ctrl'
      });
  }]);

'use strict';

angular.module('recuserstudyApp')
  .controller('Step2Ctrl', ["$scope", "$http", "Modal", "Movies", "$state", "$stateParams", "$interval", function ($scope, $http, Modal, Movies, $state, $stateParams, $interval) {

    $scope.loading = true;


    var afterSuccess = function (load) {
      if (!load)
        $scope.loading = false;
      else
        $interval(function () {
          $scope.loading = false;
        }, 500, 1);

      $scope.withImages = Movies.withImages;

      $scope.completed = Movies.completed;

      $scope.id = $stateParams.recId;

      if ($scope.id < 1 || $scope.id > 10) {
        $state.go('step1');
        return;
      }

      if (!Movies.user.length) {
        $state.go("step1");
        return;
      }
      else {
        var userMovies = Movies.user;
      }


      var currentMovie = userMovies[$scope.id - 1];
      $scope.recommendations = [];

      currentMovie.recommend.map(function (id) {
        $scope.recommendations.push(Movies.recommendations[id]);
      });

      var step1Html = '' +
        '<p>In this step we are going to show you 10 sets of recommendations made by our system.<br>For each recommendation you are required to choose the movie that you will most like.<br>If none of the recommendations suits you please choose <b>"Nothing suits me</b>".</p>';
      var finishHtml = '' +
        '<p>Thanks for participating in the experiment.<br>We appreciate the time and effort you have made.</p>' +
        '<p>We will see you at the movies.</p>';


      if ($scope.id == 1 && !$scope.completed) {
        Modal.confirm.info()("Next Step", step1Html, "Got it");
      }

      $scope.continue = function (rec) {
        var firstTimeFinished = true;
        if ($scope.completed === 10) {
          firstTimeFinished = false;
        }

        if ($scope.id == 1 && !$scope.completed) {
          Modal.confirm.info()('Notice&nbsp&nbsp<span class="glyphicon glyphicon glyphicon-info-sign" aria-hidden="true"></span>', '<p>You can always return to previous recommendations and change your selection</p>', "Got it");
        }

        if (!userMovies[$scope.id - 1].choice) {
          Movies.completed++;
          $scope.completed++;
        }


        if (rec) {
          userMovies[$scope.id - 1].choice = rec;
        }
        else {
          userMovies[$scope.id - 1].choice = null;
        }

        if ($scope.id == 10 && firstTimeFinished) {
          Modal.confirm.confirm(function () {
            $scope.finish();
          })("That's it. You Finished", '<p>You can still change your mind to replace your choices if you wish or you can finish.</p>', "Finish");

        }
        else if ($scope.id < 10) {
          $state.go("step2", {recId: parseInt($scope.id) + 1});
        }

      };


      $scope.finish = function () {
        $scope.loading = true;
        $http.post('/api/movies/saveUserExperiment', {withImages: $scope.withImages, res: userMovies})
          .success(function () {
            Modal.confirm.info(function () {
              window.location.assign("http://www.imdb.com");
            })("That's it. You Finished", finishHtml, "Finish");
          })
          .error(function (err) {
            Modal.confirm.info(function () {
              $state.go('step1')
            })("Error", err, "Start from scratch");
          });
      };

      $scope.calcProgress = function () {
        var x = (($scope.completed) * 10).toString();
        return {width: x + '%'};
      };

      $scope.back = function () {
        $state.go('step2', {recId: parseInt($scope.id) - 1})
      }

      $scope.next = function () {
        $state.go('step2', {recId: parseInt($scope.id) + 1})

      }

      $scope.calcWell = function (rec) {
        if (userMovies[$scope.id - 1].choice && userMovies[$scope.id - 1].choice.name === rec.name) {
          return 'row recommend well chosen_rec'
        }
        else {
          return 'row recommend well'
        }
      };
    }

    if (!Movies.alreadyDecided) {
      $http.get('/api/movies/withImages')
        .success(function (res) {
          Movies.withImages = res;
          Movies.alreadyDecided = true;
          afterSuccess()
        })
        .error(function (err) {
          $scope.loading = false;
          Modal.confirm.info(function () {
            $state.go('step1')
          })("Error", err, "Start from scratch");
        });
    }
    else {
      afterSuccess(true);
    }

}])
;

'use strict';

angular.module('recuserstudyApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('step2', {
        url: '/step2/:recId',
        templateUrl: 'app/step2/step2.html',
        controller: 'Step2Ctrl'
      });
  }]);

'use strict';

angular.module('recuserstudyApp')
  .factory('Modal', ["$rootScope", "$modal", function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        backdrop: 'static',
        keyboard: false,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        info: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                title = args.shift(),
                html = args.shift(),
                continueText = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: title,
                html: html,
                buttons: [{
                  classes: 'btn-primary',
                  text: continueText,
                  click: function(e) {
                    deleteModal.dismiss(e);
                    del.apply(event, args);
                  }
                }]
              }
            }, 'modal-primary');

          };
        },

        confirm: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              title = args.shift(),
              html = args.shift(),
              continueText = args.shift(),
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: title,
                html: html,
                buttons: [{
                  classes: 'btn-primary',
                  text: continueText,
                  click: function(e) {
                    deleteModal.dismiss(e);
                    del.apply(event, args);
                  }
                },
                  {
                    classes: 'btn-default',
                    text: 'I want to make changes',
                    click: function(e) {
                      deleteModal.dismiss(e);
                    }
                  }]
              }
            }, 'modal-primary');

          };
        }
      }
    };
  }]);

'use strict';

angular.module('recuserstudyApp')
  .service('Movies', function () {

    var self = this;

    this.all = {
      "0": {
        name: "Kingsman: The Secret Service",
        year: "2014",
        datePublished: "13 February 2015",
        country: "USA",
        length: 129,
        category: "Action | Adventure | Comedy | Crime",
        director: "Matthrew Vaughn",
        actors: "Colin Firth, Taron Egerton, Samuel L. Jackson",
        description: "A spy organization recruits an unrefined, but promising street kid into the agency's ultra-competitive training program, just as a global threat emerges from a twisted tech genius.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTkxMjgwMDM4Ml5BMl5BanBnXkFtZTgwMTk3NTIwNDE@._V1_SY317_CR0,0,214,317_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "1": {
        name: "American Sniper",
        year: "2014",
        datePublished: "16 January 2015",
        country: "USA",
        length: 132,
        category: "Action, Biography, Thriller",
        director: "Clint Eastwood",
        actors: "Bradley Cooper, Sienna Miller, Kyle Gallner",
        description: "Navy SEAL sniper Chris Kyle's pinpoint accuracy saves countless lives on the battlefield and turns him into a legend. Back home to his wife and kids after four tours of duty, however, Chris finds that it is the war he can't leave behind.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTkxNzI3ODI4Nl5BMl5BanBnXkFtZTgwMjkwMjY4MjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "2": {
        name: "Interstellar",
        year: "2014",
        datePublished: "7 November 2014",
        country: "USA",
        length: 169,
        category: "Adventure, Sci-Fi ",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        image: "http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "3": {
        name: "The Lego Movie",
        year: "2014",
        datePublished: "7 February 2014",
        country: "USA",
        length: 100,
        category: "Animation, Adventure, Comedy ",
        director: "Phil Lord, Christopher Miller",
        actors: "Chris Pratt, Will Ferrell, Elizabeth Banks",
        description: "An ordinary Lego construction worker, thought to be the prophesied 'Special', is recruited to join a quest to stop an evil tyrant from gluing the Lego universe into eternal stasis.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "4": {
        name: "Captain America: The Winter Soldier",
        year: "2014",
        datePublished: "4 April 2014",
        country: "USA",
        length: 136,
        category: " Action, Adventure, Sci-Fi",
        director: " Anthony Russo, Joe Russo",
        actors: "Chris Evans, Samuel L. Jackson, Scarlett Johansson",
        description: "As Steve Rogers struggles to embrace his role in the modern world, he teams up with another super soldier, the black widow, to battle a new threat from old history: an assassin known as the Winter Soldier.",
        image: "http://ia.media-imdb.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SY317_CR1,0,214,317_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "5": {
        name: "Dawn of the Planet of the Apes",
        year: "2014",
        datePublished: "11 July 2014",
        country: "USA",
        length: 130,
        category: "Action, Drama, Sci-Fi",
        director: "Matt Reeves",
        actors: "Gary Oldman, Keri Russell, Andy Serkis",
        description: "A growing nation of genetically evolved apes led by Caesar is threatened by a band of human survivors of the devastating virus unleashed a decade earlier.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTgwODk3NDc1N15BMl5BanBnXkFtZTgwNTc1NjQwMjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "6": {
        name: "X-Men: Days of Future Past",
        year: "2014",
        datePublished: "23 May 2014",
        country: "USA",
        length: 132,
        category: "Action, Adventure, Sci-Fi",
        director: "Bryan Singer",
        actors: "Patrick Stewart, Ian McKellen, Hugh Jackman",
        description: "The X-Men send Wolverine to the past in a desperate effort to change history and prevent an event that results in doom for both humans and mutants.",
        image: "http://ia.media-imdb.com/images/M/MV5BMjEwMDk2NzY4MF5BMl5BanBnXkFtZTgwNTY2OTcwMDE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "7": {
        name: "Whiplash",
        year: "2014",
        datePublished: "16 October 2014",
        country: "Israel",
        length: 107,
        category: "Drama, Music",
        director: "Damien Chazelle",
        actors: "Miles Teller, J.K. Simmons, Melissa Benoist",
        description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTU4OTQ3MDUyMV5BMl5BanBnXkFtZTgwOTA2MjU0MjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "8": {
        name: "Selma",
        year: "2014",
        datePublished: "9 January 2015",
        country: "USA",
        length: 128,
        category: "Biography, Drama, History",
        director: "Ava DuVernay",
        actors: "David Oyelowo, Carmen Ejogo, Tim Roth",
        description: "A chronicle of Martin Luther King's campaign to secure equal voting rights via an epic march from Selma to Montgomery, Alabama in 1965.",
        image: "http://ia.media-imdb.com/images/M/MV5BODMxNjAwODA2Ml5BMl5BanBnXkFtZTgwMzc0NjgzMzE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "9": {
        name: "Maleficent",
        year: "2014",
        datePublished: "30 May 2014",
        country: "USA",
        length: 97,
        category: "Action, Adventure, Family",
        director: "Robert Stromberg",
        actors: "Angelina Jolie, Elle Fanning, Sharlto Copley",
        description: "A vengeful fairy is driven to curse an infant princess, only to discover that the child may be the one person who can restore peace to their troubled land.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTQ1NDk3NTk0MV5BMl5BanBnXkFtZTgwMTk3MDcxMzE@._V1_SY317_CR5,0,214,317_AL_.jpg",
        recommend: [1,2,3,4]
      },
      "10": {
        name: "San Andreas",
        year: "2015",
        datePublished: "29 May 2015",
        country: "USA",
        length: 114,
        category: "Action, Drama, Thriller",
        director: "Brad Peyton",
        actors: "Dwayne Johnson, Carla Gugino, Alexandra Daddario",
        description: "In the aftermath of a massive earthquake in California, a rescue-chopper pilot makes a dangerous journey across the state in order to rescue his daughter.",
        image: "http://ia.media-imdb.com/images/M/MV5BNjI4MTgyOTAxOV5BMl5BanBnXkFtZTgwMjQwOTA4NTE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      },
      "11": {
        name: "The Hobbit: The Battle of the Five Armies",
        year: "2014",
        datePublished: "17 December 2014",
        country: "USA",
        length: 144,
        category: "Adventure, Fantasy  ",
        director: "Peter Jackson",
        actors: "Ian McKellen, Martin Freeman, Richard Armitage",
        description: "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.",
        image: "http://ia.media-imdb.com/images/M/MV5BODAzMDgxMDc1MF5BMl5BanBnXkFtZTgwMTI0OTAzMjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }

    };

    this.recommendations = {
      "0": {
        name: "Kingsman: The Secret Service",
        year: "2014",
        datePublished: "13 February 2015",
        country: "USA",
        length: 129,
        category: "Action | Adventure | Comedy | Crime",
        director: "Matthrew Vaughn",
        actors: "Colin Firth, Taron Egerton, Samuel L. Jackson",
        description: "A spy organization recruits an unrefined, but promising street kid into the agency's ultra-competitive training program, just as a global threat emerges from a twisted tech genius.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTkxMjgwMDM4Ml5BMl5BanBnXkFtZTgwMTk3NTIwNDE@._V1_SY317_CR0,0,214,317_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "1": {
        name: "American Sniper",
        year: "2014",
        datePublished: "16 January 2015",
        country: "USA",
        length: 132,
        category: "Action, Biography, Thriller",
        director: "Clint Eastwood",
        actors: "Bradley Cooper, Sienna Miller, Kyle Gallner",
        description: "Navy SEAL sniper Chris Kyle's pinpoint accuracy saves countless lives on the battlefield and turns him into a legend. Back home to his wife and kids after four tours of duty, however, Chris finds that it is the war he can't leave behind.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTkxNzI3ODI4Nl5BMl5BanBnXkFtZTgwMjkwMjY4MjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "2": {
        name: "Interstellar",
        year: "2014",
        datePublished: "7 November 2014",
        country: "USA",
        length: 169,
        category: "Adventure, Sci-Fi ",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        image: "http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "3": {
        name: "The Lego Movie",
        year: "2014",
        datePublished: "7 February 2014",
        country: "USA",
        length: 100,
        category: "Animation, Adventure, Comedy ",
        director: "Phil Lord, Christopher Miller",
        actors: "Chris Pratt, Will Ferrell, Elizabeth Banks",
        description: "An ordinary Lego construction worker, thought to be the prophesied 'Special', is recruited to join a quest to stop an evil tyrant from gluing the Lego universe into eternal stasis.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "4": {
        name: "Captain America: The Winter Soldier",
        year: "2014",
        datePublished: "4 April 2014",
        country: "USA",
        length: 136,
        category: " Action, Adventure, Sci-Fi",
        director: " Anthony Russo, Joe Russo",
        actors: "Chris Evans, Samuel L. Jackson, Scarlett Johansson",
        description: "As Steve Rogers struggles to embrace his role in the modern world, he teams up with another super soldier, the black widow, to battle a new threat from old history: an assassin known as the Winter Soldier.",
        image: "http://ia.media-imdb.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SY317_CR1,0,214,317_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "5": {
        name: "Dawn of the Planet of the Apes",
        year: "2014",
        datePublished: "11 July 2014",
        country: "USA",
        length: 130,
        category: "Action, Drama, Sci-Fi",
        director: "Matt Reeves",
        actors: "Gary Oldman, Keri Russell, Andy Serkis",
        description: "A growing nation of genetically evolved apes led by Caesar is threatened by a band of human survivors of the devastating virus unleashed a decade earlier.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTgwODk3NDc1N15BMl5BanBnXkFtZTgwNTc1NjQwMjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "6": {
        name: "X-Men: Days of Future Past",
        year: "2014",
        datePublished: "23 May 2014",
        country: "USA",
        length: 132,
        category: "Action, Adventure, Sci-Fi",
        director: "Bryan Singer",
        actors: "Patrick Stewart, Ian McKellen, Hugh Jackman",
        description: "The X-Men send Wolverine to the past in a desperate effort to change history and prevent an event that results in doom for both humans and mutants.",
        image: "http://ia.media-imdb.com/images/M/MV5BMjEwMDk2NzY4MF5BMl5BanBnXkFtZTgwNTY2OTcwMDE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "7": {
        name: "Whiplash",
        year: "2014",
        datePublished: "16 October 2014",
        country: "Israel",
        length: 107,
        category: "Drama, Music",
        director: "Damien Chazelle",
        actors: "Miles Teller, J.K. Simmons, Melissa Benoist",
        description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTU4OTQ3MDUyMV5BMl5BanBnXkFtZTgwOTA2MjU0MjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "8": {
        name: "Selma",
        year: "2014",
        datePublished: "9 January 2015",
        country: "USA",
        length: 128,
        category: "Biography, Drama, History",
        director: "Ava DuVernay",
        actors: "David Oyelowo, Carmen Ejogo, Tim Roth",
        description: "A chronicle of Martin Luther King's campaign to secure equal voting rights via an epic march from Selma to Montgomery, Alabama in 1965.",
        image: "http://ia.media-imdb.com/images/M/MV5BODMxNjAwODA2Ml5BMl5BanBnXkFtZTgwMzc0NjgzMzE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }
      ,
      "9": {
        name: "Maleficent",
        year: "2014",
        datePublished: "30 May 2014",
        country: "USA",
        length: 97,
        category: "Action, Adventure, Family",
        director: "Robert Stromberg",
        actors: "Angelina Jolie, Elle Fanning, Sharlto Copley",
        description: "A vengeful fairy is driven to curse an infant princess, only to discover that the child may be the one person who can restore peace to their troubled land.",
        image: "http://ia.media-imdb.com/images/M/MV5BMTQ1NDk3NTk0MV5BMl5BanBnXkFtZTgwMTk3MDcxMzE@._V1_SY317_CR5,0,214,317_AL_.jpg",
        recommend: [1,2,3,4]
      },
      "10": {
        name: "San Andreas",
        year: "2015",
        datePublished: "29 May 2015",
        country: "USA",
        length: 114,
        category: "Action, Drama, Thriller",
        director: "Brad Peyton",
        actors: "Dwayne Johnson, Carla Gugino, Alexandra Daddario",
        description: "In the aftermath of a massive earthquake in California, a rescue-chopper pilot makes a dangerous journey across the state in order to rescue his daughter.",
        image: "http://ia.media-imdb.com/images/M/MV5BNjI4MTgyOTAxOV5BMl5BanBnXkFtZTgwMjQwOTA4NTE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      },
      "11": {
        name: "The Hobbit: The Battle of the Five Armies",
        year: "2014",
        datePublished: "17 December 2014",
        country: "USA",
        length: 144,
        category: "Adventure, Fantasy  ",
        director: "Peter Jackson",
        actors: "Ian McKellen, Martin Freeman, Richard Armitage",
        description: "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.",
        image: "http://ia.media-imdb.com/images/M/MV5BODAzMDgxMDc1MF5BMl5BanBnXkFtZTgwMTI0OTAzMjE@._V1_SX214_AL_.jpg",
        recommend: [1,2,3,4]
      }

    };

    this.user = [];

    this.withImages = null;

    this.alreadyDecided = false;

    this.completed = 0;
  });


angular.module('recuserstudyApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/result/result.html',
    "<header class=hero-unit id=banner><div class=container><h1>Recommendation System User Study!</h1><br><h2>The Results</h2></div></header><div class=\"loading middle\" ng-if=loading><span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span></div><div class=container ng-show=!loading><div class=\"row text-center\"><h2>Total participants: {{stats.total}}</h2></div><div class=\"row results\"><div class=\"col-md-6 text-center\"><h3>Recommendations shown <b>with</b> images</h3><h4>Total participants: {{stats.withImages.total}}</h4><canvas id=pie1 class=\"chart chart-pie\" data=withImages labels=labels legend=true colours=colors></canvas></div><div class=\"col-md-6 text-center\"><h3>Recommendations shown <b>without</b> images</h3><h4>Total participants: {{stats.withoutImages.total}}</h4><canvas id=pie2 class=\"chart chart-pie\" data=withoutImages labels=labels legend=true colours=colors></canvas></div></div></div>"
  );


  $templateCache.put('app/step1/step1.html',
    "<div class=\"container step1\"><div class=\"row text-center\"><h3 ng-show=!userMovies.length>Please pick your favorite movies from the following list</h3><h3 ng-show=\"userMovies.length && userMovies.length < 10\">Please choose {{10 - userMovies.length}} more movies</h3><h3><button class=\"btn btn-primary btn-lg\" ng-show=\"userMovies.length === 10\" ui-sref=step2({recId:1})>Continue to next step&nbsp&nbsp<span class=\"glyphicon glyphicon glyphicon-ok\" aria-hidden=true></span></button></h3><br></div><div class=pick_movies><div class=row><div class=\"col-md-1 text-center\"><button type=button class=\"btn btn-default btn-lg menu_button\" ng-click=left() ng-disabled=!firstIndex><span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=true></span></button></div><div class=\"col-sm-6 col-md-1 no_padding\" ng-repeat=\"movie in movies\" ng-click=addMovie($index)><div ng-class=calcMovie(movie)><img ng-src={{movie.image}} alt={{movie.name}} class=\"intro_image pointer\"><div class=caption><h5><b>{{movie.name}}</b></h5><span class=year>{{movie.year}}</span></div></div></div><div class=\"col-md-1 text-center\"><button type=button class=\"btn btn-default btn-lg menu_button\" ng-click=right() ng-disabled=\"lastIndex === totalMovies\"><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=true></span></button></div></div></div><br><br><div class=row ng-show=userMovies.length><h3 class=text-center>Your choice:</h3><br><div class=\"col-sm-6 col-md-1\"></div><div class=\"col-sm-6 col-md-1 no_padding\" ng-repeat=\"movie in userMovies\" ng-click=removeMovie($index)><div class=thumbnail><img ng-src={{movie.image}} alt={{movie.name}} class=\"intro_image pointer\"><div class=caption><h5><b>{{movie.name}}</b></h5><span class=year>{{movie.year}}</span></div></div></div><div class=\"col-sm-6 col-md-1\"></div></div></div>"
  );


  $templateCache.put('app/step2/step2.html',
    "<div class=\"container step2\"><div class=\"row text-center\"><button class=\"btn btn-default navigate\" ng-show=\"completed > 0\" ng-disabled=\"loading || !completed || id == 1\" ng-click=back()><span class=\"glyphicon glyphicon-arrow-left\" aria-hidden=true></span></button><h3 class=inline>Recommendation {{id}}/10</h3><button class=\"btn btn-default navigate\" ng-show=\"completed > 0\" ng-disabled=\"loading || id > completed || id == 10\" ng-click=next()><span class=\"glyphicon glyphicon-arrow-right\" aria-hidden=true></span></button><div class=progress><div class=\"progress-bar progress-bar-success progress-bar-striped\" role=progressbar aria-valuenow=40 aria-valuemin=0 aria-valuemax=100 ng-style=calcProgress()>Total progress&nbsp&nbsp{{completed}}/10</div></div><br><br></div><div class=loading ng-if=loading><span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span></div><h3 class=\"text-center finish\"><button class=\"btn btn-primary btn-lg\" ng-show=\"completed === 10 && !loading\" ng-click=finish()>Finish&nbsp&nbsp<span class=\"glyphicon glyphicon glyphicon-ok\" aria-hidden=true></span></button></h3><div ng-show=!loading><div ng-class=calcWell(rec) ng-repeat=\"rec in recommendations\"><div class=col-md-4 ng-show=withImages><img ng-src={{rec.image}} alt={{rec.name}} class=img-responsive></div><div class=col-md-8><div class=row><h3 class=inline>{{rec.name}}</h3>&nbsp&nbsp({{rec.year}})</div><div class=row><span>{{rec.length}}&nbspmin</span>&nbsp|&nbsp<span>{{rec.category}}</span>&nbsp|&nbsp<span>{{rec.datePublished}}&nbsp({{rec.country}})</span></div><div class=\"row divider\"></div><div class=\"row description\"><div class=col-md-10>{{rec.description}}</div></div><div class=row><b>Directory:</b><span>&nbsp{{rec.director}}</span></div><div class=row><b>Actors:</b><span>&nbsp{{rec.actors}}</span></div><div class=row><button class=\"btn btn-primary choose_me\" ng-click=continue(rec)>I would like to watch this movie&nbsp&nbsp<span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=true></span></button></div></div></div><br><br><br><div class=\"row text-center\"><button class=\"btn btn-success btn-lg\" ng-click=continue()>Nothing suits me&nbsp&nbsp<span class=\"glyphicon glyphicon-thumbs-down\" aria-hidden=true></span></button></div></div></div>"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=modal-header><h4 ng-if=modal.title ng-bind-html=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat=\"button in modal.buttons\" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>"
  );


  $templateCache.put('components/movies/movies.html',
    "<div class=modal-header><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat=\"button in modal.buttons\" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>"
  );

}]);

