const boardRegions = document.querySelectorAll("#jogo span");
let vBoard = [];
let lastwin = "player2";
let turnPlayer = "";
let player1J = [];
let player2J = [];

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

function atualizaTitulo() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function verificaWin() {
  const winRegions = [];

  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2"); // Primeira linha

  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2"); // Segunda linha

  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2"); // Terceira linha

  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0"); // Primeira coluna

  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1"); // Segunda coluna

  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2"); // Terceira coluna

  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2"); // Diagonal principal

  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0"); // Diagonal secundária

  return winRegions;
}

function desabilita(elemento) {
  elemento.style.cursor = "default";
  elemento.removeEventListener("click", cliqueNaVelha);
}

function finaliza(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer);
  document.querySelector("h2").innerHTML = playerName.value + " venceu!!";
  lastwin = turnPlayer;
  turnPlayer = lastwin === "player2" ? "player1" : "player2";
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
    player1J.push(regiao);
    console.log(`player1J: ${player1J}`);
  } else {
    quadrado.innerText = "O";
    vBoard[linha][coluna] = "O";
    player2J.push(regiao);
    console.log(`player2J: ${player2J}`);
  }

  desabilita(quadrado);
  const winRegions = verificaWin();

  if (winRegions.length > 0) {
    // Um jogador ganhou
    finaliza(winRegions);
  } else if (vBoard.flat().includes("")) {
    // Jogo continua
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    atualizaTitulo();
  } else {
    document.querySelector("h2").innerHTML = "EMPATE";
  }
}

document.getElementById("begin").addEventListener("click", inicializar);
