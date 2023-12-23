import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = (camera, renderA) => {
  const controls = new OrbitControls(camera, renderA.getRendererDomElement());
  controls.addEventListener('change', renderA.render); // use if there is no animation loop
  controls.minDistance = 30;
  controls.maxDistance = 100;
  controls.target.set(0, 0, 0);
  controls.enableDamping = true;
  controls.update();
};

export { controls };
