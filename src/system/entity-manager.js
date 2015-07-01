var Player = require('../assemblage/player');
var Rectangle = require('../assemblage/rectangle');

var EntityManager = {};

EntityManager.sampleMods = {
    "horse": [
      ["steroids", 20],
      ["giant heart", 13],
      ["spirit", 14],
      ["lose horseshoe", -5]
    ],

    "jockey": [
      ["dirt in eye", -2],
      ["red bull", 20],
      ["luck", 17],
      ["shoulder sprain", -5]
    ]
};

EntityManager.randomModifer = function(type) {
    var mods = this.sampleMods[type];
    var index = Math.floor(Math.random() * mods.length);
    return mods[index];
};

EntityManager.players = function(count) {
    var players = [];
    for (var i = 0; i < count; i++) {
        players[i] = Player.create({
            name: "Player_" + i,
            laneNumber: i
        });
        var randMod1 = this.randomModifer('horse');
        var randMod2 = this.randomModifer('jockey');
        players[i].addModifier('horse', randMod1[0], randMod1[1]);
        players[i].addModifier('jockey', randMod2[0], randMod2[1]);
    }
    return players;
};

EntityManager.rectangles = function(count, width, height) {
    var lanes = [];
    for (var i = 0; i < count; i++) {
        lanes[i] = Rectangle.create(1, height * i, height, width, '#68A357');
    }
    return lanes;
};

EntityManager.reset = function(players) {
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        player.components.position.x = 0;
    }
};

module.exports = EntityManager;