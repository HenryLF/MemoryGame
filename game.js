const StartScreen = document.getElementById("start_screen");
const EndScreen = document.getElementById("end_screen");

const EasyButton = document.getElementById("Easy");
const NormalButton = document.getElementById("Normal");
const HardButton = document.getElementById("Hard");
const EasyChallengeButton = document.getElementById("Easy_Challenge");
const NormalChallengeButton = document.getElementById("Normal_Challenge");
const HardChallengeButton = document.getElementById("Hard_Challenge");

const FinalTime = document.getElementById("Time");
const ResetButton = document.getElementById("Reset");

function initGame() {
  StartScreen.style.display = "none";
}

EasyButton.addEventListener("click", () => {
  createBoard(EasyMode);
  StartScreen.style.display = "none";
});
NormalButton.addEventListener("click", () => {
  createBoard(NormalMode);
  StartScreen.style.display = "none";
});
HardButton.addEventListener("click", () => {
  createBoard(HardMode);
  StartScreen.style.display = "none";
});
EasyChallengeButton.addEventListener("click", () => {
  createChallenge(EasyMode);
  StartScreen.style.display = "none";
});
NormalChallengeButton.addEventListener("click", () => {
  createChallenge(NormalMode);
  StartScreen.style.display = "none";
});
HardChallengeButton.addEventListener("click", () => {
  createChallenge(HardMode);
  StartScreen.style.display = "none";
});

ResetButton.addEventListener("click", (e) => {
  StartScreen.style.display = "flex";
  EndScreen.style.display = "none";
});
