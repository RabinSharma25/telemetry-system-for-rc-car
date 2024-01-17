


import * as THREE from 'three'
// import { TextGeometry } from 'three/addons/geometries/TextGeometry'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

const loader = new THREE.TextureLoader()


const Planegeometry = new THREE.PlaneGeometry( 10, 10 );
const Planematerial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( Planegeometry, Planematerial );
plane.rotateX(-Math.PI/3);
// plane.visible = false;
// scene.add( plane );


// const ambient = new THREE.AmbientLight(0x999999)
// scene.add(ambient);
// const light =  new THREE.DirectionalLight(0xffffff);
// light.position.set(0,0,6);
// scene.add(light);

// Create a box geometry
const geometry = new THREE.BoxGeometry();
// geometry.
// geometry.attributes.position.name = "front";
console.log(geometry);
const material = new THREE.MeshBasicMaterial(
    {   
       map: loader.load("cat.png")
        // color:0x2727e6
        // map:loader.load("front.png")
    
    }
    );
const box = new THREE.Mesh(geometry, material);
box.position.set(0,2,0);
scene.add(box);

const grid = new THREE.GridHelper(20,100,100,100);
grid.rotateX(Math.PI/5)
scene.add(grid);
grid .position.set(0,-2,0);




const orbit = new OrbitControls(camera,renderer.domElement);
orbit.update();
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

