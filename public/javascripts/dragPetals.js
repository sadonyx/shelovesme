var game = document.getElementById('g-container');
var petals = document.getElementsByClassName('petal');
var clickedPetals = []
var petalId;
var offX;
var offY;
var delay;

window.onload = addListeners();

function setPetalId(e) {
  var target = e.target.id;
  if (!clickedPetals.includes(target)) {
    petalId = target;
  };
}

function addListeners() {
  petals.forEach((petal) => { // event listener for each rendered petal
    petal.addEventListener('mousedown', setPetalId, false);
    petal.addEventListener('mousedown', mouseDown, false);
  })
}

function mouseUp() {
  alternate ? pluckOneUp.play() : pluckTwoUp.play();
  alternate = !alternate;

  var petal = document.getElementById(petalId);
  petal.classList.add('falling');
  window.removeEventListener('mousemove', divMove, true);
  if (!clickedPetals.includes(petalId)) {
    changeFace();
    clickedPetals.push(petalId);
  }
  window.removeEventListener('mouseup', mouseUp, true);
}

function mouseDown(e) {
  pluckDown.play();
  var petal = document.getElementById(petalId);
  // method to add respective keyframes => argument retrieves rotate(Xdeg)
  dynamicKeyFramesAdd(petal.style.transform);
  // place petal on top
  petal.style.zIndex = 100; 
  offY= e.clientY-parseInt(petal.offsetTop);
  offX= e.clientX-parseInt(petal.offsetLeft);
  window.addEventListener('mouseup', mouseUp, true)
  window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
  var div = document.getElementById(petalId);
  div.style.position = 'absolute';
  div.style.top = (e.clientY-offY) + 'px';
  div.style.left = (e.clientX-offX) + 'px';
}