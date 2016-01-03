app.controller('GameController', ["$scope", function($scope){
    var deck = [];
    $scope.showNewGame = true;

    // creates an array of objects that represents a new deck of cards. 
    // it adds this new ordered deck into deck
    var newDeck = function () {
      // var suits = [ '♥', '♦', '♠', '♣' ];
      var suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];
      var ranks = [ 'ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king' ];
      suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
          deck.push(
            {
              suit: suit,
              rank: rank
            }
          ) 
        }) // END FOR LOOP
      }) // END FOR LOOP
    }() // END FUNCTION

    // is a class function which assigns a unique deck of cards to every instance,
    // and takes as a parameter the number of players in the game (the dealer is another player), 
    // assigning each an empty hand and an empty area where their cards will go 
    // when the cards are played during a game, and where their score or values will be tracked. 
    var Game = function (gameType, players) {
      this.gameType = gameType;
      this.deck = deck.map(function(x){return x});
      $scope.discard = this.discard = [];
      this.players = [];
      if (players !== NaN) {
        for (i = 1 ; i <= players ; i++) {
          this.players[i] = {hand: [], blindCards: [], revealedCards: [], score:0};
        } // END FOR LOOP
      } // END IF
    } // END FUNCTION

    // uses a shuffle algorithm to shuffle the deck of the instance
    // using the Fisher-Yates shuffle algorithm --- totally stolen from the interwebs
    Game.prototype.shuffleDeck = function() {
        var m = this.deck.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
          // And swap it with the current element.
          t = this.deck[m];
          this.deck[m] = this.deck[i];
          this.deck[i] = t;
        } // END FOR LOOP
    } // END FUNCTION

    // draws any number of cards from the top of the deck and puts them
    // in the hand of the chosen player UNLESS there are 0 cards in the deck to draw
    Game.prototype.drawCard = function(numberOfCards, player) {
      if (this.deck.length > 0) {
        for (i = 0 ; i < numberOfCards ; i++) {
            this.players[player].hand.push(this.deck.pop())
        } // END FOR LOOP
      } // END IF
    } // END FUNCTION

    // plays a card from a players hand and places it into inPlay
    Game.prototype.playCard = function(card, player) {
      var currentPlayer = this.players[player];
      currentPlayer.hand.forEach(function (handCard, i) { 
        if (handCard.suit === card.suit && handCard.rank === card.rank) {
          currentPlayer.inPlay.push(currentPlayer.hand.splice(i, 1)[0])
        } // END IF
      }) // END FOR LOOP
    } // END FUNCTION 

    // discards a card object from the player's hand or from 
    // the player's inPlay cards array and places the card in the discard array
    Game.prototype.discardCard = function(card, player, cardLocation) {
      var currentPlayer = this.players[player];

      if (cardLocation === "hand") {
        currentPlayer.hand.forEach(function (handCard, i) { 
          if (handCard.suit === card.suit && handCard.rank === card.rank) {
            $scope.discard.push(currentPlayer.hand.splice(i, 1)[0])
          } // END IF
        }) // END FOR LOOP
      } else if (cardLocation === "inPlay"){
        currentPlayer.inPlay.forEach(function (inPlayCard, i) { 
          if (inPlayCard.suit === card.suit && inPlayCard.rank === card.rank) {
            $scope.discard.push(currentPlayer.inPlay.splice(i, 1)[0])
          } // END IF
        }) // END FOR LOOP
      }
      ; // END IF
    } // END FUNCTION

    // tracks the number of points/score/total each player has
    Game.prototype.changeScore = function(player, number) {
      var currentPlayer = this.players[player];
      if (number !== NaN) {
        currentPlayer.score += number
      } // END IF
    } // END FUNCTION

    // this helper function logs out the locations of important card data
    // it is used for troubleshooting purposes and accessing data in the scope
    Game.prototype.trackCards = function(player) {
      $scope.currentPlayer = this.players[player];
      $scope.currentPlayer.hand.forEach(function(x){console.log(x)})
      console.log($scope.currentPlayer.inPlay, "INPLAY");
      console.log($scope.currentPlayer.score, "SCORE");
      console.log($scope.discard, "DISCARDED");
    } // END FUNCTION

    // $scope.game1 = new Game("Blackjack", 2);

    $scope.setPlayers = function(num) {
      if (num < 5 && num > 0) {
        $scope.showNewGame = false;
        console.log("New game with ",num," players");
        $scope.game = new Game("ShitFace", num);
        console.log($scope.game.players);      
      };
    };

    $scope.dealCards = function() {
      $scope.game.shuffleDeck();
      $scope.game.players.forEach(function (player) {
        for (i = 0 ; i < 3 ; i++) {
          player.blindCards.push(
            $scope.game.deck.shift()
            );
          player.revealedCards.push(
            $scope.game.deck.shift()
            );
        };
      });

    };
   
   
}]) // END CONTROLLER