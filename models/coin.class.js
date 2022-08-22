class Coin extends MovableObject {

    width = 100;
    height = 100;
    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
];
    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = 300 + Math.random() * 2000;
        this.y = 80 + Math.random() * 250;
        this.animate();
    }

    animate() {       
        setInterval(() => {
           this.playAnimation(this.COIN_IMAGES);
        }, 100);
    }
}