class YouLost extends MovableObject  {

    width;
    height;
    x;
    y;
    IMG_YOULOST = ['img/9_intro_outro_screens/game_over/oh no you lost!.png'];

    constructor(){
        super().loadImage(this.IMG_YOULOST);
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }

}