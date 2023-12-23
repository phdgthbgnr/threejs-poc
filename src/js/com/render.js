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
    this.spinFlag = true;
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

    if (this.spinFlag) this.mainGroup.rotation.y += 0.01;

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

  setSpin(s) {
    this.spinFlag = s;
  }
}

export { rendering };
