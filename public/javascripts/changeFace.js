function changeFace() {
  const url = window.location.pathname + 'change-face'

  const request = new XMLHttpRequest();

  const img = document.createElement("img");
  img.id = "face";
  img.classList.add("flower-face-image");
  img.draggable = false;

  const normal = '/images/assets/faces/normal-face.png';
    
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.responseText);
      let delayBool = res.delay;
      let isWinner = res.isWinner;
      let delayTime = delayBool ? 1500 : 0;

      document.getElementById("text").style.visibility = "visible";
      if (delayBool) { //dramatic effect before grand reveal
        document.getElementById("text").style.visibility = "hidden";
        document.getElementById("face").src = normal;
      }

      setTimeout(() => {
        // change face and text
        if (!delayBool) {
          document.getElementById("face").src = normal;
          setTimeout(() => { // fluid face change
            document.getElementById("face").src = res.faceImage;
          }, 100)
          document.getElementById("text").src = res.textImage;
        } else {
          if (isWinner !== null && !isWinner) bellMeowBaaa.play(); // play lose sound
          document.getElementById("text").src = res.textImage;
          document.getElementById("text").style.visibility = "visible";
          document.getElementById("face").src = res.faceImage;
        }

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