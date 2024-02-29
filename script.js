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

//for testing
let playerOne = getNewPlayer('alyssa', 'X');
console.log(playerOne);

let playerTwo = getNewPlayer('yoshi', 'O');
console.log(playerTwo);

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

//choose spot on game board
//winning conditions
function checkWinnn(player) {
    const winConditions = [
            // Rows
            [[0, 0], [0, 1], [0, 2]], // Row 1
            [[1, 0], [1, 1], [1, 2]], // Row 2
            [[2, 0], [2, 1], [2, 2]], // Row 3
        
            // Columns
            [[0, 0], [1, 0], [2, 0]], // Column 1
            [[0, 1], [1, 1], [2, 1]], // Column 2
            [[0, 2], [1, 2], [2, 2]], // Column 3
        
            // Diagonals
            [[0, 0], [1, 1], [2, 2]], // Top-left to bottom-right diagonal
            [[0, 2], [1, 1], [2, 0]]  // Top-right to bottom-left diagonal
        ];
}

markCell(playerTwo, 0, 0);
markCell(playerTwo, 1, 1);
markCell(playerTwo, 2, 2);

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
function checkWin(a, b, c, d, e, f) {



    //if all 3 cells have the same marker
    if (Gameboard.gameboard[a][b] === Gameboard.gameboard[c][d] && Gameboard.gameboard[a][b] === Gameboard.gameboard[e][f]) {
        if (Gameboard.gameboard[a][b] === playerOne.marker) {
            return `${playerOne.name} wins`;
        };
        if (Gameboard.gameboard[a][b] === playerTwo.marker) {
            return `${playerTwo.name} wins`;
        };
    }
}



if (Gameboard.gameboard[0][0] && Gameboard.gameboard[1][1] && Gameboard.gameboard[2][2] === 'X') {
    console.log('playerOne wins');
}

//Gameboard.gameboard[0][0] === Gameboard.gameboard[1][1] && Gameboard.gameboard[0][0] === Gameboard.gameboard[2][2]