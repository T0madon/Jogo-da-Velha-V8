const boardRegions = document.querySelectorAll("#jogo span");
let vBoard = [];
let lastwin = "player2";
let turnPlayer = "";

function atualizaTitulo() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function inicializar() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = lastwin === "player2" ? "player1" : "player2";
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>';
  atualizaTitulo();

  boardRegions.forEach(function (element) {
    element.classList.remove("win");
    element.innerText = "";
    element.addEventListener("click", cliqueNaVelha);
  });
}

function cliqueNaVelha(ev) {
  const quadrado = ev.currentTarget;
  const regiao = quadrado.dataset.region;
  const coordenada = regiao.split(".");
  const linha = coordenada[0];
  const coluna = coordenada[1];

  if (turnPlayer === "player1") {
    quadrado.innerText = "X";
    vBoard[linha][coluna] = "X";
  } else {
    quadrado.innerText = "O";
    vBoard[linha][coluna] = "O";
  }
}

document.getElementById("begin").addEventListener("click", inicializar);
