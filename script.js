const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const trackName = document.getElementById('track-name');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

let playlist = [
  {name: "Кино - Кончится лето", src: "./music/Кино – Кончится лето.mp3"},
  {name: "Кипелов - Я свободен", src: "./music/Кипелов – Я свободен.mp3"},
];

let currentTrackIndex = 0;

function loadTrack(index) {
  let track = playlist[index];
  audioPlayer.src = track.src;
  trackName.textContent = track.name;
  audioPlayer.play().then(() => {
    updateDuration();
  }).catch(error => {
    console.error('Error playing audio:', error);
  });
}

function updateDuration() {
  let duration = audioPlayer.duration;
  let formattedDuration = formatTime(duration);
  durationElement.textContent = formattedDuration;
}

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateProgress() {
  let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
}

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play().then(() => {
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  } else {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

playPauseBtn.addEventListener('click', togglePlayPause);

prevBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
});

nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
});

volumeControl.addEventListener('input', (e) => {
  audioPlayer.volume = e.target.value;
});

audioPlayer.addEventListener('ended', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
});

audioPlayer.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', (e) => {
  let progressWidth = progressContainer.clientWidth;
  let clickedPosition = e.offsetX;
  let percentageClicked = (clickedPosition / progressWidth);
  audioPlayer.currentTime = percentageClicked * audioPlayer.duration;
});

audioPlayer.addEventListener('loadedmetadata', updateDuration);

loadTrack(currentTrackIndex);