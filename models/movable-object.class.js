class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coinStatus = 0;
    bottlesStatus = 0;
    energyEndboss = 100;
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
        if(this instanceof ThrowableObject){
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
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height
    }

      /**
     * 
     * reduces the energy of the character and sets
     *  the time of the last hit
     */

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

     /**
     * 
     * reduces the energy of the endboss and sets
     *  the time of the last hit
     */

    hitEndboss() {
        this.energyEndboss -= 5;
        if(this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

     /**
     * 
     * reduces the energy of the chicken
     */

    hitChicken() {
        this.energyChicken == 0;
     }
     
      /**
     * 
     * increases status of coins
     */

    hitByCoins() {
        this.coinStatus += 20;
        if(this.coinStatus > 100) {
            this.coinStatus == 100;
        }
    }

      /**
     * 
     * increases status of hearts
     */

    hitByHeart() {
        this.energy += 20;
        if(this.energy > 100) {
            this.energy == 100;
        }
    }

      /**
     * 
     * increases status of bottles
     */

    hitByBottle() {
        this.bottlesStatus += 20;
        if(this.bottlesStatus > 100) {
            this.bottlesStatus == 100;
        }
    }

      /**
     * 
     * decreases status of bottles
     */

    decreaseBottleStatus() {
        this.bottlesStatus -= 20;
        if(this.bottlesStatus < 0) {
            this.bottlesStatus = 0;
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
     *  @returns energy of endboss to 0
     */

    endBossIsDead() {
        return this.energyEndboss == 0;
    }

      /**
     * 
     * checking the time passed since the last hit
     */

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

  
}