/////////////////////////////////////////////////////////////////////////
//////////// Init Options with reload btn inside modal
export default function initOptions() {
  const soundBtns = document.querySelectorAll(
    ".modal-opt__body-sound-group .btn"
  );
  const levelBtns = document.querySelectorAll(
    ".modal-opt__body-level-group .btn"
  );
  const timerBtns = document.querySelectorAll(
    ".modal-opt__body-timer-group .btn"
  );
  soundBtns.forEach((soundBtn) => soundBtn.classList.remove("active"));
  levelBtns.forEach((levelBtn) => levelBtn.classList.remove("active"));
  timerBtns.forEach((timerBtn) => timerBtn.classList.remove("active"));
  soundBtns[0].classList.add("active");
  levelBtns[0].classList.add("active");
  timerBtns[0].classList.add("active");
}
