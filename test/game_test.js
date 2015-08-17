var assert = require("assert");
var mock = require("./mocks/document");
var Game = require("../src/system/game");

describe('Game', function() {
    it('gets current player', function() {
        var actualID = Game.getCurrentPlayer(),
            expectedID = Game.players[0];

        assert.deepEqual(expectedID, actualID);
    });

    it('resets players',function(){
        Game.reset();

        for(var i in Game.players){
            var player = Game.players[i],
                position = player.get('position');
            assert.equal(0,position.x);
        }

    });
});