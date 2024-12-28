const boardRegions = document.querySelectorAll("#jogo span");
let vBoard = [];
let lastwin = "player2";
let turnPlayer = "";

function atualizaTitulo() {
  turnPlayer = lastwin === "player2" ? "player1" : "player2";
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

document.getElementById("begin").addEventListener("click", atualizaTitulo);
