var Game = require('./system/game');
var globals = require('./system/globals');
var Controls = require('./system/controls');
var Render = require(('./system/render'));
var Images = require('./system/image-loader');

var entities = Game.lanes.concat(Game.players);
var gameLoop = function() {
  
    Render.tick(entities);
    frameID = requestAnimFrame(function() {
        gameLoop();
    });

    if (Game.ended) {
        if (Game.winner) {
            Game.setMessage(Game.winner.get('name') + ' is the the winnner!');
        }
    }
};

Images.loadFromEntities(Game.players, gameLoop);

