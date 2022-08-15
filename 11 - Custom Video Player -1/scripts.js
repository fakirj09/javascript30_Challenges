const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
function togglePlay() {
  const mthd = video.paused ? 'play' : 'pause'
  video[mthd]()
}
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}
function handleRangeupdate() {
  video[this.name] = this.value
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
skipButtons.forEach((button) => button.addEventListener('click', skip))
ranges.forEach((range) => range.addEventListener('change', handleRangeupdate))
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeupdate)
)
progress.addEventListener('click', scrub)
let mouseMove = false
progress.addEventListener('mousemove', (e) => mouseMove && scrub(e))
progress.addEventListener('mousedown', () => (mouseMove = true))
progress.addEventListener('mouseup', () => (mouseMove = false))
