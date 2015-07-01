var Game = require('./game');
var turn = require('./turn');

function addButton(id, callback) {
    var button = document.getElementById(id);
    button.addEventListener("click", callback);
}

function start() {
    if (!Game.started) {
        Game.started = true;
    }
}

function reset() {
    Game.reset();
    playerTurn = 0;
}

function diceRoll() {
    if (!Game.ended) {
        var player = Game.getCurrentPlayer();
        Turn.playerTurn(player);
        Game.playerTurn++;
    }
}

addButton('dice', diceRoll);
addButton('reset', reset);