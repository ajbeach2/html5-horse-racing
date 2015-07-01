var assert = require("assert")
Image = require("./mocks/image-mock");
var ImageLoader = require("../src/system/image-loader");
var Player = require('../src/assemblage/player')


describe('ImageLoader', function() {

    var player1 = Player.create({
            name: "Bob",
            laneNumber: 1,
        }),

        player2 = Player.create({
            name: "Alice",
            laneNumber: 2,
        }),
        players = [player1, player2];

    it('should callback when images loaded', function() {
        var playerImage = player1.get('sprite').image;
        var called = false;
        var callback = function() {
            called = true;
        }
            //simulate on load events
        ImageLoader.loadFromEntities(players, callback);
        ImageLoader.images[playerImage].onload();
        assert(called);
    });

    it('should not load the same image twice', function(){
       assert.equal(1,ImageLoader.imageCount);
       assert.equal(1,ImageLoader.imageLoadedCount);
   });
});