var assert = require("assert")
var Dice = require("../src/system/dice")

describe('Dice', function() {
    it("should return correct dice", function() {
        var roll = Dice.roll();
        assert(true, roll >= 1 && roll <= 6)
    });
});