const animationglb = (three, gltf, gui) => {
  const mixer = new three.AnimationMixer(gltf.scene);
  const survey = gltf.animations[0];
  const walk = gltf.animations[1];
  const run = gltf.animations[2];
  let lastAction = null;
  let activeAction = null;

  const params = {
    stop: true,
    survey: false,
    walk: false,
    run: false,
  };
  const anim = gui.addFolder('Fox animation');
  anim
    .add(params, 'stop')
    .listen()
    .onChange(function (val) {
      setChecked('stop', null);
    });

  anim
    .add(params, 'survey')
    .listen()
    .onChange(function (val) {
      setChecked('survey', mixer.clipAction(survey));
    });

  anim
    .add(params, 'walk')
    .listen()
    .onChange(function (val) {
      setChecked('walk', mixer.clipAction(walk));
    });

  anim
    .add(params, 'run')
    .listen()
    .onChange(function (val) {
      setChecked('run', mixer.clipAction(run));
    });

  const setChecked = (prop, toAction) => {
    for (let param in params) {
      params[param] = false;
    }
    params[prop] = true;
    // swap actions
    console.log(activeAction);
    if (toAction == null) {
      if (activeAction) activeAction.fadeOut(1);
      activeAction = null;
    } else {
      if (toAction != activeAction) {
        lastAction = activeAction;
        activeAction = toAction;
        if (lastAction) lastAction.fadeOut(1);
        activeAction.reset();
        activeAction.fadeIn(1);
        activeAction.play();
      }
    }
  };
  return mixer;
};

export { animationglb };
