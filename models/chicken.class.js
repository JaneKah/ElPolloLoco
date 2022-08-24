class Chicken extends MovableObject {
    y = 330;
    height = 100;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = new Image();
    isHit = false;
    chickenIntervalMovingLeft;
    chickenIntervalWalking;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.IMAGE_DEAD.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

        this.x = 300 + Math.random() * 1500; // Number between 200 and 250;
        
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }



    animate() {
       this.chickenIntervalMovingLeft = setInterval(() => {
            if(this.isAlive) {
            this.moveLeft();
        }
        }, 1000 / 60);
       
        this.chickenIntervalWalking = setInterval(() => {
            if(this.isAlive){
           this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);

    }

}