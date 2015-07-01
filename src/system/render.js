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