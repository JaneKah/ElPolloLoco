class Chicken extends MovableObject {
    y = 330;
    height = 100;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

   
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500; // Number between 200 and 250;
        this.animate();
        }


    
    animate() {

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        }, 200);
    }

}