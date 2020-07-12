var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");


var teclas = {};

//"Bolinha"
var bola = {
	x: canvas.width / 2 - 15,
	y: canvas.height / 2 - 15,
	altura: 15,
	largura: 15,
	dirx: -1,
	diry: 1,
	mod: 0,
	speed:1
};

// Barra da Esqueda
var esquerda = {
	x: 10,
	y: canvas.height / 2 - 60,
	altura: 100,
	largura: 10,
	score:0,
	speed:3
	
};
// Barra da Direita
var direita = {
	x: canvas.width -20,
	y: canvas.height / 2 - 60,
	altura: 100,
	largura: 10,
	score:0,
	speed:3
};
//Registrando o aperto das teclas
document.addEventListener("keydown", function (e) {
	teclas[e.keyCode] = true;
	if(e.keyCode == 80){
		alert("Jogo Pausado!");
		
	}
	//alert(e.keyCode)
}, false);
//Registrando o aperto das teclas
document.addEventListener("keyup", function(e) {
	delete teclas[e.keyCode];
}, false);
// Mover as barras
function moveblock() {
	//Player 1
	if(87 in teclas && esquerda.y > 0)
			esquerda.y -= esquerda.speed;

	else if(83 in teclas && esquerda.y + esquerda.altura < canvas.height)
			esquerda.y += esquerda.speed;
	//Final player 1 & inicio Player 2
	if(38 in teclas && direita.y > 0)
			direita.y -= direita.speed;

	else if(40 in teclas && direita.y + direita.altura < canvas.height)
			direita.y += direita.speed;
	//Final player 2
};
// Movimento da bola
function moveBola () {
	if (bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura){
		bola.dirx = 1;
		bola.mod += 0.0;
	}
	
	else if (bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x){
		bola.dirx = -1;
		bola.mod += 0.0;
	}

	if (bola.y <= 0)
		bola.diry = 1;

	else if (bola.y + bola.altura >= canvas.height)
		bola.diry = -1;

	bola.x += (bola.speed + bola.mod) * bola.dirx;
	bola.y += (bola.speed + bola.mod) * bola.diry;

	if(bola.x < esquerda.x + esquerda.largura - 10.0){
		newGame("player 1");
	}else if (bola.x + bola.largura > direita.x + 10.0){
		newGame("player 2");
	};
};
// Pontuação
function newGame(winner) {
	
	if (winner == "player 1")
		++esquerda.score;
		else
			++direita.score;
	
		esquerda.y = canvas.height / 2 - esquerda.altura / 2
		direita.y = esquerda.y;
		bola.y = canvas.height / 2 - bola.altura / 2;
		bola.x = canvas.width /2 - bola.largura /2;
		bola.mod = 0;

		if(esquerda.score == 5){
			alert("Vencedor: Direita - "+esquerda.score+" x "+direita.score);
			document.location.reload();
		}else if(direita.score == 5){
			alert("Vencedor: Esquerda - "+direita.score+" x "+esquerda.score);
			document.location.reload();
		}

};

// Imprimir tudo na tela
function desenha() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	moveblock();
	moveBola();

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
	ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
	ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);

	ctx.font = "50px Roboto Mono";
	ctx.fillText(esquerda.score, 450, 100);
	ctx.fillText(direita.score, canvas.width - 450, 100);

}
// Realiza as mudancas
setInterval(desenha, 2)