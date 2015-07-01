function Position(x, y, lane) {
    this.x = x;
    this.y = y;
}

Position.prototype.name = 'position';
module.exports = Position;