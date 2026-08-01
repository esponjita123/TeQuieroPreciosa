// --- POEMA ÚNICO COMBINADO (NUESTRA HISTORIA + POEMA) ---
const POEMA_PRINCIPAL = {
  titulo: "Para ti, Preciosa ❤️",
  texto: `Oye, ¿sí te acuerdas cuando nos conocimos? Bueno, o sea... al inicio solo decidimos caminar sin rumbo, ¿recuerdas? Llevábamos ya varias cuadras y, la verdad, sé que como que empezabas a dudar un poquito de mí (jaja). Y bueno, digo, para mí también era algo totalmente nuevo y hasta raro, porque, pues, no nos conocíamos del todo.

Pero, eh... a pesar de toda esa incertidumbre, justo ahí empezó todo. Llegamos a aquel parque, nos pusimos a comer algo y, no sabes, disfruté cada segundo de ese momento. O sea, fue como el inicio más simple y perfecto de todo lo que hoy estamos viviendo.

Y sé que, bueno, aún nos queda un camino súper largo por recorrer... pero la verdad sé que con el tiempo iremos descubriendo nuestras virtudes y también nuestros defectos, aprendiendo el uno del otro para construir algo bien hermoso juntos.

Porque, oye, desde que llegaste, mi tiempo aprendió a sonreír, y mis días encontraron una razón más para seguir. No sé si fue tu mirada o, no sé, tu forma de ser... pero con cada pasito que dimos, la verdad es que no dejé de quererte.

Tienes algo, no sé qué es, pero me hace sentir raro: una luz que, sin buscarla, a mi corazón emociona. Y cuando pienso en ti, eh... algo empieza a latir bien fuerte, como si toda mi alma quisiera correr hacia ti.

Si la luna te mirara, seguro sentiría admiración, porque ni ella tiene tanta belleza e inspiración. Y si las estrellas hablaran al verte caminar, o sea, seguro dirían que eres imposible de igualar.

No te escribo por costumbre ni por simple emoción, digo, te escribo porque te adueñaste de un lugar imborrable en mi corazón. Porque entre tantos caminos que la vida me mostró, el más bonito de todos fue aquel donde mi rumbo te encontró.

Porque, o sea, hay personas que se olvidan con el tiempo... pero tú eres de esas almas que se quedan para siempre aquí adentro.

Te quiero muchísimo, preciosa. ✨`
};

// --- PALABRAS Y NOTAS FLOTANTES DE LA GALAXIA ---
const MENSAJES_GALAXIA = [
  {
    palabra: "Te Quiero preciosa",
    titulo: "Eres Mi Todo",
    poema: "En este vasto universo lleno de estrellas,\nla luz que más me ilumina es la tuya.\nGracias por hacer mi vida más hermosa."
  },
  {
    palabra: "Mi Paraíso",
    titulo: "Tu Sonrisa",
    poema: "Si me dieran a elegir un lugar para quedarme a vivir,\nsin dudarlo elegiría un abrazo tuyo.\nAhí encuentro toda la paz que necesito."
  },
  {
    palabra: "Destino",
    titulo: "Coincidir Contigo",
    poema: "Hay miles de millones de personas en el mundo,\ny aún así la vida tuvo la delicadeza de cruzarte en mi camino."
  },
  {
    palabra: "Para Siempre",
    titulo: "Nuestro Tiempo",
    poema: "No quiero solo momentos contigo,\nquiero construir una historia entera de tu mano.\nTe elijo hoy, mañana y siempre."
  },
  {
    palabra: "Constelación",
    titulo: "Nuestros Recuerdos",
    poema: "Cada risa compartida, cada mirada y cada paseo juntos\nson estrellas que van formando nuestra constelación."
  },
  {
    palabra: "Mi Sueño",
    titulo: "El Futuro",
    poema: "Mi sueño más grande es seguir caminando a tu lado sabiendo que cuento con tu amor."
  },
  {
    palabra: "Luz",
    titulo: "Tu Magia",
    poema: "Tienes esa hermosa costumbre de iluminar hasta los días más grises.\nGracias por ser mi refugio."
  }
];

// Elementos del DOM
const btnIniciar = document.getElementById('btn-iniciar');
const btnEscrito = document.getElementById('btn-escrito');
const modalInicio = document.getElementById('modal-inicio');
const modalCarga = document.getElementById('modal-carga');
const progressBar = document.getElementById('progress');
const porcentaje = document.getElementById('porcentaje');
const universoContainer = document.getElementById('universo-container');
const modalPoema = document.getElementById('modal-poema');
const poemaTitulo = document.getElementById('poema-titulo');
const poemaTexto = document.getElementById('poema-texto');
const contenedorImagen = document.getElementById('contenedor-imagen-poema');
const btnCerrar = document.getElementById('btn-cerrar');
const musica = document.getElementById('musica');

// Control del efecto mecanografía (letra por letra)
let typewriterTimeout;
const VELOCIDAD_ESCRITURA = 70; // Milisegundos por letra

