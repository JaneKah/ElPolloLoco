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
    gameOver = new GameOver();
    coinBar = new CoinBar();
    endbossBar = new EndbossBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    coin_sound = new Audio('audio/coins_sound.mp3');
    heartbeat_sound = new Audio('audio/heartbeat_sound.mp3');
    bottle_clinking = new Audio('audio/bottle_clinking.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
         this.checkCollisions();
         this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if(this.keyboard.D && this.character.bottlesStatus > 20) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.decreaseBottleStatus();
            this.bottleBar.setPercentage(this.character.bottlesStatus);
        }
    }


    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) ) {
                 this.character.hit();
                 this.statusBar.setPercentage(this.character.energy);
             }
         });
         this.coins.forEach((coin) => {
            if(this.character.isColliding(coin) ) {
                this.character.hitByCoins();
                this.coinBar.setPercentage(this.character.coinStatus);
                this.coin_sound.play();
                let coinAmount = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinAmount, 1);
             }
         });
         this.hearts.forEach((heart) => {
            if(this.character.isColliding(heart) ) {
                this.character.hitByHeart();
                this.statusBar.setPercentage(this.character.energy);
                this.heartbeat_sound.play();
                let heartAmount = this.level.hearts.indexOf(heart);
                this.level.hearts.splice(heartAmount, 1);
             }
         });
         this.bottles.forEach((bottle) => {
            if(this.character.isColliding(bottle) ) {
                this.character.hitByBottle(); //if hit by bottle, bottle status will be increased
                this.bottleBar.setPercentage(this.character.bottlesStatus);
                this.bottle_clinking.play();
                let bottleAmount = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottleAmount, 1);
             }
         });
    }



  


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);


        this.addObjectsToMap(this.backroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

       
        this.addToMap(this.character);
     
        this.addDrawableObjectsToMap();
    
        

        this.ctx.translate(-this.camera_x, 0);
        


        // draw() wird wieder immer aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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
}