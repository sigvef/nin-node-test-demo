(function(global) {
  class SSAONode extends NIN.ShaderPassNode {
    constructor(id, options) {
      super(id, {
        inputs: {
          depth: new NIN.TextureInput(),
          render: new NIN.TextureInput()
        },
        shader: THREE.SSAOShader
      });
    }

    resize() {
      super.resize();
      this.shader.uniforms.size.value.set(16 * GU, 9 * GU);
    }

    update(frame) {
      var depthTexture = this.inputs.depth.getValue();
      var renderTexture = this.inputs.render.getValue();
      this.shader.uniforms.tDepth.value = depthTexture;
      this.shader.uniforms.tDiffuse.value = renderTexture;
    }
  }

  global.SSAONode = SSAONode;
})(this);
