// Default sprite is a horse

function Sprite(options) {
    var opts = options || {};
    this.image = opts.image || 'horse.png';
    this.width = opts.width || 80;
    this.height = opts.height || 80;
    this.offset = opts.offset || 160;
}

Sprite.prototype.name = 'sprite';
module.exports = Sprite;