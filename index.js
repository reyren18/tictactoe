let bgmusic = new Audio("Media/music.mp3");
let gameOverMusic = new Audio("Media/gameover.mp3");
let turnMusic = new Audio("Media/ting.mp3");
let isgameover = false;
let reset = document.getElementById("reset");
let turn = "X";

function changeTurn() {
  if (turn === "X") {
    return "O";
  } else {
    return "X";
  }
}

const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".turnInfo").innerText =
        boxtext[e[0]].innerText + " Has won the game";
      isgameover = true;
      document.getElementsByClassName("winImg")[0].style.width = "200px";
    }
  });
};

// Title color change function
const changeTitleColor = () => {
  const title = document.getElementById("title");
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate a random color
  title.style.color = "#" + randomColor;
};

// Interval for changing title color every 5 seconds
setInterval(changeTitleColor, 2000);

// Working of game
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      turnMusic.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("turnInfo")[0].innerText =
          "Turn for " + turn;
      }
      if (isgameover) {
        gameOverMusic.play();
      }
    }
  });
});

// Reset button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((e) => {
    e.innerText = " ";
  });
  turn = "X";
  isgameover = false;
  document.getElementsByClassName("winImg")[0].style.width = "0px";
});
