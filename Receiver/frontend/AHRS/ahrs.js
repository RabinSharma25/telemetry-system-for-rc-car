import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let roll = 0; 
let pitch = 0;
let  yaw=0;
let lastTapTime = 0;
let dataArray;



/************** setup the scene object *****************/
const scene = new THREE.Scene();


/************** setup the camera proportions ***************/
const scene3d = document.getElementById("scene3d");
const w = scene3d.offsetWidth+100;
const h = scene3d.offsetHeight+100;
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 2, 3);
camera.lookAt(0, 0, 0);
// camera.position.z = 5;

/************** setup the three.js renderer **************/
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h, false);
scene3d.appendChild(renderer.domElement);

/*************** setup euler system of three.js ****************/
const euler = new THREE.Euler(pitch, yaw, roll);

/************** Create the loader object to load the images **************/
const loader = new THREE.TextureLoader()

/*************** setup the car mesh ****************/
const carGeometry = new THREE.BoxGeometry(3, 0.5, 1.7,40,40,40);
const carMaterials = [
    new THREE.MeshBasicMaterial({map: loader.load("front.png")}), // Front
    new THREE.MeshBasicMaterial({map: loader.load("back.png")}), // Back
    new THREE.MeshBasicMaterial({map: loader.load("top.png")}), // Top
    new THREE.MeshBasicMaterial({ map: loader.load("bottom.png")}), // Bottom
    new THREE.MeshBasicMaterial({map: loader.load("left.png")}), // Right
    new THREE.MeshBasicMaterial({map: loader.load("right.png")})  // Left
    // new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Front
    // new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Back
    // new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top
    // new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom
    // new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Right
    // new THREE.MeshBasicMaterial({ color: 0x0000ff })  // Left
];
const carMesh = new THREE.Mesh(carGeometry, carMaterials);



/*******  setup the wheels mesh for individual wheel *********/
const wheelGeometry = new THREE.SphereGeometry(0.4, 40, 40);
const wheelMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xFF69B4 }), // Pinkish color
    new THREE.MeshBasicMaterial({ color: 0x00BFFF }), // Sky Blue color
    new THREE.MeshBasicMaterial({ color: 0xFF69B4 }), // Pinkish color
    new THREE.MeshBasicMaterial({ color: 0x00BFFF })  // Sky Blue color
];
const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterials[0]);
const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterials[1]);
const rearLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterials[2]);
const rearRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterials[3]);



/******************  Position the wheels relative to the car *************/
frontLeftWheel.position.set(-1, 0, 1);   // Adjusted position
frontRightWheel.position.set(1, 0, 1);    // Adjusted position
rearLeftWheel.position.set(-1, 0, -1);    // Adjusted position
rearRightWheel.position.set(1, 0, -1); 


/************ Create a group to hold the car and wheels together **************/
const carGroup = new THREE.Group();
carGroup.add(carMesh);
carGroup.add(frontLeftWheel);
carGroup.add(frontRightWheel);
carGroup.add(rearLeftWheel);
carGroup.add(rearRightWheel);


/************* Create the helper grid plane **************/
const grid = new THREE.GridHelper(20,100,100,100);
// grid.rotateX(Math.PI/5)
grid .position.set(0,-2,0);


/*************** Create the axes Helper for our scene *************/
const axesHelper = new THREE.AxesHelper(10);
axesHelper.setColors(0x0000ff, 0xff0000, 0x013220);


/**************Add the all the meshes to the scene *************/
scene.add(carGroup);
scene.add(grid);
scene.add(axesHelper);


/***************** Create the orbit controls using 
                which we can move
 the scene with our mouse *************************/
const orbit = new OrbitControls(camera,renderer.domElement);
orbit.update();



/************ Websocket connection for realtime data *****************/
// const socket = new WebSocket("ws://localhost:3000");
// socket.addEventListener("message", (event) => {
//     event.preventDefault();
//     dataArray = event.data.split(',');
//     roll = degrees_to_radians(parseFloat(dataArray[0]));
//     pitch = degrees_to_radians(parseFloat(dataArray[1]));
//     yaw = degrees_to_radians(parseFloat(dataArray[2]));
//     console.log("Imu data", roll, pitch, yaw);
// });


/*********** Function call *****************/
window.addEventListener('resize', onWindowResize);
animate();




/************* All the user defined functions are defined below ************/
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        scene3d.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

scene3d.addEventListener('click', (event) => {
    const currentTime = new Date().getTime();
    const timeSinceLastTap = currentTime - lastTapTime;

    if (timeSinceLastTap < 300) {
        toggleFullScreen();
    }

    lastTapTime = currentTime;
});



function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}


function animate() {
    requestAnimationFrame(animate);

    euler.set(pitch, (yaw-180), roll);
    carGroup.rotation.copy(euler);

    renderer.render(scene, camera);
    renderer.dispose()
}

function onWindowResize() {

    if (!document.fullscreenElement) {
        const newWidth = scene3d.offsetWidth +100;
        const newHeight = scene3d.offsetHeight +100;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix(); // Clear renderer's size to use CSS size
        renderer.setSize(newWidth, newHeight);
    }

    else{

    const newWidth = scene3d.offsetWidth -300;
    const newHeight = scene3d.offsetHeight -300;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();


    renderer.setSize(newWidth, newHeight);
    }
}


