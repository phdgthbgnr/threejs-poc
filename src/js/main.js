import * as THREE from 'three';
import GUI from 'lil-gui';

// Custom modules

// loader gltf
import { loadgttf } from '../com/loader';
// render
import { rendering } from '../com/render';
// Lights
import { spotlight } from '../com/lights/spotlight';
import { ambientlight } from '../com/lights/ambientlight';
//controls
import { controls } from '../com/controls';

const gui = new GUI();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.5, 200);
camera.position.set(0, 45, 50);

// Add mainGroup
const mainGroup = new THREE.Group();
scene.add(mainGroup);

// Render
const renderA = new rendering(THREE, scene, camera, mainGroup);

// Controls
controls(camera, renderA);

// ground
const groundGeometry = new THREE.BoxGeometry(1000, 10000, 2);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xb99c17 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true;
ground.position.y = -1;
ground.rotation.x = Math.PI / 2;
mainGroup.add(ground);

// load asseet
loadgttf(THREE, '/asset/resource/Fox.glb', mainGroup, renderA, scene, camera, gui);

// add spoptlight
spotlight(THREE, mainGroup, gui, renderA.getRenderer(), scene);
// add ambientlight
ambientlight(THREE, gui, scene);

renderA.spin();

// renderA.render();
