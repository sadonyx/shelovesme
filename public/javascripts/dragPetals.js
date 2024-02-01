const petals = document.getElementsByClassName('petal');
const text = document.getElementById('text')
var petalId;
var offX;
var offY;

window.onload = addListeners();

window.addEventListener('mousemove', function() {
  var search = /png$/;
  if (search.test(text.src)) {
    text.style.visibility = "visible";
  }
});

function setPetalId(e) {
  petalId = e.target.id
}

function addListeners() {
    for (let petal of petals) {
      petal.addEventListener('mousedown', setPetalId, false);
      petal.addEventListener('mousedown', mouseDown, false);
    }
}

function mouseUp() {
  var div = document.getElementById(petalId);
  div.classList.add('falling');
  window.removeEventListener('mousemove', divMove, true);
  changeFace()
  window.removeEventListener('mouseup', mouseUp, true);
  document.removeEventListener('DOMContentLoaded', hideBrokenImage, true);
}

function mouseDown(e) {
  var div = document.getElementById(petalId);
  offY= e.clientY-parseInt(div.offsetTop);
  offX= e.clientX-parseInt(div.offsetLeft);
  window.addEventListener('mouseup', mouseUp, true)
  window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
  var div = document.getElementById(petalId);
  div.style.position = 'absolute';
  div.style.top = (e.clientY-offY) + 'px';
  div.style.left = (e.clientX-offX) + 'px';
}

function changeFace() {
  const url = window.location.pathname + 'change-face'

  const request = new XMLHttpRequest();

  const img = document.createElement("img");
  img.id = "face";
  img.classList.add("flower-face-image");
  img.draggable = false;

    
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      res = this.responseText.split('split-here')
      document.getElementById("face").src = res[0];
      document.getElementById("text").src = res[1];
    }
  };

  request.open("GET", url, true)
  request.send();
}

