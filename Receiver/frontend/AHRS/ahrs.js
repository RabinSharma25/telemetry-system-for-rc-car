
// import * as THREE from 'three';

// function degrees_to_radians(degrees) {
//     var pi = Math.PI;
//     return degrees * (pi / 180);
// }

// const socket = new WebSocket("ws://localhost:3000");

// let roll, pitch, yaw;
// let dataArray;

// socket.addEventListener("message", (event) => {
//     event.preventDefault();
//     dataArray = event.data.split(',');
//     roll = degrees_to_radians(parseFloat(dataArray[0]));
//     pitch = degrees_to_radians(parseFloat(dataArray[1]));
//     yaw = degrees_to_radians(parseFloat(dataArray[2]));
//     console.log("Imu data", roll, pitch, yaw);
// });

// const scene3d = document.getElementById("scene3d");
// const w = scene3d.offsetWidth+100;
// const h = scene3d.offsetHeight+100;

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
// camera.position.set(2, 2, 2);
// camera.lookAt(0, 0, 0);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(w, h, false);
// scene3d.appendChild(renderer.domElement);

// const euler = new THREE.Euler(pitch, yaw, roll);
// const carGeometry = new THREE.BoxGeometry(3, 0.5, 1.7,40,40,40);
// const wheelGeometry = new THREE.SphereGeometry(0.4, 40, 40);

// // Different colors for each side of the car
// const carMaterials = [
//     new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Front
//     new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Back
//     new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top
//     new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom
//     new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Right
//     new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Left
// ];

// // Different colors for each wheel
// const wheelMaterials = [
//     new THREE.MeshBasicMaterial({ color: 0xFF69B4 }), // Pinkish color
//     new THREE.MeshBasicMaterial({ color: 0x00BFFF }), // Sky Blue color
//     new THREE.MeshBasicMaterial({ color: 0xFF69B4 }), // Pinkish color
//     new THREE.MeshBasicMaterial({ color: 0x00BFFF })  // Sky Blue color
// ];


// // Create a multi-material object for the car
// const carMesh = new THREE.Mesh(carGeometry, carMaterials);

// // Create separate meshes for each wheel
// const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterials[0]);
// const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterials[1]);
// const rearLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterials[2]);
// const rearRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterials[3]);

// // Position the wheels relative to the car
// frontLeftWheel.position.set(-1, 0, 1);   // Adjusted position
// frontRightWheel.position.set(1, 0, 1);    // Adjusted position
// rearLeftWheel.position.set(-1, 0, -1);    // Adjusted position
// rearRightWheel.position.set(1, 0, -1); 

// // Create a group to hold the car and wheels
// const carGroup = new THREE.Group();
// carGroup.add(carMesh);
// carGroup.add(frontLeftWheel);
// carGroup.add(frontRightWheel);
// carGroup.add(rearLeftWheel);
// carGroup.add(rearRightWheel);

// scene.add(carGroup);

// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);
// axesHelper.setColors(0x0000ff, 0xff0000, 0x013220);

// function animate() {
//     requestAnimationFrame(animate);

//     euler.set(pitch, (yaw-180), roll);
//     carGroup.rotation.copy(euler);

//     renderer.render(scene, camera);
//     renderer.dispose()
// }

// function toggleFullScreen() {
//     if (!document.fullscreenElement) {
//         scene3d.requestFullscreen().catch((err) => {
//             console.error(`Error attempting to enable full-screen mode: ${err.message}`);
//         });
//     } else {
//         document.exitFullscreen();
//     }
// }

// let lastTapTime = 0;

// scene3d.addEventListener('click', (event) => {
//     const currentTime = new Date().getTime();
//     const timeSinceLastTap = currentTime - lastTapTime;

//     if (timeSinceLastTap < 300) {
//         toggleFullScreen();
//     }

//     lastTapTime = currentTime;
// });

// // ... (previous code)
// function onWindowResize() {

//     if (!document.fullscreenElement) {
//         const newWidth = scene3d.offsetWidth +100;
//         const newHeight = scene3d.offsetHeight +100;

//         camera.aspect = newWidth / newHeight;
//         camera.updateProjectionMatrix(); // Clear renderer's size to use CSS size
//         renderer.setSize(newWidth, newHeight);
//     }

//     else{

//     const newWidth = scene3d.offsetWidth -300;
//     const newHeight = scene3d.offsetHeight -300;

//     camera.aspect = newWidth / newHeight;
//     camera.updateProjectionMatrix();


//     renderer.setSize(newWidth, newHeight);
//     }
// }


// window.addEventListener('resize', onWindowResize);


// animate();




///////////////////// box for test //////////////////////

// import * as THREE from '../../backend/node_modules/three';
// import { FontLoader } from '../../backend/node_modules/three/examples/jsm/loaders/FontLoader.js'
// import { TextGeometry } from '../../backend/node_modules/three/examples/jsm/geometries/TextGeometry.js'

// import {Scene} from 
// const app = THREE.a

// const THREE = require("three");
// import * as THREE from '../frontend/node_modules/three'
// import { FontLoader } from '../node_modules/three/examples/jsm/loaders/FontLoader.js'
// import { TextGeometry } from "../node_modules/three/examples/jsm/geometries/TextGeometry.js"


import * as THREE from "../node_modules/three/build/three.module.js"

// import { TextGeometry } from "https://threejs.org/examples/js/geometries/TextGeometry.js"; // Include the TextGeometry library



// import { TextGeometry } from "../node_modules/three/examples/jsm/Addons.js"
// import { TextGeometry } from '../../backend/node_modules/three/examples/jsm/geometries/TextGeometry.js'

// import * as THREE from 'three';

const scene = new THREE.Scene();



// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Set up renderer
const renderer = new THREE.WebGLRenderer();
const container = document.getElementById('scene3d');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create a box geometry
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Set up animation
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the box
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Start the animation
animate();

