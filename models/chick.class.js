class Chick extends MovableObject {
    y = 330;
    height = 100;

    IMAGES_CHICK_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGE_CHICK_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

   


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICK_WALKING);
        this.loadImage(this.IMAGE_CHICK_DEAD);

        this.x = 300 + Math.random() * 1500; // Number between 200 and 400;
        
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }



    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
       
        setInterval(() => {
           this.playAnimation(this.IMAGES_CHICK_WALKING);
        }, 200);
    }
    
}