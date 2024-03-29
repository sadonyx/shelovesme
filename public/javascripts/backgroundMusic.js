// initialize music
var song = document.createElement('audio');
song.setAttribute('src', '/sounds/loves-me-zade-keys.ogg');
song.loop = true;
song.volume = 1;
song.setAttribute('autoplay', 'autoplay');

// initialize volume controls
const volumeIcon = document.getElementById('volume-icon');
volumeIcon.addEventListener('click', () => {
  song.muted = !song.muted;
  if (song.muted) {
    volumeIcon.src = '/images/assets/volume/mute.png';
  } else {
    volumeIcon.src = '/images/assets/volume/speaker.png';
  }
})

// initialize volume slider
// const volume = document.querySelector("#volume");
// volume.addEventListener("change", function(e) {
//   song.volume = e.currentTarget.value / 100;
// })

// initialize sound effects
var alternate = 1;

var pluckDown = document.createElement('audio');
pluckDown.setAttribute('src', '/sounds/pluck-down.ogg');

var pluckOneUp = document.createElement('audio');
pluckOneUp.setAttribute('src', '/sounds/pluck-1-up.ogg');

var pluckTwoUp = document.createElement('audio');
pluckTwoUp.setAttribute('src', '/sounds/pluck-2-up.ogg')

var bellMeowBaaa = document.createElement('audio');
bellMeowBaaa.setAttribute('src', '/sounds/bell-meow-baaa.ogg');

var gameDOM = document.getElementById('g-container')

song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

gameDOM.addEventListener(isMobile ? 'touchstart' : 'mouseover', function() {
  song.play(); 
})