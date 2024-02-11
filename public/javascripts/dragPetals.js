var petals = document.getElementsByClassName('petal');
var text = document.getElementById('text')
var clickedPetals = []
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
  var target = e.target.id;
  if (!clickedPetals.includes(target)) {
    petalId = target;
  };
}

function addListeners() {
  petals.forEach((petal) => {
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
  dynamicKeyFramesAdd(petal.style.transform)
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

function changeFace() {
  const url = window.location.pathname + 'change-face'

  const request = new XMLHttpRequest();

  const img = document.createElement("img");
  img.id = "face";
  img.classList.add("flower-face-image");
  img.draggable = false;

    
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.responseText)
      document.getElementById("face").src = res.faceImage;
      document.getElementById("text").src = res.textImage;
      if (res.partial) {
        form = document.createElement('form')
        form.id = 'play-again-form'
        form.action = "/play-again"
        form.method = "GET"
        form.classList.add('play-again')
        form.innerHTML = res.partial
        document.getElementById('div-reset').appendChild( form)
      }
    }
  };

  request.open("GET", url, true)
  request.send();
}
