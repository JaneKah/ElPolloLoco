let canvas;
let world;
let keyboard = new Keyboard();



function init() {
    removeIntroScreen();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world.character)
    
}

function removeIntroScreen() {
    document.getElementById('start-info-container').classList.add('d-none');
}

function muteSound() {
    let sound = document.getElementById('volume');
    if (sound.src.match('volume')) {
    sound.src = 'img/icons/mute.png';
    world.muteSounds();
    } else {
        sound.src = 'img/icons/volume.png';
        world.playSounds();
    }
}



