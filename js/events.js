/**
 * Eventlistener for the keyboard, checks when key is pushed down
 */

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
})

/**
 * Eventlistener for the keyboard, checks when key is up
 */

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
})

/**
 * Touch events for the mobile version, checks start of touch
 */

 window.addEventListener('touchstart', (e) => {
    if (e.target.id == 'right') {
        keyboard.RIGHT = true;
    }

    if (e.target.id == 'left') {
        keyboard.LEFT = true;

    }

    if (e.target.id == 'space') {
        keyboard.SPACE = true;
    }

    if (e.target.id == 'throw') {
        keyboard.D = true;
    }
});


/**
 * Touch events for the mobile version, checks end of touch
 */

 window.addEventListener('touchend', (e) => {
    if (e.target.id == 'right') {
        keyboard.RIGHT = false;
    }

    if (e.target.id == 'left') {
        keyboard.LEFT = false;
    }

    if (e.target.id == 'space') {
        keyboard.SPACE = false;
    }

    if (e.target.id == 'throw') {
        keyboard.D = false;
    }
});

