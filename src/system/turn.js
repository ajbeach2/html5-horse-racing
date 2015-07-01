var Dice = require('./dice');
var Game = require("./game");

Turn = {};

Turn.playerTurn = function(player) {

    var roll = Dice.roll();
    var dice = roll * Game.rollMulti;
    var moveAmount = this.move(player, dice, player.modifiers.types());
    Game.marquee.innerHTML = player.get('name') +
        " has rolled a " + roll +
        " and has " + this.getModifiers(player, player.modifiers.types()) +
        " points from modifiers" + 
        " and moves " + moveAmount + 
        " pixels";
    Game.setPlayerInfo(player);
};

Turn.isWinnerWithNextMove = function(player, nextMove) {
    var position = player.get('position').x;

    if (position + nextMove >= (Game.finishLine) - player.get('width')) {
        return true;
    } else {
        return false;
    }
};

Turn.getModifierTotalByType = function(player, type) {
    var modification_amount = 0;
    var modifiers = player.getModifiers(type);
    for (var key in modifiers) {
        if (modifiers.hasOwnProperty(key)) {
            modification_amount += modifiers[key];
        }
    }
    return modification_amount;
};

Turn.getModifiers = function(player, types) {
    var totalModifiers = 0;
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        if (player.getModifiers(type)) {
            var modAmount = this.getModifierTotalByType(player, type);
            totalModifiers += this.getModifierTotalByType(player, type);
        }
    }
    return totalModifiers;
};

Turn.move = function(player, dice, types) {
    var modifierTypes = types || [];

    var moveAmount = this.getModifiers(player, modifierTypes) + dice;
    if (this.isWinnerWithNextMove(player, moveAmount)) {
        Game.winEvent(player);
    }
    player.components.position.x += moveAmount;

    return moveAmount;
};
module.exports = Turn;