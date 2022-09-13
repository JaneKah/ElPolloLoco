class Character extends MovableObject {

    height = 280;
    width = 150;
    y = 80;
    speed = 10;
    offsetTop = 160;
    offsetLeft = 30;
    offsetRight = 30;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    characterMovingInterval;
    characterAnimationInterval;
    level = level1;
    walking_sound = new Audio('audio/running.mp3');
    hurt_sound = new Audio('audio/hurt_sound.mp3');
    hop_sound = new Audio('audio/hop_sound.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.characterMovingInterval = setInterval(() => {
            this.makeCharacterWalk();
        }, 1000 / 60);

        this.characterAnimationInterval = setInterval(() => {
            this.playAnimationOfCharacter();
        }, 50);
    }

    makeCharacterWalk() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.walking_sound.play();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.walking_sound.play();
            this.otherDirection = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.hop_sound.play();
        }
        this.world.camera_x = -this.x + 100;
    }

    playAnimationOfCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        }
        else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurt_sound.play();
        }
        else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }


    jump() {
        this.speedY = 30;
    }

    /**
* 
* decreases status of bottles
*/

    decreaseBottleStatus() {
        this.bottlesStatus -= 7;
        if (this.bottlesStatus < 0) {
            this.bottlesStatus = 0;
        }
    }

    /**
* 
* increases status of coins
*/

    collectedCoins() {
        this.coinStatus += 20;
        if (this.coinStatus > 100) {
            this.coinStatus == 100;
        }
    }

    /**
   * 
   * increases status of hearts
   */

    collectedHeart() {
        this.energy += 20;
        if (this.energy > 100) {
            this.energy == 100;
        }
    }

    /**
   * 
   * increases status of bottles
   */

    collectedBottle() {
        this.bottlesStatus += 7;
        if (this.bottlesStatus > 100) {
            this.bottlesStatus == 100;
        }
    }
}