function escribirTexto(texto, elemento, mostrarFoto = false) {
  elemento.innerText = "";
  contenedorImagen.classList.add('hidden');
  contenedorImagen.classList.remove('mostrar-foto');

  let index = 0;
  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  function tipo() {
    if (index < texto.length) {
      elemento.innerText += texto.charAt(index);
      index++;

      // Autoscroll hacia abajo a medida que escribe
      const contenedorScroll = elemento.parentElement;
      contenedorScroll.scrollTop = contenedorScroll.scrollHeight;

      typewriterTimeout = setTimeout(tipo, VELOCIDAD_ESCRITURA);
    } else {
      // Al finalizar la escritura, si está activada la foto, la muestra con suave animación
      if (mostrarFoto) {
        contenedorImagen.classList.remove('hidden');
        setTimeout(() => {
          contenedorImagen.classList.add('mostrar-foto');
          const contenedorScroll = elemento.parentElement;
          contenedorScroll.scrollTop = contenedorScroll.scrollHeight;
        }, 100);
      }
    }
  }

  tipo();
}

// Evento al pulsar "Escrito para ti"
btnEscrito.addEventListener('click', () => {
  poemaTitulo.innerText = POEMA_PRINCIPAL.titulo;
  modalPoema.classList.remove('hidden');
  escribirTexto(POEMA_PRINCIPAL.texto, poemaTexto, true);
});

// Evento al iniciar la experiencia
btnIniciar.addEventListener('click', () => {
  modalInicio.classList.add('hidden');
  modalCarga.classList.remove('hidden');

  musica.volume = 0.5;
  musica.play().catch(() => console.log("Reproducción bloqueada por navegador"));

  let progreso = 0;
  const interval = setInterval(() => {
    progreso += 2;
    progressBar.style.width = progreso + '%';
    porcentaje.innerText = progreso + '%';

    if (progreso >= 100) {
      clearInterval(interval);
      modalCarga.classList.add('hidden');
      universoContainer.classList.remove('hidden');
      initThreeJS();
    }
  }, 30);
});

// Evento para cerrar modal
btnCerrar.addEventListener('click', () => {
  if (typewriterTimeout) clearTimeout(typewriterTimeout);
  modalPoema.classList.add('hidden');
  contenedorImagen.classList.add('hidden');
  contenedorImagen.classList.remove('mostrar-foto');
});

// --- GALAXIA 3D CON THREE.JS ---
let scene, camera, renderer, controls;
let objetosInteractivos = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function initThreeJS() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020008, 0.002);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 30, 80);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;

  crearEstrellas();
  crearCentroGalaxia();
  crearTextos3D();

  window.addEventListener('resize', onWindowResize);
  renderer.domElement.addEventListener('click', onDocumentMouseDown);

  animar();
}

function crearEstrellas() {
  const count = 4000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 100 + 5;
    const spinAngle = radius * 0.2;
    const branchAngle = ((i % 3) * 2 * Math.PI) / 3;

    const randomX = (Math.random() - 0.5) * 10;
    const randomY = (Math.random() - 0.5) * 10;
    const randomZ = (Math.random() - 0.5) * 10;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    colors[i3] = 0.9 + Math.random() * 0.1; 
    colors[i3 + 1] = 0.3 + Math.random() * 0.4;
    colors[i3 + 2] = 0.7 + Math.random() * 0.3;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  const starField = new THREE.Points(geometry, material);
  scene.add(starField);
}

function crearCentroGalaxia() {
  const geometry = new THREE.SphereGeometry(4, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff007f,
    wireframe: true
  });
  const core = new THREE.Mesh(geometry, material);
  scene.add(core);

  const light = new THREE.PointLight(0xff00aa, 3, 100);
  scene.add(light);
}

function crearTextos3D() {
  MENSAJES_GALAXIA.forEach((item, index) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ff69b4';
    ctx.shadowColor = '#ff00aa';
    ctx.shadowBlur = 15;
    ctx.font = 'Bold 42px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.palabra, 256, 70);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true
    });

    const sprite = new THREE.Sprite(spriteMaterial);

    const angle = (index / MENSAJES_GALAXIA.length) * Math.PI * 2;
    const radius = 25 + Math.random() * 25;
    sprite.position.x = Math.cos(angle) * radius;
    sprite.position.z = Math.sin(angle) * radius;
    sprite.position.y = (Math.random() - 0.5) * 15;

    sprite.scale.set(20, 5, 1);

    sprite.userData = {
      titulo: item.titulo,
      poema: item.poema
    };

    scene.add(sprite);
    objetosInteractivos.push(sprite);
  });
}

// Clics en las palabras 3D de la galaxia
function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objetosInteractivos);

  if (intersects.length > 0) {
    const data = intersects[0].object.userData;
    poemaTitulo.innerText = data.titulo;
    modalPoema.classList.remove('hidden');
    escribirTexto(data.poema, poemaTexto, false);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animar() {
  requestAnimationFrame(animar);
  controls.update();
  renderer.render(scene, camera);
}