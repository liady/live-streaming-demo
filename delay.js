const DELAY = 1000;
const videos = [document.getElementById('video-element-delayed-1'), document.getElementById('video-element-delayed-2')];

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
videos.forEach((video) => {
  video.addEventListener('play', showAndHideOthers);
});

const initRecorder = (stream, video) => {
  const recorder = new MediaRecorder(stream);

  const restart = ({ data }) => {
    video.src = URL.createObjectURL(data);
    recorder.start();
  };

  recorder.addEventListener('dataavailable', restart);
  recorder.start();
  window.setInterval(recorder.stop.bind(recorder), DELAY);
};

export function playDelayedVideo(stream) {
  initRecorder(stream, videos[0]);
  window.setTimeout(() => {
    initRecorder(stream, videos[1]);
  }, DELAY / 2);
}

export function stopAllVideos() {
  videos.forEach((video) => {
    video.pause();
    video.src = '';
  });
}
