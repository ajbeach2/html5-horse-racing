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