//gameboard
const Gameboard = {
    gameboard: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    showBoard() {
        return this.gameboard;
    }
};

//constructor for making new players
const getNewPlayer = (function() {
    function Player(name, marker) {
        this.name = name;
        this.marker = marker;
    };
    function createPlayer(name, marker) {
        return new Player(name, marker);
    }
    return createPlayer;
})();

const gameController = {

    playerOne: null,
    playerTwo: null,
    activePlayer: null,
    initializeGame(playerOneName, playerOneMarker, playerTwoName, playerTwoMarker) {
        this.playerOne = getNewPlayer(playerOneName, playerOneMarker);
        this.playerTwo = getNewPlayer(playerTwoName, playerTwoMarker);
        this.activePlayer = this.playerOne;
    },

    markCell(row, column) {
        if (Gameboard.gameboard[row][column] === null) {
            Gameboard.gameboard[row][column] = this.activePlayer.marker;
            return true;
        } else {
            return false;
        }
    },

    switchPlayerTurn() {
        if (this.activePlayer === this.playerOne) {
            this.activePlayer = this.playerTwo;
            return this.activePlayer;
        }
        if (this.activePlayer === this.playerTwo) {
            this.activePlayer = this.playerOne;
            return this.activePlayer;
        }
    },

    checkBoard() {
        for (let i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (Gameboard.gameboard[i][j]===null) {
                    return true;
                }
            }
        }
        return false;
    },

    checkWin() {
        const winConditions = [
            // rows
            [[0, 0], [0, 1], [0, 2]], // row 1
            [[1, 0], [1, 1], [1, 2]], // row 2
            [[2, 0], [2, 1], [2, 2]], // row 3
        
            // columns
            [[0, 0], [1, 0], [2, 0]], // column 1
            [[0, 1], [1, 1], [2, 1]], // column 2
            [[0, 2], [1, 2], [2, 2]], // column 3
        
            // diagonals
            [[0, 0], [1, 1], [2, 2]], // top-left to bottom-right diagonal
            [[0, 2], [1, 1], [2, 0]]  // top-right to bottom-left diagonal
        ];
        
        let winner = null;
    
        winConditions.forEach(condition => {
            let [[a,b], [c,d], [e,f]] = condition;
    
            //if all 3 cells have the same marker
            if (Gameboard.gameboard[a][b] === this.playerOne.marker && Gameboard.gameboard[c][d] === this.playerOne.marker && Gameboard.gameboard[e][f] === this.playerOne.marker) {
                winner = this.playerOne;
            }
            if (Gameboard.gameboard[a][b] === this.playerTwo.marker && Gameboard.gameboard[c][d] === this.playerTwo.marker && Gameboard.gameboard[e][f] === this.playerTwo.marker) {
                winner = this.playerTwo;
            }
        });
        if (winner !== null) {
            return `${winner.name} wins`;
        } else {
            return false;
        }
    },

    playRound(row, column) {
        
        //check if any empty cells on gameboard
        if (!this.checkBoard) {
            return "TIE. game over!"
        };

        //check if selected cell is empty
        if (!this.markCell(row, column)) {
            return "invalid, choose another square"
        };

        const result = this.checkWin();
        if (result) {
            return result;
        };

        this.switchPlayerTurn();
        return Gameboard.showBoard();
    }

}

//for testing

gameController.initializeGame('alyssa', 'X', 'yoshi', 'O');
console.log(gameController.activePlayer);

gameController.playRound(1,0)
gameController.playRound(1,1)
gameController.playRound(0,1)
gameController.playRound(0,0)
gameController.playRound(0,2)
// gameController.playRound(2,2)