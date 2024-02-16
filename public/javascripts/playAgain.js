window.addEventListener('mouseup', function() {
  if (!!document.getElementById('play-again-button')) {
    document.getElementById('play-again-button').addEventListener('mouseup', submitStatus);
  }
})

function playAgain(e) {
  const url = window.location.pathname + 'play-again';
  const request = new XMLHttpRequest();
    
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const buttonImage = document.getElementById('play-again-image');
      buttonImage.addEventListener('mouseover', submitStatus);

      document.getElementById('text').src = '/images/assets/misc/1x1.png';
      document.getElementById('play-again-form').remove();
      document.getElementById("ff-container").innerHTML = this.responseText;

      // unload all resources
      cleanup();

      getScript('/javascripts/dragPetals.js', () => {
        // console.log('The script load is done.');
      });
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
  document.getElementById('play-again-button').removeEventListener('mouseup', submitStatus);
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