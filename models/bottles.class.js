class Bottles extends DrawableObject {
    width = 60;
    height = 60;
    y = 360;
    bottle_img = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';

    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 1500; 
    }
}