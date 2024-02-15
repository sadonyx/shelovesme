var song = document.createElement('audio');
song.setAttribute('src', '/sounds/loves-me-zade-keys.ogg');
song.loop = true;
song.setAttribute('autoplay', 'autoplay');

var alternate = 1;

var pluckDown = document.createElement('audio');
pluckDown.setAttribute('src', '/sounds/pluck-down.ogg')

var pluckOneUp = document.createElement('audio');
pluckOneUp.setAttribute('src', '/sounds/pluck-1-up.ogg')

var pluckTwoUp = document.createElement('audio');
pluckTwoUp.setAttribute('src', '/sounds/pluck-2-up.ogg')

var gameDOM = document.getElementById('g-container')

song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

gameDOM.addEventListener('mouseover', function() {
  song.play(); 
})