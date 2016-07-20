(function(global) {
  class CubeNode extends NIN.Node {
    constructor(id, options) {
      super(id, {
        inputs: {
          A: new NIN.TextureInput(),
          B: new NIN.TextureInput()
        },
        outputs: {
          render: new NIN.TextureOutput(),
          depth: new NIN.TextureOutput()
        }
      })

      this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 100);

      this.camera.position.z = 5;
      this.scene = new THREE.Scene();
      this.cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshBasicMaterial());
      this.cube2 = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshBasicMaterial());
      this.cube.position.x = -1;
      this.cube2.position.x = 1;
      this.scene.add(this.cube);
      this.scene.add(this.cube2);
      this.renderTarget = new THREE.WebGLRenderTarget(640, 360, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat
      });
      this.depthRenderTarget = new THREE.WebGLRenderTarget(640, 360, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter
      });
      this.depthMaterial = new THREE.MeshDepthMaterial();
      this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
      this.depthMaterial.blending = THREE.NoBlending;
    }

    update(frame) {
      this.cube.rotation.x = frame / 47;
      this.cube.rotation.z = frame / 79;
      this.cube2.rotation.x = frame / 47;
      this.cube2.rotation.z = frame / 79;
    }

    render(renderer) {
      var A = this.inputs.A.getValue();
      var B = this.inputs.B.getValue();
      this.cube.material.map = A;
      this.cube2.material.map = B;
      this.scene.overrideMaterial = this.depthMaterial;
      renderer.render(this.scene, this.camera, this.depthRenderTarget, true);
      this.scene.overrideMaterial = null;
      renderer.render(this.scene, this.camera, this.renderTarget, true);
      this.outputs.render.setValue(this.renderTarget.texture);
      this.outputs.depth.setValue(this.depthRenderTarget.texture);
    }

    resize() {
      this.renderTarget.setSize(16 * GU, 9 * GU);
      this.depthRenderTarget.setSize(16 * GU, 9 * GU);
    }
  }

  global.CubeNode = CubeNode;
})(this);
