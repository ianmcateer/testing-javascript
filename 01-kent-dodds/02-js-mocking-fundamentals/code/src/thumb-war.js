const utils = require("./utils");

// takes a player one and player 2 a plays thumb war to get a winner and return a winner

function thumbWar(player1, player2) {
    const numberToWin = 2;
    let player1Wins = 0;
    let player2Wins = 0;
    while (player1Wins < numberToWin && player2Wins < numberToWin) {
        const winner = utils.getWinner(player1);
        if (winner === player1) {
            player1Wins++;
        } else if (winner === player2) {
            player2Wins++;
        }
    }
    return player1Wins > player2Wins ? player1 : player2;
}

module.exports = thumbWar;
