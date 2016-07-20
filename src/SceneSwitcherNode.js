(function(global) {
  class SceneSwitcherNode extends NIN.Node {
    constructor(id, options) {
      super(id, {
        inputs: {
          A: new NIN.TextureInput(),
          B: new NIN.TextureInput()
        },
        outputs: {
          selected: new NIN.TextureOutput()
        }
      })
    }

    update(frame) {
      if(frame > 1000) {
        this.outputs.selected.setValue(this.inputs.A.getValue());
        this.inputs.A.enabled = true;
        this.inputs.B.enabled = false;
      } else {
        this.outputs.selected.setValue(this.inputs.B.getValue());
        this.inputs.B.enabled = true;
        this.inputs.A.enabled = false;
      }
    }

    render(renderer) {
    }

    resize() {
      this.renderTarget.setSize(16 * GU, 9 * GU);
      this.depthRenderTarget.setSize(16 * GU, 9 * GU);
    }
  }

  global.SceneSwitcherNode = SceneSwitcherNode;
})(this);
