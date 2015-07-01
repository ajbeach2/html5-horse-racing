var assert = require("assert")
var doucmentMock = require("./mocks/document");
var Player = require('../src/assemblage/player');

var entity = Player.create({
    name: "Bob",
    laneNumber: 0,
    width: 32,
    height: 11
});

describe('Player', function() {

    it('should have name', function() {
        assert.equal("Bob", entity.get('name'));
    });

    it('should have height and width', function() {
        assert.equal(32, entity.get('width'));
        assert.equal(11, entity.get('height'));
    })

    it('has lane', function() {
        assert(true, entity.hasComponent('lane'));
    })

    it('has position with lane offset', function() {
        var lane = entity.get('lane'),
            correctY = (lane.size - entity.get('height') / 2) + lane.y,
            correctX = 0;

        assert(entity.hasComponent('position'));
        assert.equal(0, entity.get('position').x);
        assert(correctY, entity.get('position').y);
    })


    it('hassprite', function() {
        assert(true, entity.hasComponent('sprite'));
    })
});