class MovableObject {
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */

    loadImages(arr) {
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
    }

    moveRight() {
      
    }

    moveLeft() {

    }

  
}