const ambientlight = (three, scene) => {
  const Alight = new three.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(Alight);
  Alight.castShadow = true;
};

export { ambientlight };
