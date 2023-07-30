
/***************socket.io********************/
// var socketIO = io();
// socketIO.on("message",(mess)=>{document.getElementById("informationShow").innerHTML=mess});

/***************socket.io********************/


// import * as THREE from 'three';
// var scene3d = document.getElementById("scene3d");
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerHeight/3,window.innerHeight/3);
// // document.body.appendChild( renderer.domElement );

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// document.body.appendChild(scene3d.domElement);
// scene3d.appendChild(renderer.domElement);
// renderer.render(scene, camera);




import * as THREE from 'three';
var scene3d = document.getElementById("scene3d");
var w = scene3d.offsetWidth;
var h = scene3d.offsetHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, w / h, 0.5, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w,h);
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 2;
// document.body.appendChild(scene3d.domElement);
scene3d.appendChild(renderer.domElement);
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

animate();





