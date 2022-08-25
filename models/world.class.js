class World {
    character = new Character();
    enemies = level1.enemies;
    coins = level1.coins;
    hearts = level1.hearts;
    bottles = level1.bottles;
    clouds = level1.clouds;
    backroundObjects = level1.backgroundObjects;
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    endBoss = this.level.enemies.find(e => e instanceof Endboss);
    gameOver = new GameOver();
    youLost = new YouLost();
    coinBar = new CoinBar();
    sounds = new Sounds();
    endbossBar = new EndbossBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    intervals = [];
    runInterval;
    gameIsOver = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.pushIntervalsToArray();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkChickenHit();
            this.checkCollisionWithEndboss();
            this.checkIsEndbossNear();
        }, 200);
    }

    pushIntervalsToArray() {
        this.intervals.push(this.runInterval);
        this.intervals.push(this.character.characterMovingInterval);
        this.intervals.push(this.character.characterAnimationInterval);
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.intervals.push(this.level.enemies[i].chickenIntervalMovingLeft);
            this.intervals.push(this.level.enemies[i].chickenIntervalWalking);
            this.intervals.push(this.level.enemies[i].chickIntervalMovingLeft);
            this.intervals.push(this.level.enemies[i].chickIntervalWalking);
            this.intervals.push(this.level.enemies[i].endbossIntervalWalking);
        }
    }




    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottlesStatus > 20) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.decreaseBottleStatus();
            this.bottleBar.setPercentage(this.character.bottlesStatus);
        }
    }


    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && enemy.isAlive) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        this.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.hitByCoins();
                this.coinBar.setPercentage(this.character.coinStatus);
                this.sounds.coin_sound.play();
                let coinAmount = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinAmount, 1);
            }
        });
        this.hearts.forEach((heart) => {
            if (this.character.isColliding(heart)) {
                this.character.hitByHeart();
                this.statusBar.setPercentage(this.character.energy);
                this.sounds.heartbeat_sound.play();
                let heartAmount = this.level.hearts.indexOf(heart);
                this.level.hearts.splice(heartAmount, 1);
            }
        });
        this.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.hitByBottle(); //if hit by bottle, bottle status will be increased
                this.bottleBar.setPercentage(this.character.bottlesStatus);
                this.sounds.bottle_clinking.play();
                let bottleAmount = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottleAmount, 1);
            }
        });
    }

    checkCollisionWithEndboss() {
        this.throwableObjects.forEach((object) => {
            if (this.endBoss.isColliding(object)) {
                this.decreaseHealthOfEndboss();
                this.sounds.endboss_sound.play();
            }
        });
    }

    decreaseHealthOfEndboss() {
        this.endBoss.hitEndboss();
        this.endbossBar.setPercentage(this.endBoss.energyEndboss);
    }


    checkIsEndbossNear() {
        if (this.character.x > 2000) {
            this.endBoss.isNear = true;
        }
    }

    checkChickenHit() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];

            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    if (enemy instanceof Chicken || enemy instanceof Chick) {
                        this.killEnemy(enemy);
                    }
                }
            })
        }

        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                if (enemy instanceof Chicken || enemy instanceof Chick) {
                    this.killEnemy(enemy);
                }
            }
        })
    }

    killEnemy(enemy) {
        enemy.isHit = true;
        enemy.isAlive = false;

        if (enemy instanceof Chicken || enemy instanceof Chick) {
            enemy.img = enemy.IMAGE_DEAD;
            this.sounds.chicken_sound.play();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        this.addObjectsToMap(this.backroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.endBoss.isNear == true) {
            this.addToMap(this.endbossBar);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.addDrawableObjectsToMap();

        this.ctx.translate(-this.camera_x, 0);

        this.checkGameOver();

        // draw() will be repeated
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkGameOver() {
        if (this.character.isDead()) {
            this.addToMap(this.youLost);
            this.sounds.lost_game_sound.play();
            this.clearAllIntervals();
            this.gameIsOver = true;
            this.reloadIfGameOver();
        } else if (this.endBoss.endBossIsDead()) {
            this.addToMap(this.gameOver);
            this.sounds.won_game_sound.play();
            this.clearAllIntervals();
            this.gameIsOver = true;
            this.reloadIfGameOver();
        }
    }

  

    reloadIfGameOver() {
        if (this.gameIsOver == true) {
            document.getElementById('canvas').addEventListener("click", this.restartGame);
        }
    }

    restartGame() {
        location.reload();
    }

    clearAllIntervals() {
        for (let i = 0; i < this.intervals.length; i++) {
            clearInterval(this.intervals[i]);
        }
    }



    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    addDrawableObjectsToMap() {
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.hearts);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    muteSounds()  {
        this.sounds.coin_sound.muted = true;
        this.sounds.heartbeat_sound.muted = true;
        this.sounds.bottle_clinking.muted = true;
        this.sounds.chicken_sound.muted = true;
        this.sounds.endboss_sound.muted = true;
        this.sounds.lost_game_sound.muted = true;
        this.sounds.won_game_sound.muted = true;
        this.character.walking_sound.muted = true;
        this.character.hurt_sound.muted = true;
        this.character.hop_sound = true;
    }

    playSounds() {
        this.sounds.coin_sound.muted = false;
        this.sounds.heartbeat_sound.muted = false;
        this.sounds.bottle_clinking.muted = false;
        this.sounds.chicken_sound.muted = false;
        this.sounds.endboss_sound.muted = false;
        this.sounds.lost_game_sound.muted = false;
        this.sounds.won_game_sound.muted = false;
        this.character.walking_sound.muted = false;
        this.character.hurt_sound.muted = false;
        this.character.hop_sound = false;
    }
}