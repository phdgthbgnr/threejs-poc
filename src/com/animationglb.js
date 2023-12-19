const animationglb = (three, gltf, gui) => {
  const mixer = new three.AnimationMixer(gltf.scene);
  const survey = gltf.animations[0];
  const walk = gltf.animations[1];
  const run = gltf.animations[2];

  const params = {
    survey: false,
    walk: false,
    run: false,
  };
  const anim = gui.addFolder('Animation');
  anim
    .add(params, 'survey')
    .listen()
    .onChange(function (val) {
      if (val) {
        mixer.clipAction(survey).play();
      } else {
        mixer.clipAction(survey).stop();
      }
    });

  anim
    .add(params, 'walk')
    .listen()
    .onChange(function (val) {
      if (val) {
        mixer.clipAction(walk).play();
        console.log(val);
      } else {
        mixer.clipAction(walk).stop();
      }
    });

  anim
    .add(params, 'run')
    .listen()
    .onChange(function (val) {
      if (val) {
        mixer.clipAction(run).play();
      } else {
        mixer.clipAction(run).stop();
      }
    });

  const setChecked = (prop) => {
    for (let param in params) {
      params[param] = false;
    }
    params[prop] = true;
  };
  return mixer;
  // getMixer = () => {
  //   return mixer;
  // };
};

export { animationglb };
