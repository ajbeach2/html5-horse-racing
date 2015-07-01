var assert = require("assert");
var Game = require('../src/system/game');
var Player = require('../src/assemblage/player');
var Turn = require("../src/system/turn");

describe('Turn', function() {
    var player = Player.create({
        name: 'Bob',
        laneNumber: 1
    });

    player.addModifier('jockey', 'redbull', 10)
    player.addModifier('horse', 'fat', -4)

    describe("winner", function() {
        it('can find winner', function() {
            assert(!Turn.isWinnerWithNextMove(player, 0));
            
            player.get('position').x = Game.finishLine;
            Turn.playerTurn(player);
            assert(Turn.isWinnerWithNextMove(player,0));
        });

        it('sets game state',function(){
            assert(Game.ended);
            assert(Game.winner);
        })
    });

    describe('modifiers', function() {
        it("can calculate modifers", function() {
            var actual =  Turn.getModifiers(player,['jockey','horse']);
            assert.equal(actual, 10 + -4);
        });
    })
});