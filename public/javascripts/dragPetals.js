var game = document.getElementById('g-container');
var petals = document.getElementsByClassName('petal');
var clickedPetals = []
var petalId;
var offX;
var offY;
var touchLocation;
var touchX;
var touchY;
var delay;

var isMobile;

window.onload = addListeners();

function setPetalId(e) {
  var target = e.target.id;
  if (!clickedPetals.includes(target)) {
    petalId = target;
  };
}

function addListeners() {
  isMobile = window.matchMedia("(any-hover: none)").matches;
  petals.forEach((petal) => { // event listener for each rendered petal
    petal.addEventListener(isMobile ? 'touchstart' : 'mousedown', setPetalId, false);
    petal.addEventListener(isMobile ? 'touchstart' : 'mousedown', mouseDown, false);
  })
}

function mouseUp() {
  alternate ? pluckOneUp.play() : pluckTwoUp.play();
  alternate = !alternate;

  var petal = document.getElementById(petalId);
  petal.classList.add('falling');
  window.removeEventListener(isMobile ? 'touchmove' : 'mousemove', petalMove, true);

  if (!clickedPetals.includes(petalId)) {
    changeFace();
    clickedPetals.push(petalId);
  }
  window.removeEventListener(isMobile ? 'touchend' : 'mouseup', mouseUp, true);
}

function mouseDown(e) {
  pluckDown.play();
  var petal = document.getElementById(petalId);
  // method to add respective keyframes => argument retrieves rotate(Xdeg)
  dynamicKeyFramesAdd(petal.style.transform);
  // place petal on top
  petal.style.zIndex = 100;

  if (isMobile) {
    let touch = e.touches[0];
    offY = touch.clientY - petal.getBoundingClientRect().y;
    offX = touch.clientX - petal.getBoundingClientRect().x;
    console.log(offX, offY)
  } else {
    offY = e.clientY - parseInt(petal.offsetTop);
    offX = e.clientX - parseInt(petal.offsetLeft);
    console.log(offX, offY)
  }
  window.addEventListener(isMobile ? 'touchend' : 'mouseup', mouseUp, true)
  window.addEventListener(isMobile ? 'touchmove' : 'mousemove', petalMove, true);
}

function petalMove(e) {
  var petal = document.getElementById(petalId);
  //petal.style.position = 'absolute';
  if (isMobile) {
    touchLocation = e.targetTouches[0];
    petal.style.top = (touchLocation.clientY - (offY)) + 'px';
    petal.style.left = (touchLocation.clientX - (offX)) + 'px';
  } else {
    petal.style.top = (e.clientY - offY) + 'px';
    petal.style.left = (e.clientX - offX) + 'px';
  }
}