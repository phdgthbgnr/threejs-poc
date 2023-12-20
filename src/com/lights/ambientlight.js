const ambientlight = (three, gui, scene) => {
  const Alight = new three.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(Alight);

  let lightgui = '';

  const folders = gui.foldersRecursive();
  for (let i in folders) {
    if (folders[i]._title == 'Lights') {
      lightgui = folders[i];
    }
  }

  const params = {
    color: Alight.color.getHex(),
  };

  lightgui = lightgui != '' ? lightgui : gui.addFolder('Lights');
  const amb = lightgui.addFolder('ambientLight');
  amb.addColor(params, 'color').onChange(function (val) {
    Alight.color.setHex(val);
  });
};

export { ambientlight };
