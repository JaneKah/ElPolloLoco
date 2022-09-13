class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coinStatus = 0;
    bottlesStatus = 0;
    energyChicken = 0;
    isAlive = true;

    /**
     * 
     * applies gravity to object above ground
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
    * 
    * @returns object above ground
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }


    /**
 * 
 * moving the object to the right
 */
    moveRight() {
        this.x += this.speed;

    }


    /**
 * 
 * moving the object to the left
 */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
 * 
 * moving the object to the faster
 */
    moveFaster() {
        this.x -= this.speed * 10;
    }


    /**
     * 
     * plays animation for an object
     * @param {array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
    * 
    * setting the speedY of an object to 30 and letting it jump
    */
    jump() {
        this.speedY = 30;
    }


    /**
   * 
   * checking if an object is colliding with enemy or the character
   * @param {object} mo 
   * @returns object is colliding with enemy or the character
   */
    isColliding(mo) {
        return (this.x + this.width - this.offsetRight) >= (mo.x + mo.offsetLeft) &&
            (this.x - this.offsetLeft) <= (mo.x + mo.width - mo.offsetRight) &&
            (this.y + this.height - this.offsetBottom) >= (mo.y + mo.offsetTop) &&
            (this.y + this.offsetTop) <= (mo.y + mo.height - mo.offsetBottom);
    }


    /**
   * 
   * reduces the energy of the object and sets
   *  the time of the last hit
   */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
   * 
   * @returns energy of an object to 0
   */
    isDead() {
        return this.energy == 0;
    }


    /**
   * 
   * checking the time passed since the last hit
   */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}