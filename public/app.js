(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Entity = require('../entity');
var Position = require('../component/position');
var Lane = require(('../component/lane'));
var Sprite = require(('../component/sprite'));

var create = function(options) {
    var opts = options || {},
        entity = new Entity(),
        lane = new Lane(opts.laneNumber),
        height = opts.height || 40,
        width = opts.width || 40,
        laneOffset = (lane.size - height) / 2;

    entity.addKeyValue("name", opts.name);
    entity.addKeyValue("width", width);
    entity.addKeyValue("height", height);

    entity.addComponent(lane);
    entity.addComponent(new Position(0, lane.y + laneOffset));
    entity.addComponent(new Sprite());
    return entity;
};

module.exports.create = create;
},{"../component/lane":3,"../component/position":5,"../component/sprite":6,"../entity":7}],2:[function(require,module,exports){
var Entity = require('../entity');
var Position = require('../component/position');

var create = function(x, y, height, width, fillstyle) {
    var entity = new Entity();
    entity.addComponent(new Position(x,y));
    entity.addKeyValue("fillstyle", fillstyle);
    entity.addKeyValue("width", width);
    entity.addKeyValue("height", height);
    return entity;
};

module.exports.create = create;



},{"../component/position":5,"../entity":7}],3:[function(require,module,exports){
function Lane(number, size) {
    this.size = size || 50;
    this.number = number;
    this.y = this.size * this.number;
}
Lane.prototype.name = 'lane';
module.exports = Lane;
},{}],4:[function(require,module,exports){
function Modifiers() {
    this.data = {};
}
Modifiers.prototype = {
    addModifier: function(type, key, value) {
        if(!this.data[type]){
            this.data[type] = {};
        }
        this.data[type][key] = value;
    },
    getValues: function(type){
        return this.data[type];
    },
    deleteModifer: function(type,key) {
        delete this.data[type][key];
    },
    types: function(){
        return Object.keys(this.data);
    }
};

Modifiers.prototype.name = 'modifiers';
module.exports = Modifiers;
},{}],5:[function(require,module,exports){
function Position(x, y, lane) {
    this.x = x;
    this.y = y;
}

Position.prototype.name = 'position';
module.exports = Position;
},{}],6:[function(require,module,exports){
function Sprite(options) {
    var opts = options || {};
    this.image = opts.image || 'horse.png';
    this.width = opts.width || 80;
    this.height = opts.height || 80;
    this.offset = opts.offset || 160;
}

Sprite.prototype.name = 'sprite';
module.exports = Sprite;
},{}],7:[function(require,module,exports){
var Modifiers = require(('./component/modifiers'));

function Entity() {
    Entity.count = (Entity.count || 0) + 1;
    this.id = (+new Date()).toString() + Entity.count;
    this.components = {};
    this.modifiers =  new Modifiers();
}

Entity.prototype = {
    addComponent: function(component) {
        this.components[component.name] = component;
    },
    addKeyValue: function(key, value){
        this.components[key] = value;
    },
    removeComponent: function(componentName) {
        var name = componentName;
        delete this.components[name];
    },
    get: function(name){
        return this.components[name];
    },
    getModifiers: function(type) {
        return this.modifiers.getValues(type);
    },
    addModifier: function(type, key, value){
        this.modifiers.addModifier(type,key,value);
    },
    hasComponent: function(name) {
        return this.components.hasOwnProperty(name);
    }
};
module.exports = Entity;
},{"./component/modifiers":4}],8:[function(require,module,exports){
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


},{"./system/controls":9,"./system/game":12,"./system/globals":13,"./system/image-loader":14,"./system/render":15}],9:[function(require,module,exports){
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
},{"./game":12,"./turn":16}],10:[function(require,module,exports){
module.exports.roll = function(){
  return Math.floor(Math.random() * 6) + 1;
};

},{}],11:[function(require,module,exports){
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
},{"../assemblage/player":1,"../assemblage/rectangle":2}],12:[function(require,module,exports){
var EntityManager = require('./entity-manager');

var Game = {};

Game.rollMulti = 10;
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
},{"./entity-manager":11}],13:[function(require,module,exports){
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
},{}],14:[function(require,module,exports){
//http://stackoverflow.com/questions/8682085/can-i-sync-up-multiple-image-onload-calls

var ImageLoader = {};

ImageLoader.init = function(imagePaths, callback) {
    this.imagePaths = imagePaths;
    this.imageCount = 0;
    this.imageLoadedCount = 0;
    this.images = {};
    this.loadImages(callback);
};

ImageLoader.loadFromEntities = function(entites,callback){
  var images = [];
  for(var i = 0; i < entites.length; i++){
    var entity = entites[i];
    if(entity.hasComponent('sprite')){
      var sprite = entity.get('sprite');
      images.push(sprite.image);
    }
  }
  this.init(images,callback);
};

ImageLoader.get = function(path){
  return this.images[path];
};

ImageLoader.loadImages = function(callback) {
    for (var i = 0; i < this.imagePaths.length; i++) {
        var imagePath = this.imagePaths[i];
        if(this.images[imagePath])
          continue;
        this.imageCount++;
        this.images[imagePath] = new Image();
        this.images[imagePath].src = imagePath;
        this.images[imagePath].onload = this.imageCollector(callback);
    }

};

ImageLoader.imageCollector = function(callback) {
    var that = this;
    return function() {
        if (++that.imageLoadedCount == that.imageCount) {
            callback();
        }
    };
};

module.exports = ImageLoader;
},{}],15:[function(require,module,exports){
var Game = require('./game'),
    canvas = Game.canvas,
    context = Game.context;

var Images = require('./image-loader');
var Render = {};

Render.finishLine = function() {
    var boxSize = 25,
        finishSize = 100,
        rows = canvas.height / boxSize,
        columns = finishSize / boxSize;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {

            if (context.fillStyle == '#000000')
                context.fillStyle = 'white';
            else context.fillStyle = '#000000';
            context.fillRect(boxSize * j + Game.finishLine, boxSize * i, boxSize, boxSize);
        }
        if (context.fillStyle == '#000000')
            context.fillStyle = 'white';
        else context.fillStyle = '#000000';
    }
};

Render.sprite = function(entity) {
    var sprite = entity.get('sprite'),
        image = Images.get(sprite.image);

    context.drawImage(
        image,
        sprite.width,
        sprite.offset,
        sprite.width,
        sprite.height,
        entity.get('position').x,
        entity.get('position').y,
        entity.get('width'),
        entity.get('height')
    );
};

Render.tick = function(entities) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.finishLine();

    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i],
            position = entity.get('position'),
            y = position.y,
            x = position.x,
            fillstyle = entity.get('fillstyle') || "yellow";
        if (entity.hasComponent('sprite')) {
            this.sprite(entity);
        } else {
            context.beginPath();
            context.rect(x, y, entity.get('width'), entity.get('height'));
            context.fillStyle = fillstyle;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.stroke();
        }
    }
};

module.exports = Render;
},{"./game":12,"./image-loader":14}],16:[function(require,module,exports){
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
},{"./dice":10,"./game":12}]},{},[8]);
