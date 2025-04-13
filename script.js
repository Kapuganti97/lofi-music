const tracks = [
  {
    title: "Lazy",
    path: "music/lazy.mp3",
    cover: "https://w0.peakpx.com/wallpaper/961/491/HD-wallpaper-a-lofi-romance-love-couple-artist-artwork-digital-art-artstation.jpg"
  },
  {
    title: "Lofi Girl",
    path: "music/lofi_girl.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCn73jRMagZ4w7BBHohZRFfPjgdmj08edRMQ&s"
  },
  {
    title: "Moodfixer",
    path: "music/moodfixer.mp3",
    cover: "https://images.squarespace-cdn.com/content/v1/580fbaac440243d8731ffc57/46cb49b3-63d7-40e1-9cd0-540fbecdc39c/Lofi+Girl+16x9.jpeg"
  },
  {
    title: "Night",
    path: "music/night.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlai_l-kGiA5f7GPMryx788z9MTHAIz79gQ&s"
  },
  {
    title: "Peace",
    path: "music/peace.mp3",
    cover: "https://w0.peakpx.com/wallpaper/961/491/HD-wallpaper-a-lofi-romance-love-couple-artist-artwork-digital-art-artstation.jpg"
  }
];

let currentTrackIndex = 0;
const audio = document.getElementById("audio");
const albumCover = document.getElementById("album-cover");
const trackList = document.getElementById("track-list");

// Populate dropdown
tracks.forEach((track, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = track.title;
  trackList.appendChild(option);
});

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.path;
  albumCover.src = track.cover;
  trackList.value = index;
}

function selectTrack(index) {
  currentTrackIndex = parseInt(index);
  loadTrack(currentTrackIndex);
  audio.play();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
}

// Load the first track on page load
loadTrack(currentTrackIndex);
// Volume control
const volumeSlider = document.getElementById("volume");
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Visualizer
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 1.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;
    ctx.fillStyle = `rgb(${barHeight + 100}, 100, 180)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}

// Start visualizer on play
audio.onplay = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  drawVisualizer();
};
