///////////////////////////////////////////////////////////////////
//// Handle Sound
export function handleSound(audioNewRecord, audioFailed, audioComplete) {
  const audioIconOn = document.querySelector(".audio-on-icon");
  const audioIconMuted = document.querySelector(".audio-muted-icon");

  audioIconOn.classList.toggle("d-none");
  audioIconMuted.classList.toggle("d-none");
  console.log("audio clicked");
  if (audioIconOn.classList.contains("d-none")) {
    console.log("muted");
    setSoundOff(audioNewRecord, audioFailed, audioComplete);
  } else {
    setSoundOn(audioNewRecord, audioFailed, audioComplete);
  }
}

export function setSoundOn(audioNewRecord, audioFailed, audioComplete) {
  const soundBtns = document.querySelectorAll(
    ".modal-opt__body-sound-group .btn"
  );
  const audioIconOn = document.querySelector(".audio-on-icon");
  const audioIconMuted = document.querySelector(".audio-muted-icon");

  console.log("soundBtns", soundBtns);
  soundBtns[0].classList.add("active");
  soundBtns[1].classList.remove("active");
  audioIconMuted.classList.add("d-none");
  audioIconOn.classList.remove("d-none");
  muteAllAudio(audioNewRecord, audioFailed, audioComplete, false);
}
export function setSoundOff(audioNewRecord, audioFailed, audioComplete) {
  const soundBtns = document.querySelectorAll(
    ".modal-opt__body-sound-group .btn"
  );
  const audioIconOn = document.querySelector(".audio-on-icon");
  const audioIconMuted = document.querySelector(".audio-muted-icon");

  soundBtns[0].classList.remove("active");
  soundBtns[1].classList.add("active");
  audioIconOn.classList.add("d-none");
  audioIconMuted.classList.remove("d-none");
  muteAllAudio(audioNewRecord, audioFailed, audioComplete, true);
}

function muteAllAudio(audioNewRecord, audioFailed, audioComplete, isMuted) {
  audioNewRecord.muted = isMuted;
  audioFailed.muted = isMuted;
  audioComplete.muted = isMuted;
}
