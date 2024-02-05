window.addEventListener('mouseup', function() {
  if (!!document.getElementById('play-again-button')) {
    document.getElementById('play-again-button').addEventListener('mouseup', submitStatus)
  }
})
const button = document.getElementById('play-again-button')
button.addEventListener('click', submitStatus)

function playAgain(e) {
  const url = window.location.pathname + '/play-again'
  const request = new XMLHttpRequest();
    
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('text').style.visibility = 'hidden'
      document.getElementById('text').src = null;
      document.getElementById('play-again-form').remove()
      document.getElementById("ff-container").innerHTML = this.responseText;

      // unload all resources
      cleanup();

      getScript('/javascripts/dragPetals.js', () => {
        console.log('The script load is done.');
      });

      // var scr = document.createElement("script");
      // scr.type="text/javascript";
      // scr.src="/javascripts/dragPetals.js?ts=" + new Date().getTime();
      // document.body.appendChild(scr)
    }
  };

  request.open("GET", url, true)
  request.send();
  e.preventDefault();
}

function attachFormSubmitEvent(formId){
  document.getElementById(formId).addEventListener("submit", playAgain);
}

function submitStatus(){
  attachFormSubmitEvent('play-again-form');
  document.getElementById('play-again-button').removeEventListener('mouseup', submitStatus)
  document.getElementById('play-again-form').requestSubmit();
};

function getScript(scriptUrl, callback) {
    const script = document.createElement('script');
    script.src = scriptUrl + '?ts=' + new Date().getTime();
    script.onload = callback;

    document.body.appendChild(script);
}

function cleanup() {
  delete window.petals;
  delete window.cleanup;
}