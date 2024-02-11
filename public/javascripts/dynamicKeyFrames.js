const keyFramesString = '@keyframes fallAnimation {\
    0% {\
      -webkit-transform: translateY(0px) ORIENTATION;\
    }\
    100% {\
      -webkit-transform: translateY(1000px) ORIENTATION;\
    }\
}';

function dynamicKeyFramesAdd(rotation) {
  let head = document.getElementsByTagName('head')[0]
  let keyFrameStyle = document.createElement('style');
  let keyFrames = keyFramesString;
  keyFrameStyle.innerHTML = keyFrames.replace(/ORIENTATION/g, rotation);
  if (!!head.getElementsByTagName('style').length) {
    head.replaceChild(keyFrameStyle, head.getElementsByTagName('style')[0]);
  } else {
    head.appendChild(keyFrameStyle)
  }
}