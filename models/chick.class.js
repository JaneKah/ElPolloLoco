class Chick extends MovableObject {
    y = 330;
    height = 100;
    IMAGES_CHICK_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = new Image();
    isHit = false;
    chickIntervalMovingLeft;
    chickIntervalWalking;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICK_WALKING);
        this.IMAGE_DEAD.src = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

        this.x = 300 + Math.random() * 1500;

        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    
    animate() {
        this.chickIntervalMovingLeft = setInterval(() => {
            if (this.isAlive) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.chickIntervalWalking = setInterval(() => {
            if (this.isAlive) {
                this.playAnimation(this.IMAGES_CHICK_WALKING);
            }
        }, 200);
    }
}