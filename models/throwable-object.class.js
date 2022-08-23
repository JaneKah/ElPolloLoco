class ThrowableObject extends MovableObject {
    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]
    smashed_bottle_sound = new Audio('audio/bottle_smash.mp3');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.throw();
        this.animate();
    }


    throw() {
        let turnedAround;
        this.speedY = 20;
        this.applyGravity();
        this.smashed_bottle_sound.play();

        if (world.character.otherDirection) {
            turnedAround = true;
        }

        setInterval(() => {
            if (this.isAboveGround()) {
                if (!turnedAround) {
                    this.x += 10;
                } else {
                    this.x -= 10;
                }
            }
        }, 1000 / 50);
    }



    animate() {       
        setInterval(() => {
           this.playAnimation(this.BOTTLE_IMAGES);
        }, 120);
    }

}