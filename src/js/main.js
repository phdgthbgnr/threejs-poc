import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import GUI from 'lil-gui';

const gui = new GUI();

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.5, 200);
camera.position.set(0, 45, 50);

// const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); // use if there is no animation loop
controls.minDistance = 30;
controls.maxDistance = 100;
controls.target.set(0, 0, 0);
controls.update();

// const upColor = 0xffff80;
// const downColor = 0x4040ff;
// const Elight = new THREE.HemisphereLight(upColor, downColor, 1.0);
// scene.add(Elight);
// const helper = new THREE.HemisphereLightHelper(Elight, 2);
// Elight.add(helper);

const loader = new GLTFLoader();
const mainGroup = new THREE.Group();
scene.add(mainGroup);

const groundGeometry = new THREE.BoxGeometry(400, 400, 2);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xb99c17 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.receiveShadow = true;
groundMesh.position.y = -1;
groundMesh.rotation.x = Math.PI / 2;
mainGroup.add(groundMesh);

// mainGroup.castShadow = true;

// const Plight = new THREE.PointLight(0xffffff, 100, 1000);
// Plight.position.set(17, 15, 5);
// mainGroup.add(Plight);
// Plight.castShadow = true;
// const helper = new THREE.PointLightHelper(Plight, 3);
// Plight.add(helper);

loader.load(
  '/asset/resource/Fox.glb',
  async function (gltf) {
    const model = gltf.scene;

    // console.log(gltf.animations); // Array<THREE.AnimationClip>
    // console.log(gltf.scenes); // Array<THREE.Group>
    // console.log(gltf.scene); // Array<THREE.Group>
    // console.log(gltf.cameras); // Array<THREE.Camera>
    // console.log(gltf.asset); // Object

    mainGroup.add(model); // this gltf.scene is centered
    mainGroup.scale.set(0.3, 0.3, 0.3); // because gltf.scene is big
    mainGroup.position.set(2, -0.1, -1);
    scene.add(mainGroup);
    const Fox = scene.getObjectByName('fox', true);
    Fox.castShadow = true; //default is false

    // wait until the model can be added to the scene without blocking due to shader compilation

    await renderer.compileAsync(mainGroup, scene, camera);

    // scene.add(model);

    render();
    //   scene.add(gltf.scene);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + ' % loaded');
  },
  // called when loading has errors
  function (error) {
    console.log('An error happened');
  }
);

// const Dlight = new THREE.DirectionalLight(0xffffff, 1);
// Dlight.position.set(30, 60, 5);
// Dlight.castShadow = true;
// Dlight.shadow.camera.near = 0.5;
// Dlight.shadow.mapSize.x = 4096;
// Dlight.shadow.mapSize.y = 4096;
// Dlight.shadowCameraLeft = -3000;
// Dlight.shadowCameraRight = 3000;
// Dlight.shadowCameraTop = 3500;
// Dlight.shadowCameraBottom = -3000;
// const helperDlight = new THREE.DirectionalLightHelper(Dlight, 30);
// Dlight.add(helperDlight);
// const helper = new THREE.CameraHelper(Dlight.shadow.camera);
// scene.add(helper);
// scene.add(Dlight);

// const Elight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
// // Elight.castShadow = true;
// scene.add(Elight);
// const helperE = new THREE.HemisphereLightHelper(Elight, 30);
// scene.add(helperE);

const Alight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(Alight);
Alight.castShadow = true;

const spotLight = new THREE.SpotLight(0xffffff, 5000);
spotLight.position.set(150, 300, 10);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.5;
spotLight.decay = 2;
spotLight.distance = 130;
// spotLight.map = textures['disturb.jpg'];

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 10;
spotLight.shadow.focus = 1;
mainGroup.add(spotLight);

const lightHelper = new THREE.SpotLightHelper(spotLight);
mainGroup.add(lightHelper);

const helper = new THREE.CameraHelper(spotLight.shadow.camera);
mainGroup.add(helper);

const params = {
  // map: textures['disturb.jpg'],
  color: spotLight.color.getHex(),
  intensity: spotLight.intensity,
  distance: spotLight.distance,
  angle: spotLight.angle,
  penumbra: spotLight.penumbra,
  decay: spotLight.decay,
  focus: spotLight.shadow.focus,
  shadows: true,
  helpers: false,
};

// gui.add(params, 'map', textures).onChange(function (val) {
//   spotLight.map = val;
// });

const lightgui = gui.addFolder('Lumières');

const spot = lightgui.addFolder('spotLight');

spot.addColor(params, 'color').onChange(function (val) {
  spotLight.color.setHex(val);
});

spot.add(params, 'intensity', 1000, 10000).onChange(function (val) {
  spotLight.intensity = val;
});

spot.add(params, 'distance', 100, 200).onChange(function (val) {
  spotLight.distance = val;
});

spot.add(params, 'angle', 0, Math.PI / 3).onChange(function (val) {
  spotLight.angle = val;
});

spot.add(params, 'penumbra', 0, 1).onChange(function (val) {
  spotLight.penumbra = val;
});

spot.add(params, 'decay', 1, 2).onChange(function (val) {
  spotLight.decay = val;
});

spot.add(params, 'focus', 0, 1).onChange(function (val) {
  spotLight.shadow.focus = val;
});

spot.add(spotLight.position, 'x', 30, 300);
spot.add(spotLight.position, 'y', 200, 500);
spot.add(spotLight.position, 'z', 0, 500);

spot.add(params, 'shadows').onChange(function (val) {
  renderer.shadowMap.enabled = val;

  scene.traverse(function (child) {
    if (child.material) {
      child.material.needsUpdate = true;
    }
  });
});

spot
  .add(params, 'helpers')
  .listen()
  .onFinishChange(function (val) {
    lightHelper.visible = val;
    helper.visible = val;
  });

gui.open();

lightHelper.visible = false;
helper.visible = false;

// const dlightFolder = gui.addFolder('Lumière');
// dlightFolder.add(spotLight.position, 'x', -30, 200);
// dlightFolder.add(spotLight.position, 'y', 5, 200);
// dlightFolder.add(spotLight.position, 'z', -30, 200);
// dlightFolder.open();

// const nearFolder = gui.addFolder('Near');
// nearFolder.add(spotLight.shadow.camera, 'near', 0.1, 100);
// nearFolder.add(spotLight.position, 'x', 5, 30);
// nearFolder.add(spotLight.position, 'y', 5, 100);
// nearFolder.add(spotLight.position, 'z', 5, 30);
// nearFolder.open();

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);

  mainGroup.rotation.y += 0.01;
  lightHelper.update();
  // spothelper.update();
  // plane.rotation.x += 0.01;
  // console.log(plane.rotation.x);

  render();
}

animate();
