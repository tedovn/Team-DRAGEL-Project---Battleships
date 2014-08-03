var backgroundMusic = loadSound('audio/intro.mp3');
var bombSound = loadSound('audio/bomb.mp3');
var hitSound = loadSound('audio/hit.mp3');
var missSound = loadSound('audio/miss.mp3');


function loadSound(url) {
    var audio = new Audio(url);
    audio.load();
    return audio;
}