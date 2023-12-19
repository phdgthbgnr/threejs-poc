'use strict';
export default class rendering {
  constructor(three, scene, camera, mainGroup) {
    this.three = three;
    this.scene = scene;
    this.camera = camera;
    this.mainGroup = mainGroup;
    this.renderer = new three.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = three.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);
    this.clock = new three.Clock();
    this.mixer = false;
  }

  spin = () => {
    this.animate();
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }

    this.mainGroup.rotation.y += 0.01;
    // lightHelper.update();
    // spothelper.update();
    // plane.rotation.x += 0.01;
    // console.log(plane.rotation.x);

    this.render();
  };

  getRendererDomElement = () => {
    return this.renderer.domElement;
  };

  getRenderer = () => {
    return this.renderer;
  };

  setMixer(m) {
    this.mixer = m;
  }
}

export { rendering };
