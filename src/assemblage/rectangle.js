//Generic factory for building html5 rectangles

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


