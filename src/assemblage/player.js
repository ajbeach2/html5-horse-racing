// Factory for building player entities
// By default players have a 'horse' sprite

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