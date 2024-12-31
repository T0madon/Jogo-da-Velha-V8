const boardRegions = document.querySelectorAll("#jogo span");
console.log(boardRegions[0]);
let vBoard = [];
let lastwin = "player2";
let turnPlayer = "";

function atualizaTitulo() {
  turnPlayer = lastwin === "player2" ? "player1" : "player2";
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function inicializar() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer></span>"';
  atualizaTitulo();

  boardRegions.forEach(function (element) {
    element.classList.remove("win");
    element.innerText = "";
    element.addEventListener("click", cliqueNaVelha);
  });
}

function verificaTab() {
  console.log();
}

function cliqueNaVelha(ev) {}

document.getElementById("begin").addEventListener("click", inicializar);
