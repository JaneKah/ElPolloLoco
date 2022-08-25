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
 

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject){
            return true;
        } else {
        return this.y < 150;
    }
    }

    moveRight() {
        this.x += this.speed;

    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitEndboss() {
        this.energyEndboss -= 5;
        if(this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitChicken() {
        this.energyChicken == 0;
     }
     

    hitByCoins() {
        this.coinStatus += 20;
        if(this.coinStatus > 100) {
            this.coinStatus == 100;
        }
    }

    hitByHeart() {
        this.energy += 20;
        if(this.energy > 100) {
            this.energy == 100;
        }
    }

    hitByBottle() {
        this.bottlesStatus += 20;
        if(this.bottlesStatus > 100) {
            this.bottlesStatus == 100;
        }
    }

    decreaseBottleStatus() {
        this.bottlesStatus -= 20;
        if(this.bottlesStatus < 0) {
            this.bottlesStatus = 0;
        }
    }
   

    isDead() {
        return this.energy == 0;
    }

    endBossIsDead() {
        return this.energyEndboss == 0;
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

  
}