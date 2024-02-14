function changeFace() {
  const url = window.location.pathname + 'change-face'

  const request = new XMLHttpRequest();

  const img = document.createElement("img");
  img.id = "face";
  img.classList.add("flower-face-image");
  img.draggable = false;

    
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.responseText);
      let delayBool = res.delay;
      let delayTime = delayBool ? 1500 : 0;
      setTimeout(() => {
        // change face and text
        document.getElementById("face").src = res.faceImage;
        document.getElementById("text").src = res.textImage;
        document.getElementById("text").style.visibility = "visible";
        changeFavIcon(res.favIcon);
        // load play again form
        if (res.partial) {
          form = document.createElement('form')
          form.id = 'play-again-form'
          form.action = "/play-again"
          form.method = "GET"
          form.classList.add('play-again')
          form.innerHTML = res.partial
          document.getElementById('div-reset').appendChild( form)
        }
      }, delayTime)
    }
  };

  request.open("GET", url, true)
  request.send();
}