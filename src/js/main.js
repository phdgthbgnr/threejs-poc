import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 0, -0.2);
controls.update();

// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// animate();

const loader = new GLTFLoader();

loader.load(
  '/asset/resource/pepsi_cola.glb',
  async function (gltf) {
    const model = gltf.scene;

    // wait until the model can be added to the scene without blocking due to shader compilation

    await renderer.compileAsync(model, camera, scene);

    scene.add(model);

    render();
    //   scene.add(gltf.scene);
    //   gltf.animations; // Array<THREE.AnimationClip>
    //   gltf.scene; // THREE.Group
    //   gltf.scenes; // Array<THREE.Group>
    //   gltf.cameras; // Array<THREE.Camera>
    //   gltf.asset; // Object
  },
  // called while loading is progressing
  function (xhr) {
    console.log(xhr.loaded);
    console.log(xhr);
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  // called when loading has errors
  function (error) {
    console.log('An error happened');
  }
);

function render() {
  renderer.render(scene, camera);
}
