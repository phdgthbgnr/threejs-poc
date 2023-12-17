import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 5, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.set(0, 5, 50);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 0, 0.2);
controls.update();

// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// animate();

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

const loader = new GLTFLoader();
const modelLh = new THREE.Object3D();

loader.load(
  '/asset/resource/Fox.glb',
  async function (gltf) {
    const model = gltf.scene;

    // console.log(gltf.animations); // Array<THREE.AnimationClip>
    // console.log(gltf.scenes); // Array<THREE.Group>
    // console.log(gltf.scene); // Array<THREE.Group>
    // console.log(gltf.cameras); // Array<THREE.Camera>
    // console.log(gltf.asset); // Object

    modelLh.add(gltf.scene); // this gltf.scene is centered
    modelLh.scale.set(0.05, 0.05, 0.05); // because gltf.scene is big
    modelLh.position.set(2, -0.99, -1);
    scene.add(modelLh);

    // wait until the model can be added to the scene without blocking due to shader compilation

    await renderer.compileAsync(modelLh, camera, scene);

    // scene.add(model);

    render();
    //   scene.add(gltf.scene);
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
