class Heart extends DrawableObject {
    width = 60;
    height = 60;
    heart_img = 'img/7_statusbars/3_icons/icon_health.png';

    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.x = 300 + Math.random() * 2000;
        this.y = 80 + Math.random() * 250;
    }
}