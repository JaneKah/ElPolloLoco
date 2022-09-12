class DrawableObject {
    imageCache = {};
    img;
    currentImage = 0;
    x = 120;
    y = 290;
    height = 150;
    width = 100;
    offsetTop = 0;
    offsetRight = 0;
    offsetBottom = 0;
    offsetLeft = 0;


      /**
     * 
     * loads the first image
     * @param {string} path 
     */

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
 
/**
     * 
     * draws the image
     * @param {CanvasRenderingContext2D} ctx 
     */
       draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

     /**
     * 
     * draws a frame around an object
     */

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}


