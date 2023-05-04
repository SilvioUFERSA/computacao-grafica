import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x5d0361, 10, 1500);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 1);

const directionalLight = new THREE.DirectionalLight(0xffffdd, 1);
directionalLight.position.set(-300, 0, 600);

const pointLight = new THREE.PointLight(0x131148, 2, 1000, 2);
pointLight.position.set(200, -100, 50);

scene.add(ambientLight, directionalLight, pointLight);

const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
renderer.shadowMap.enabled = true;

let gltf_;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();
loader.load(

	'./foguete.gltf',

	function ( gltf ) {

		scene.add( gltf.scene );
		gltf_ = gltf.scene;

	},

);
camera.position.z = 60;
camera.position.y=-10
camera.position.x=0

const targetRocketPosition = 8;
const animationDuration = 5000;


function animate() {
	
	const t = (Date.now() % animationDuration) / animationDuration;
	
	renderer.render( scene, camera );

	const delta = targetRocketPosition * Math.sin(Math.PI * 2 * t);
	if (gltf_) {
        gltf_.rotation.y += 0.01;   
		gltf_.position.y = delta; 
    }

	requestAnimationFrame( animate );
}

animate();