import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x131148, 10, 300); // nevoa
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const listener = new THREE.AudioListener();
camera.add( listener );

const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 1); // luz do "objeto"
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffdd, 1); // luz de direção específica  -> da esquerda para o objeto
directionalLight.position.set(-300, 0, 600);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x131148, 2, 100 ); // ponto de luz
pointLight.position.set(200, -100, 50);
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true}); //antialias: suaviza o objeto		canal transparente habilitado para mostrar o objeto
renderer.shadowMap.enabled = true;

let gltfObject;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const loader = new GLTFLoader(); 	// carrega objeto gltf
loader.load( './foguete.gltf', function ( gltf ) {

		scene.add( gltf.scene );
		gltfObject = gltf.scene;
	},
);

  
const sound = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();
	  audioLoader.load( './beauty.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop(true);
		sound.setVolume(0.2);
		sound.play();
		console.log("ok");
});


camera.position.z = 70;
camera.position.y= 0;
camera.position.x= 0;

const posicaoDoFoguete = 10; // posição inicial do foguete
const tempoDeAnimacao = 6000; // duração da animação em milissegundos


function animate() {
	
	const t = (Date.now() % tempoDeAnimacao) / tempoDeAnimacao; //  calcula o valor atual do tempo de animação em relação ao tempo total de animação
	// controlar o comportamento da animação, como a oscilação e a rotação do foguete.
	
	
	renderer.render( scene, camera );

	const delta = posicaoDoFoguete * Math.sin(Math.PI * 2 * t); // faz o foguete ocilar para cima e para baixo -> eixo Y
	const alfa = posicaoDoFoguete * Math.sin(Math.PI * 1 * t); // faz o foguete ocilar para frente e pra trás -> eixo z

	if (gltfObject) {
		gltfObject.rotation.y += 0.015;  	// faz o foguete girar no seu próprio eixo y
		gltfObject.position.y = delta; 		// variação da posição no eixo y
		gltfObject.position.z = alfa;		// variação da posição no eixo z
	}

	requestAnimationFrame( animate );
}

animate();