const board = document.getElementById("board");
const NumberOfType = 8;
const EasyMode = Array.from({ length: 8 }, (_, i) => i + 1);
const NormalMode = Array.from({ length: 18 }, (_, i) => i + 1);
const HardMode = Array.from({ length: 36 }, (_, i) => i + 1);

let CardMap = new Map();
let PlayedCardID;
let Score = 0;
let MaxScore;
let ButtonSize = {
  8: 20,
  18: 14,
  36: 10 ,
};

let NightmareInterval;
let Timer;

class Card {
  constructor(type, id) {
    this.id = id;
    this.type = type;
    this.btn = document.createElement("button");
    let img = document.createElement("img");
    this.btn.style.order = id;
    img.src = `./img/${type}.png`;
    this.btn.append(img);
    this.btn.className = "hidden";
    this.btn.addEventListener("click", (e) => {
      this.reveal();
    });
    board.appendChild(this.btn);
  }
  reveal() {
    this.btn.className = "revealed";
    this.btn.disabled = true;
    if (PlayedCardID == undefined) {
      PlayedCardID = this.id;
    } else {
      PairCheck(this.id);
    }
  }
  hide() {
    this.btn.className = "hidden";
    this.btn.disabled = false;
  }
}

function Shuffle(arr) {
  let rtn = Array.from(arr);
  let i = arr.length;
  while (i != 0) {
    random = Math.floor(Math.random() * i);
    i--;
    [rtn[i], rtn[random]] = [rtn[random], rtn[i]];
  }
  return rtn;
}

function PairCheck(id) {
  if (CardMap.get(id).type == CardMap.get(PlayedCardID).type) {
    Score += 1;
    WinCheck();
    PlayedCardID = undefined;
  } else {
    let tmp = PlayedCardID;
    PlayedCardID = undefined;
    setTimeout((e) => {
      CardMap.get(id).hide();
      CardMap.get(tmp).hide();
    }, 1000);
  }
}
function WinCheck() {
  if (Score == MaxScore) {
    EndScreen.style.display = "flex";
    clearInterval(NightmareInterval);
    let time = Date.now() - Timer;
    FinalTime.innerText = Math.floor(time) / 1000;
  }
}

function createBoard(mode) {
  Timer = Date.now();
  board.innerHTML = "";
  MaxScore = mode.length;

  document.body.style.setProperty("--btn-size", `${ButtonSize[MaxScore]}%`);
  let Cards = Shuffle(mode.concat(mode));
  Cards.forEach((e, i) => {
    let m = new Card(e, i);
    CardMap.set(i, m);
  });
}

function createChallenge(mode) {
  createBoard(mode);
  NightmareInterval = setInterval((e) => {
    let x = Math.random();
    if (x < 1 / 3) {
      ShuffleCard();
    } else if (x < 2 / 3) {
      Blind(5);
    } else {
      ColorBlind(5);
    }
  }, 5000);
}

function ShuffleCard() {
  let UnrevealedCard = Array.from(
    [...CardMap.keys()].filter((k) => CardMap.get(k).btn.className == "hidden")
  );
  let a = UnrevealedCard[Math.floor(Math.random() * UnrevealedCard.length)];
  let b = UnrevealedCard[Math.floor(Math.random() * UnrevealedCard.length)];
  console.log(a, b);
  CardMap.get(a).btn.className = "switching_red";
  CardMap.get(b).btn.className = "switching_blue";
  CardMap.get(a).btn.disabled = true;
  CardMap.get(b).btn.disabled = true;
  setTimeout((e) => {
    [CardMap.get(a).btn.style.order, CardMap.get(b).btn.style.order] = [
      CardMap.get(b).btn.style.order,
      CardMap.get(a).btn.style.order,
    ];
  }, 1500);
  setTimeout((e) => {
    CardMap.get(a).btn.className = "hidden";
    CardMap.get(b).btn.className = "hidden";
    CardMap.get(a).btn.disabled = false;
    CardMap.get(b).btn.disabled = false;
  }, 3000);
}
function clipPath(e) {
  board.style.clipPath = `circle(var(--btn-size) at ${e.clientX}px ${e.clientY}px )`;
}
function Blind(Duration) {
  document.body.style.backgroundColor = "black";

  window.addEventListener("mousemove", clipPath);
  setTimeout(() => {
    document.body.style.backgroundColor = "rgb(128, 169, 87)";
    window.removeEventListener("mousemove", clipPath);
    board.style.clipPath = "none";
  }, Duration * 1000);
}

function ColorBlind(Duration) {
  document.body.style.setProperty("--img-filter", 1);
  setTimeout((e) => {
    document.body.style.setProperty("--img-filter", 0);
  }, Duration * 1000);
}
