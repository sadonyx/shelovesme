var link = document.querySelector("link[rel~='icon']");
const possibleNames = ['normal-face.ico', 'really-loves-me-face.ico', 'really-loves-me-not-face.ico'];

function changeFavIcon(faceName) {
  let newIcon = possibleNames.includes(faceName) ? faceName : possibleNames[0];
  link.href = `/images/icons/${newIcon}`;
}