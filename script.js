const opcionesInsectos = [
  { nombre: 'Araña', img: 'https://img.freepik.com/vecteurs-libre/modele-autocollant-vue-dessus-scorpion-isole_1308-62369.jpg' },
  { nombre: 'Escorpión', img: 'data:image/jpeg;base64,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' },
  { nombre: 'Mantis', img: 'https://i.imgur.com/WPldhxe.png' },
  { nombre: 'Avispa', img: 'https://i.imgur.com/FoL3An2.png' },
  { nombre: 'Gusano', img: 'https://i.imgur.com/djqybWw.png' },
  { nombre: 'Polilla', img: 'https://i.imgur.com/ivh8pcS.png' },
  { nombre: 'Hormiga', img: 'https://i.imgur.com/0I2Xu8j.png' }
];
function crearSeleccionPersonajes() {
  const p1 = document.getElementById('p1-select');
  const p2 = document.getElementById('p2-select');
  p1.innerHTML = '<h4>Jugador 1</h4>';
  p2.innerHTML = '<h4>Jugador 2</h4>';

  opcionesInsectos.forEach(insecto => {
    const img1 = document.createElement('img');
    img1.src = insecto.img;
    img1.className = 'opcion-personaje';
    img1.onclick = () => spritesSeleccionados[0] = insecto.img;

    const img2 = document.createElement('img');
    img2.src = insecto.img;
    img2.className = 'opcion-personaje';
    img2.onclick = () => spritesSeleccionados[1] = insecto.img;

    p1.appendChild(img1);
    p2.appendChild(img2);
  });
}
class Peleador {
  constructor(x, y, color, controles, sprite) {
    this.x = x;
    this.y = y;
    this.ancho = 50;
    this.alto = 50;
    this.color = color;
    this.controles = controles;
    this.vida = 100;
    this.velocidad = { x: 0, y: 0 };
    this.vel = 5;
    this.atacando = false;
    this.defendiendo = false;
    this.sprite = new Image();
    this.sprite.src = sprite;  // Aquí se asigna la imagen del insecto

    // Sonidos
    this.sonidoAtaque = new Audio('https://www.soundjay.com/button/beep-07.wav');
    this.sonidoGolpe = new Audio('https://www.soundjay.com/button/button-10.wav');
  }

  dibujar(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.ancho, this.alto);
  }
}
function bucleJuego() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Verificar si algún jugador ha perdido
  if (jugadores[0].vida <= 0 || jugadores[1].vida <= 0) {
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      jugadores[0].vida <= 0 ? "¡Jugador 2 gana!" : "¡Jugador 1 gana!",
      canvas.width / 2,
      canvas.height / 2
    );
    return; // Detiene el bucle
  }

  jugadores.forEach((j, i) => {
    const c = j.controles;
    j.velocidad.x = 0;
    j.velocidad.y = 0;

    if (teclas[c.izquierda]) j.velocidad.x = -j.vel;
    if (teclas[c.derecha]) j.velocidad.x = j.vel;
    if (teclas[c.arriba]) j.velocidad.y = -j.vel;
    if (teclas[c.abajo]) j.velocidad.y = j.vel;

    j.atacando = teclas[c.atacar];
    j.defendiendo = teclas[c.defender];

    j.actualizar(ctx);
  });

  if (jugadores[0].atacando) jugadores[0].atacar(jugadores[1]);
  if (jugadores[1].atacando) jugadores[1].atacar(jugadores[0]);

  dibujarEfectos();

  ctx.fillStyle = "red";
  ctx.fillRect(20, 20, jugadores[0].vida * 2, 20);
  ctx.fillStyle = "blue";
  ctx.fillRect(760 - jugadores[1].vida * 2, 20, jugadores[1].vida * 2, 20);

  requestAnimationFrame(bucleJuego);
}

bucleJuego();
go to line 1