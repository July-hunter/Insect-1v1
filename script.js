// URLs de sprites: mantis, araña, escorpión, hormiga, oruga, avispa, polilla
const personajes = [
  'https://upload.wikimedia.org/wikipedia/commons/c/c6/European-mantis-Mante-religieuse.png', // mantis
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3iIHOi_aCgmVteOwwLA6i8Wrh4c9A5P7mCQ&s', // araña
  'https://pngimg.com/d/scorpion_PNG12127.png', // escorpión
  'https://static.vecteezy.com/system/resources/previews/011/812/470/non_2x/ant-3d-rendering-png.png', // hormiga
  'https://www3.gobiernodecanarias.org/medusa/wiki/images/0/04/Oruga.png', // oruga
  'https://png.pngtree.com/png-clipart/20240705/original/pngtree-powerful-wasp-or-yellow-hornet-png-image_15497712.png', // avispa        
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ48EiYWHD9ufeIA15GmZ8eV3JS5atuRlTBQ&s', // polilla 
];

const imagenJugador1 = new Image();
const imagenJugador2 = new Image();

const p1Cont = document.getElementById('p1');
const p2Cont = document.getElementById('p2');
let seleccionP1 = 0;
let seleccionP2 = 1;

// Generar opciones de selección
personajes.forEach((url, i) => {
  ['p1', 'p2'].forEach((p, idx) => {
    const img = document.createElement('img');
    img.src = url;
    img.classList.toggle('seleccionado', (idx===0?seleccionP1:seleccionP2)===i);
    img.onclick = () => {
      if(idx===0) seleccionP1 = i; else seleccionP2 = i;
      actualizarSeleccion(idx===0? p1Cont: p2Cont, idx===0? seleccionP1: seleccionP2);
    };
    (idx===0? p1Cont: p2Cont).appendChild(img);
  });
});

function actualizarSeleccion(container, index) {
  container.querySelectorAll('img').forEach((img, i) => {
    img.classList.toggle('seleccionado', i===index);
  });
}

function iniciarJuego() {
  imagenJugador1.src = personajes[seleccionP1];
  imagenJugador2.src = personajes[seleccionP2];
  document.getElementById('menu').style.display = 'none';
  canvas.style.display = 'block';
}

const canvas = document.getElementById('canvasJuego');
const ctx = canvas.getContext('2d');
const teclas = {};

const jugador1 = { x:100, y:280, ancho:60, alto:60, velocidad:5, vida:100, atacando:false, defendiendo:false };
const jugador2 = { x:640, y:280, ancho:60, alto:60, velocidad:5, vida:100, atacando:false, defendiendo:false };

document.addEventListener('keydown', e => {
  const k=e.key.toLowerCase(); teclas[k]=true;
  if(k==='f'&&!jugador1.atacando){ jugador1.atacando=true; setTimeout(()=>{verificarGolpe(jugador1,jugador2); jugador1.atacando=false;},200); }
  if(k==='g'){ jugador1.defendiendo=true; setTimeout(()=>{jugador1.defendiendo=false;},500); }
  if(k==='l'&&!jugador2.atacando){ jugador2.atacando=true; setTimeout(()=>{verificarGolpe(jugador2,jugador1); jugador2.atacando=false;},200); }
  if(k==='k'){ jugador2.defendiendo=true; setTimeout(()=>{jugador2.defendiendo=false;},500); }
});
document.addEventListener('keyup', e=> teclas[e.key.toLowerCase()]=false);

function moverJugadores(){
  if(teclas['a']) jugador1.x-=jugador1.velocidad;
  if(teclas['d']) jugador1.x+=jugador1.velocidad;
  if(teclas['w']) jugador1.y-=jugador1.velocidad;
  if(teclas['s']) jugador1.y+=jugador1.velocidad;
  if(teclas['arrowleft']) jugador2.x-=jugador2.velocidad;
  if(teclas['arrowright']) jugador2.x+=jugador2.velocidad;
  if(teclas['arrowup']) jugador2.y-=jugador2.velocidad;
  if(teclas['arrowdown']) jugador2.y+=jugador2.velocidad;
  [jugador1,jugador2].forEach(j=>{
    j.x=Math.max(0,Math.min(canvas.width-j.ancho,j.x));
    j.y=Math.max(0,Math.min(canvas.height-j.alto,j.y));
  });
}

function dibujarJugador(j,img){
  ctx.drawImage(img,j.x,j.y,j.ancho,j.alto);
  if(j.atacando){ ctx.fillStyle='orange'; const px=j===jugador1?j.x+j.ancho:j.x-20; ctx.fillRect(px,j.y+20,20,10); }
  if(j.defendiendo){ ctx.fillStyle='green'; ctx.fillRect(j.x,j.y-10,j.ancho,5); }
}

function dibujarBarraVida(x,y,vida,color){
  ctx.fillStyle='#444'; ctx.fillRect(x,y,100,10);
  ctx.fillStyle=color; ctx.fillRect(x,y,vida,10);
  ctx.strokeStyle='#000'; ctx.strokeRect(x,y,100,10);
}

function verificarGolpe(a,r){
  const d=Math.abs((a.x+a.ancho/2)-(r.x+r.ancho/2));
  if(d<80&&!r.defendiendo) r.vida=Math.max(0,r.vida-10);
}

function bucleJuego(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  moverJugadores(); dibujarJugador(jugador1,imagenJugador1); dibujarJugador(jugador2,imagenJugador2);
  dibujarBarraVida(20,20,jugador1.vida,'red'); dibujarBarraVida(680,20,jugador2.vida,'blue');
  if(jugador1.vida>0&&jugador2.vida>0) {
    requestAnimationFrame(bucleJuego);
  } else {
    ctx.fillStyle='#fff';
    ctx.font='40px Arial';
    const ganador = jugador1.vida > 0 ? 'Jugador 1' : 'Jugador 2';
    ctx.fillText('¡Ganó ' + ganador + '!', 280, 200);
  }
}

imagenJugador1.onload=()=>imagenJugador2.onload=bucleJuego;