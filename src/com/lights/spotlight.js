const spotlight = (three, mainGroup, gui, renderer, scene) => {
  const spotLight = new three.SpotLight(0xffffff, 5000);
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

  const lightHelper = new three.SpotLightHelper(spotLight);
  mainGroup.add(lightHelper);

  const helper = new three.CameraHelper(spotLight.shadow.camera);
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
};

export { spotlight };
