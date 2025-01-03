const boardRegions = document.querySelectorAll("#jogo span");
let vBoard = [];
let lastwin = "player2";
let turnPlayer = "";
let player1J = [];
let player2J = [];
let resetRegion;

function inicializar() {
  resetRegion = 0;

  while (player1J.length) {
    player1J.pop();
  }
  while (player2J.length) {
    player2J.pop();
  }

  console.log(`Começo de jogo\nplayer1: ${player1J}\nplayer2: ${player2J}`);

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
    element.style.cursor = "pointer";
    element.classList.remove("win");
    element.classList.remove("exit");
    element.innerText = "";
    element.addEventListener("click", cliqueNaVelha);
  });
}

function atualizaTitulo() {
  const playerInput = document.getElementById(turnPlayer); //Nome do jogador
  document.getElementById("turnPlayer").innerText = playerInput.value;

  if (turnPlayer === "player1" && player1J.length == 3) {
    const coord = player1J[0]; //0.0
    // const par = coord.split("."); -> ["0", "0"]
    document
      .querySelector('[data-region="' + coord + '"]')
      .classList.add("exit");
    resetRegion = player1J.shift();
  }
  if (turnPlayer === "player2" && player2J.length == 3) {
    const coord = player2J[0]; //0.0
    // const par = coord.split("."); -> ["0", "0"]
    document
      .querySelector('[data-region="' + coord + '"]')
      .classList.add("exit");
    resetRegion = player2J.shift();
  }
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

function habilita(elemento) {
  console.log(`Vou habilitar ${elemento}`);

  const celula = document.querySelector('[data-region="' + elemento + '"]');

  celula.classList.remove("exit");
  celula.style.cursor = "pointer";
  celula.innerText = "";
  celula.addEventListener("click", cliqueNaVelha);

  const dupla = elemento.split(".");
  linha = dupla[0];
  coluna = dupla[1];
  vBoard[linha][coluna] = "";
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
  const regiao = quadrado.dataset.region; // N.N
  const coordenada = regiao.split("."); //["N", "N"]
  const linha = coordenada[0];
  const coluna = coordenada[1];

  if (resetRegion) habilita(resetRegion);

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
