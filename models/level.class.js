class Level {
    enemies;
    coins;
    clouds;
    hearts;
    bottles;
    world;
    backgroundObjects;
    level_end_x = 2100;

    constructor(enemies, clouds, backgroundObjects, coins, hearts, bottles){
        this.enemies = enemies;
        this.coins = coins;
        this.hearts = hearts;
        this.bottles = bottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}