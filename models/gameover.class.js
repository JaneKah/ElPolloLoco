class GameOver extends MovableObject {

    width;
    height;
    x;
    y;
    IMG_GAMEOVER =[ 'img/9_intro_outro_screens/game_over/game over.png'];

    constructor(){
        super().loadImage(this.IMG_GAMEOVER);
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}