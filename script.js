const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const trackName = document.getElementById('track-name');

let playlist = [
  {name: "Кино - Кончится лето", src: "./music/Кино – Кончится лето.mp3"},
  {name: "Кипелов - Я свободен", src: "./music/Кипелов – Я свободен.mp3"},
];

let currentTrackIndex = 0;

function loadTrack(index) {
  let track = playlist[index];
  audioPlayer.src = track.src;
  trackName.textContent = track.name;
}

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

playPauseBtn.addEventListener('click', togglePlayPause);

prevBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

volumeControl.addEventListener('input', (e) => {
  audioPlayer.volume = e.target.value;
});

audioPlayer.addEventListener('ended', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
});

loadTrack(currentTrackIndex);