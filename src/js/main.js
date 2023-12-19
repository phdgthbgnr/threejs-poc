import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import GUI from 'lil-gui';

// Custom modules
// render
import { rendering } from '../com/render';
// Lights
import { spotlight } from '../com/lights/spotlight';
import { ambientlight } from '../com/lights/ambientlight';

const gui = new GUI();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.5, 200);
camera.position.set(0, 45, 50);

// Add mainGroup
const loader = new GLTFLoader();
const mainGroup = new THREE.Group();
scene.add(mainGroup);

const renderA = new rendering(THREE, scene, camera, mainGroup);
renderA.spin();

// const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

const controls = new OrbitControls(camera, renderA.getRendererDomElement());
controls.addEventListener('change', renderA.render); // use if there is no animation loop
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

const groundGeometry = new THREE.BoxGeometry(1000, 10000, 2);
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

    await renderA.getRenderer().compileAsync(mainGroup, scene, camera);

    // scene.add(model);

    renderA.render();
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

// add spoptlight
spotlight(THREE, mainGroup, gui, renderA.getRenderer(), scene);
// add ambientlight
ambientlight(THREE, scene);

renderA.render();

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
