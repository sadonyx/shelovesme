var creditsIcon = document.getElementById('c-icon-container');
var credits = document.getElementById('credits');

creditsIcon.addEventListener('mouseover', () => {
  credits.classList.remove('fadeout');
  credits.classList.add('fadein');
  credits.style.visibility = 'visible';
})

creditsIcon.addEventListener('mouseleave', () => {
  credits.classList.remove('fadein');
  credits.classList.add('fadeout');
  credits.style.visibility = 'hidden';
})