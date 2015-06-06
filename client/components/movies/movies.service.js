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

