const DELAY = 2000;
const videos = [];

const hide = (/** @type {HTMLVideoElement} */ el) => {
  el.style.display = 'none';
  // el.muted = true;
};
const show = (/** @type {HTMLVideoElement} */ el) => {
  el.style.display = 'block';
  // el.muted = false;
};
const showAndHideOthers = ({ target }) => {
  window.requestAnimationFrame(() => {
    videos.forEach(hide);
    show(target);
  });
};

const initRecorder = (stream) => {
  const recorder = new MediaRecorder(stream);
  const video = document.createElement('video');

  const restart = ({ data }) => {
    video.src = URL.createObjectURL(data);
    recorder.start();
  };

  video.autoplay = true;
  videos.push(video);
  video.addEventListener('play', showAndHideOthers);
  document.body.appendChild(video);

  recorder.addEventListener('dataavailable', restart);
  recorder.start();
  window.setInterval(recorder.stop.bind(recorder), DELAY);
};

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    initRecorder(stream);
    window.setTimeout(initRecorder, DELAY / 2, stream);
  })
  .catch(console.error);
