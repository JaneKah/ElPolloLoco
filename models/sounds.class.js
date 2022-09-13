class Sounds {
    coin_sound = new Audio('audio/coins_sound.mp3');
    heartbeat_sound = new Audio('audio/heartbeat_sound.mp3');
    bottle_clinking = new Audio('audio/bottle_clinking.mp3');
    chicken_sound = new Audio('audio/chicken_sound.mp3');
    endboss_sound = new Audio('audio/endboss_sound.mp3');
    lost_game_sound = new Audio('audio/lostgame.mp3');
    won_game_sound = new Audio('audio/wongame.mp3')
    smashed_bottle_sound = new Audio('audio/bottle_smash.mp3');

    constructor() {
        this.changeSoundsVolume();
    }

    /**
     * Changes sounds volume
     */
    changeSoundsVolume() {
        if (world) {
            this.coin_sound.volume = 1;
            this.heartbeat_sound.muted = 1;
            this.bottle_clinking.volume = 1;
            this.chicken_sound.volume = 0.5;
            this.endboss_sound.volume = 0.5;
            this.lost_game_sound.volume = 0.5;
            this.won_game_sound.volume = 0.5;
            this.world.character.walking_sound.volume = 0.5;
            this.world.character.hurt_sound.volume = 0.5;
            this.world.character.hop_sound.volume = 0.5;
        }
    }
}