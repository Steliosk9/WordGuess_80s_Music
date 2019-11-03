// Creating a giant wordGuessGame object that will house all of our logic and variables.
var wordGuessGame = {

    // Object of all words that can be chosen, along with info such as their picture and a song clip.
    wordsToPick: {
      genesis: {
        picture: "genesis.jpg",
        song: "Illegal Alien",
        preview: "https://p.scdn.co/mp3-preview/b29a2b925b9654e0efaaff37504fd234307e0ad8"
      },
      madonna: {
        picture: "madonna.jpg",
        song: "Material Girl",
        preview: "https://p.scdn.co/mp3-preview/5ff7f7b7d2af1a747da275bed3c49054c01b5b1c"
      },
      toto: {
        picture: "toto.jpg",
        song: "Rosanna",
        preview: "https://p.scdn.co/mp3-preview/7cef811eaeb7c7b98245750e73d9d68e9008f317"
      },
      queen: {
        picture: "queen.jpg",
        song: "Princes of the Universe",
        preview: "https://p.scdn.co/mp3-preview/b84f24300476f3d3f20056d2388cc51db2e3891f"
      },
      u2: {
        picture: "u2.jpg",
        song: "With or Without You",
        preview: "https://p.scdn.co/mp3-preview/28365dff1890075c1371628371cd0e5bbff9a3a3"
      },
      metallica: {
        picture: "metallica.jpg",
        song: "Master of Puppets",
        preview: "https://p.scdn.co/mp3-preview/60e6f8dab43f176dd9fb5e795d4e6459bad52e9e"
      },
      journey: {
        picture: "journey.jpg",
        song: "Don't Stop Believin'",
        preview: "https://p.scdn.co/mp3-preview/21b9abd3cd2eea634e17a917196fdd5ba2e82670"
      },
      inxs: {
        picture: "inxs.jpg",
        song: "Need You Tonight",
        preview: "https://p.scdn.co/mp3-preview/61b17a335d5afc1c4086b1b08e2400f0da147977"
      },
      poison: {
        picture: "poison.jpg",
        song: "Fallen Angel",
        preview: "https://p.scdn.co/mp3-preview/0365ad1f152f1834b42b857c4625191cebf9f987"
      },
      rush: {
        picture: "rush.jpg",
        song: "Limelight",
        preview: "https://p.scdn.co/mp3-preview/154987dfb07f2fc5ed7aa4d76b80c5dc08ff4d6b"
      },
      blondie: {
        picture: "blondie.jpg",
        song: "Call Me",
        preview: "https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90"
      }
    },

    wordInPlay: null,
    lettersOfTheWord: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,

      // The setupGame method is called when the page first loads.
  setupGame: function() {
    // Here we pick a random word.
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

    // Split the chosen word up into its individual letters.
    this.lettersOfTheWord = this.wordInPlay.split("");
    // Builds the representation of the word we are trying to guess and displays it on the page.
    // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
    this.rebuildWordView();
    // This function sets the number of guesses the user gets, and renders it to the HTML.
    this.processUpdateTotalGuesses();
  },

    // This function is run whenever the user guesses a letter..
    updatePage: function(letter) {
        // If the user has no guesses left, restart the game.
        if (this.guessesLeft === 0) {
          this.restartGame();
        }
        // Otherwise...
        else {
          // Check for and handle incorrect guesses.
          this.updateGuesses(letter);
    
          // Check for and handle correct guesses.
          this.updateMatchedLetters(letter);
    
          // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
          this.rebuildWordView();
    
          // If the user wins, restart the game.
          if (this.updateWins() === true) {
            this.restartGame();
          }
        }
      },

      // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
  updateGuesses: function(letter) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      // Add the letter to the guessedLetters array.
      this.guessedLetters.push(letter);

      // Decrease guesses by one.
      this.guessesLeft--;

      // Update guesses remaining and guesses letters on the page.
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },