function Lane(number, size) {
    this.size = size || 50;
    this.number = number;
    this.y = this.size * this.number;
}
Lane.prototype.name = 'lane';
module.exports = Lane;