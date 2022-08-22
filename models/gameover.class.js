class GameOver extends MovableObject {

    width;
    height;
    x;
    y;

    constructor(){
        super().loadImage('img/9_intro_outro_screens/game_over/game over.png');
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }

}