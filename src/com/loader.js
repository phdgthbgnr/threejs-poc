import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { animationglb } from './animationglb';
const loadgttf = (three, file, group, r, scene, camera, gui) => {
  const loader = new GLTFLoader();
  loader.load(
    file,
    async function (gltf) {
      const model = gltf.scene;
      const mixer = animationglb(three, gltf, gui);
      group.add(model); // this gltf.scene is centered
      group.scale.set(0.3, 0.3, 0.3); // because gltf.scene is big
      group.position.set(2, -0.1, -1);
      scene.add(group);
      const Fox = scene.getObjectByName('fox', true);
      Fox.castShadow = true; //default is false
      await r.getRenderer().compileAsync(group, scene, camera);
      r.render();
      r.setMixer(mixer);
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
};

export { loadgttf };

// console.log(gltf.animations); // Array<THREE.AnimationClip>
// console.log(gltf.scenes); // Array<THREE.Group>
// console.log(gltf.scene); // Array<THREE.Group>
// console.log(gltf.cameras); // Array<THREE.Camera>
// console.log(gltf.asset); // Object
