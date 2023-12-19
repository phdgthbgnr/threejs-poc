const animationglb = (three, gltf, gui) => {
  const mixer = new three.AnimationMixer(gltf.scene);
  const survey = gltf.animations[0];
  const walk = gltf.animations[1];
  const run = gltf.animations[2];

  const params = {
    stop: false,
    walk: false,
    run: false,
  };
  const anim = gui.addFolder('Animation');
  anim.add(params, 'stop').onChange(function (val) {
    if (val) {
      mixer.clipAction(survey).play();
    } else {
      mixer.clipAction(survey).stop();
    }
  });

  anim.add(params, 'walk').onChange(function (val) {
    if (val) {
      mixer.clipAction(walk).play();
      console.log(val);
    } else {
      mixer.clipAction(walk).stop();
    }
  });

  anim.add(params, 'run').onChange(function (val) {
    if (val) {
      mixer.clipAction(run).play();
    } else {
      mixer.clipAction(run).stop();
    }
  });
  return mixer;
  // getMixer = () => {
  //   return mixer;
  // };
};

export { animationglb };
