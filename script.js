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

//users: use constructor to be able to make new players
//for console: will be able to type getNewPlayer('name', 'marker')
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

//gameController
//each player picks a tile aka chooses an empty grid cell to set to their marker
function markCell(player, row, column) {
    if (Gameboard.gameboard[row][column] === null) {
        Gameboard.gameboard[row][column] = player.marker;
        return Gameboard.showBoard();
    } else {
        return false;
    }
};

//switch turns
function switchPlayerTurn() {
    let activePlayer = playerOne;
    if (activePlayer === playerOne) {
        activePlayer = playerTwo;
    }
    if (activePlayer === playerTwo) {
        activePlayer = playerOne;
    }
}

//after each tile is put down, win conditions are checked and turn switches
//loop until win conditions are met or the whole board is filled
//for console purposes, return the gameboard every turn
// playGame 

//check if board is filled/aka tie
function checkBoard() {
    for (i=0; i<2; i++) {
        for (j=0; j<2; j++); {
            if (Gameboard.gameboard[i][j]===null) {
                return true;
            } else {
                return false;
            }
        }
    }
}

//winning conditions
function checkWin() {
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

    winConditions.forEach(condition => {
        let [[a,b], [c,d], [e,f]] = condition;

        //if all 3 cells have the same marker
        if (Gameboard.gameboard[a][b] === Gameboard.gameboard[c][d] && Gameboard.gameboard[a][b] === Gameboard.gameboard[e][f]) {
            if (Gameboard.gameboard[a][b] === playerOne.marker) {
                winner = playerOne;
            };
            if (Gameboard.gameboard[a][b] === playerTwo.marker) {
                winner = playerTwo;
            };
        }
    });
    return `${winner.name} wins`;
}

//for testing

let playerOne = getNewPlayer('alyssa', 'X');
console.log(playerOne);

let playerTwo = getNewPlayer('yoshi', 'O');
console.log(playerTwo);

markCell(playerTwo, 0, 0);
markCell(playerTwo, 0, 1);
markCell(playerTwo, 0, 2);

markCell(playerOne, 1, 0);
markCell(playerOne, 1, 1);
markCell(playerOne, 1, 2);

markCell(playerTwo, 2, 0);
markCell(playerTwo, 2, 1);
markCell(playerTwo, 2, 2);