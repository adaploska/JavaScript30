const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

//event on click play ans start/pause video
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
  //inaczej zapisane
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
}
//update button play/pause
function updateButton() {
  const icon = video.paused ? "►" : "▋▋ ";
  console.log(icon);
  toggle.textContent = icon;
}
//function skip add/minus time to video
function skip() {
  console.log(this.dataset.skip);
  console.log(video.currentTime);
  video.currentTime += parseFloat(this.dataset.skip);
}
//function change volume or speed of video
function handleRangeUpdate() {
  console.log(this.name);
  console.log(this.value);
  video[this.name] = this.value;
}

//progresbar based on video time

function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
video.addEventListener("click", togglePlay);
video.addEventListener("pause", updateButton);
video.addEventListener("play", updateButton);
video.addEventListener("timeupdate", updateProgressBar);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mousedonw = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedonw && scrub(e));
progress.addEventListener("mousedown", () => (mousedonw = true));
progress.addEventListener("mouseup", () => (mousedonw = false));
