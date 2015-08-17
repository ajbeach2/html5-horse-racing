var EntityManager = require('./entity-manager');

var Game = {};

Game.rollMulti = 10; // roll mutlplier, adde to modifiers to set 
Game.playerCount = 5;
Game.laneSize = 50;
Game.finishLine = 600;
Game.winner = null;
Game.ended = false;
Game.started = false;
Game.playerTurn = 0;
Game.marquee = document.getElementById('marquee');
Game.playerInfo = document.getElementById('player');
Game.canvas = document.getElementById('myCanvas');
Game.context = Game.canvas.getContext('2d');
Game.players = EntityManager.players(Game.playerCount);
Game.lanes = EntityManager.rectangles(Game.playerCount,Game.finishLine,Game.laneSize);

Game.setMessage = function(message) {
    this.marquee.innerHTML = message;
};

Game.playerNumber = function(){
  return this.playerTurn % this.playerCount;
};

Game.getCurrentPlayer = function(){
  var playerNum = this.playerNumber();
  return this.players[playerNum];
};

Game.modiferDisplay = function(entity){
  var modifiers  = {
    "name": entity.get('name'),
    "modifiers": entity.modifiers.data
  };

  return JSON.stringify(modifiers, null, 2);
};

Game.setPlayerInfo = function(entity){
  this.playerInfo.innerHTML = this.modiferDisplay(entity);
};

Game.winEvent = function(player) {
    Game.winner = player;
    Game.ended = true;
};

Game.reset = function() {
    Game.ended = false;
    Game.started = false;
    Game.winner = null;
    Game.playerTurn = 0;
    Game.setMessage("Roll the dice!");
    EntityManager.reset(Game.players);
    this.playerInfo.innerHTML = "";
};

module.exports = Game;