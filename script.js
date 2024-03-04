//gameboard (array stored in object)
const Gameboard = {
    gameboard: [
        [null, null, null], //cells start with no value
        [null, null, null],
        [null, null, null]
    ]
};

const container = document.querySelector('.container');

const webBoard = {

    //use row and column attributes set in createNewBoard to playRound when squares are clicked
    handleBoardClick(event) {
        const row = event.target.getAttribute('data-row');
        const column = event.target.getAttribute('data-column');
        gameController.playRound(row, column);
    },

    //create div in DOM for each cell of array
    createNewBoard(row, column) {
        const boardSquare = document.createElement('div');
        boardSquare.classList.add('boardSquare');
        boardSquare.setAttribute('data-row', row); //assign each array cell's row and column numbers to board square
        boardSquare.setAttribute('data-column', column);
        boardSquare.textContent = ''; //set initial text content to value of cell aka null 
        container.appendChild(boardSquare);

        boardSquare.addEventListener('click', this.handleBoardClick);
    },

    createWebBoard() { //loop through each cell in array to create a board square for them
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.createNewBoard(i, j);
            }}
    },

    disableBoard() {
        const boardSquares = document.querySelectorAll('.boardSquare'); //select all board squares in DOM
        boardSquares.forEach(boardSquare => {
            boardSquare.removeEventListener('click', this.handleBoardClick);
            })
        },

    updateWebBoard(row, column) {
        const boardSquare = document.querySelector(`.boardSquare[data-row="${row}"][data-column="${column}"]`)
        boardSquare.textContent = Gameboard.gameboard[row][column];
    }

}

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
        // webBoard.createWebBoard();
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
            webBoard.disableBoard();
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

        webBoard.updateWebBoard(row, column);

        const result = this.checkWin();
        if (result) {
            const winnerAlert = document.querySelector('.winnerAlert');
            winnerAlert.textContent = `${result}!`;
        };

        this.switchPlayerTurn();
    }

}

webBoard.createWebBoard();

const playBtn = document.querySelector('.play')
playBtn.addEventListener('click', (event) => {
    const playerOneName = document.querySelector('#playerOneName').value;
    const playerTwoName = document.querySelector('#playerTwoName').value;
    gameController.initializeGame(playerOneName, 'X', playerTwoName, 'O');
})



// gameController.initializeGame(prompt('player 1: what is your name?'), 'X', prompt('player 2: what is your name?'), 'O');
// console.log(gameController.activePlayer);

