class World {
    character = new Character();
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
    throwableObject = new ThrowableObject();
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

    // sets the world of the character to this world
    setWorld() {
        this.character.world = this;
    }


    /**
     * checks all collision of character with objects
     *  and enemies while running
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkChickenHit();
            this.checkCollisionWithEndboss();
            this.checkIsEndbossNear();
            this.sounds.changeSoundsVolume();
        }, 200);
    }


    // pushes all set intervals into an array
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


    /**
   * checks if bottle is thrown, if yes, 
   * it decreases status of bottlebar
   */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottlesStatus > 20) {
            this.sounds.smashed_bottle_sound.pause();
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.sounds.smashed_bottle_sound.volume = 0.2;
            this.sounds.smashed_bottle_sound.play();
            this.character.decreaseBottleStatus();
            this.bottleBar.setPercentage(this.character.bottlesStatus);
        }
    }


    //calls out all functions of collisions
    checkCollisions() {
        this.checkCollisionWithEnemies();
        this.checkCollisionWithCoins();
        this.checkCollisionWithHearts();
        this.checkCollisionWithBottles();
    }


    // checks if bottles can be collected
    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectedBottle(); //if hit by bottle, bottle status will be increased
                this.bottleBar.setPercentage(this.character.bottlesStatus);
                this.sounds.bottle_clinking.play();
                let bottleAmount = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottleAmount, 1);
            }
        });
    }


    //checks if hearts can be collected
    checkCollisionWithHearts() {
        this.level.hearts.forEach((heart) => {
            if (this.character.isColliding(heart)) {
                this.character.collectedHeart();
                this.statusBar.setPercentage(this.character.energy);
                this.sounds.heartbeat_sound.play();
                let heartAmount = this.level.hearts.indexOf(heart);
                this.level.hearts.splice(heartAmount, 1);
            }
        });
    }


    /**
   * checks if enemy is colliding with character, if yes
   * it decreases the energy of the character
   */
    checkCollisionWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && enemy.isAlive) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
   * checks if bottle collids with endboss, if yes,
   * it call the function out to decrease healthstatus of endboss
   */
    checkCollisionWithEndboss() {
        this.throwableObjects.forEach((object) => {
            if (this.endBoss.isColliding(object)) {
                this.decreaseHealthOfEndboss();
                this.sounds.endboss_sound.play();
            }
        });
    }

    
    // checks if coins can be collected
    checkCollisionWithCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectedCoins();
                this.coinBar.setPercentage(this.character.coinStatus);
                this.sounds.coin_sound.play();
                let coinAmount = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinAmount, 1);
            }
        });
    }


    // decreases status of healthbar of endboss
    decreaseHealthOfEndboss() {
        this.endBoss.hit();
        this.endbossBar.setPercentage(this.endBoss.energy);
    }

    // checks if endboss is near the character
    checkIsEndbossNear() {
        if (this.character.x > 2000) {
            this.endBoss.isNear = true;
        }
    }

    /**
    * checks if chicken is hit by bottle or the character, if yes
    * it calls function out to kill enemy
    */
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

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                if (enemy instanceof Chicken || enemy instanceof Chick) {
                    this.killEnemy(enemy);
                }
            }
        })
    }

    /**
  * 
  * shows the dead picture of an enemy and adds sounds to enemy when killed
  * @param {object} enemy 
  */

    killEnemy(enemy) {
        enemy.isHit = true;
        enemy.isAlive = false;

        if (enemy instanceof Chicken || enemy instanceof Chick) {
            enemy.img = enemy.IMAGE_DEAD;
            this.sounds.chicken_sound.play();
        }
    }

    // draws all the elements on the canvas
    draw() {
        this.addMobileButtons();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.addStatusBars();
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

    // add status bars to the map
    addStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.endBoss.isNear == true) {
            this.addToMap(this.endbossBar);
        }
    }

    //adds mobile buttons when inner width of window is under 1000
    addMobileButtons() {
        if (window.innerWidth < 1000) {
            document.getElementById('mobile-buttons-container').classList.remove('d-none');
        } else {
            document.getElementById('mobile-buttons-container').classList.add('d-none');
        }
    }

    //checks if game is over
    checkGameOver() {
        if (this.character.isDead()) {
            this.addToMap(this.youLost);
            document.getElementById('restart-btn').classList.remove('d-none');
            this.playLostGameSound();
            this.clearAllIntervals();
            this.gameIsOver = true;
            this.reloadIfGameOver();
        } else if (this.endBoss.isDead()) {
            this.addToMap(this.gameOver);
            document.getElementById('restart-btn').classList.remove('d-none');
            this.playWonGameSound();
            this.clearAllIntervals();
            this.gameIsOver = true;
            this.reloadIfGameOver();
        }
    }

    // play sound when game is lost
    playLostGameSound() {
        if (!this.gameIsOver) {
            this.sounds.lost_game_sound.play();
        }
    }

    // play sound when game is won
    playWonGameSound() {
        if (!this.gameIsOver) {
            this.sounds.won_game_sound.play();
        }
    }

    // calls the function out to restart the game when there is onclick on canvas
    reloadIfGameOver() {
        if (this.gameIsOver == true) {
            document.getElementById('canvas').addEventListener("click", this.restartGame);
            document.getElementById('restart-btn').addEventListener("click", this.restartGame);
        }
    }

    // reloads the page and comes back to intro
    restartGame() {
        location.reload();
    }

    // clears all set intervals to stop the motion of all characters
    clearAllIntervals() {
        for (let i = 0; i < this.intervals.length; i++) {
            clearInterval(this.intervals[i]);
        }
    }

    /**
     * 
     * adds each object of an array to the canvas
     * @param {Array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * 
    * adds a single object to the map
    * @param {object} mo 
    */
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


    // adds all objects from level1.js on the canvas
    addDrawableObjectsToMap() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
   * 
   * flips the image to the left
   * @param {object} mo 
   */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
  * 
  * flips the image to the right
  * @param {object} mo 
  */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    // mute all sounds
    muteSounds() {
        this.sounds.heartbeat_sound.muted = true;
        this.sounds.bottle_clinking.muted = true;
        this.sounds.chicken_sound.muted = true;
        this.sounds.endboss_sound.muted = true;
        this.sounds.lost_game_sound.muted = true;
        this.sounds.coin_sound.muted = true;
        this.sounds.won_game_sound.muted = true;
        this.character.walking_sound.muted = true;
        this.character.hurt_sound.muted = true;
        this.character.hop_sound.muted = true;
        this.sounds.smashed_bottle_sound.muted = true;
    }

    //play all sounds
    playSounds() {
        this.sounds.coin_sound.muted = false;
        this.sounds.heartbeat_sound.muted = false;
        this.sounds.bottle_clinking.muted = false;
        this.sounds.chicken_sound.muted = false;
        this.sounds.coin_sound.muted = false;
        this.sounds.endboss_sound.muted = false;
        this.sounds.lost_game_sound.muted = false;
        this.sounds.won_game_sound.muted = false;
        this.character.walking_sound.muted = false;
        this.character.hurt_sound.muted = false;
        this.character.hop_sound.muted = false;
        this.sounds.smashed_bottle_sound.muted = false;
    }
}