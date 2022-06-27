# fxhash-ts-three

fxhash template for WebPack, TypeScript and three.js.
Let us be more creative with assistance of TypeScript🎨

## Get started

Clone this repo and install dependency modules.

```
> git clone https://github.com/nama-gatsuo/fxhash-ts-three
> npm i
```

Start coding from '.src/index.ts'

```ts
import { WebGLRenderer, PerspectiveCamera, Scene } from 'three';
import { rand } from './utils/rand';

// Declare fxhash features at first so you can read them later.
const fxhashFeatures = {
    // Temporaliy params here, delete them.
    theme: rand() > 0.5 ? 'light' : 'dark',
    'test rand value': rand(0, 10.0),
};

// Here is your threejs app
class App {
    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;
    private scene: Scene;

    constructor(parant: HTMLElement) {
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        parant.appendChild(this.renderer.domElement);

        this.camera = new PerspectiveCamera(45, w / h, 1, 5000);
        this.camera.position.set(500, 0, 0);
        this.camera.rotation.set(0, 0, 0);
        this.camera.lookAt(0, 0, 0);

        this.scene = new Scene();
        this.scene.background = new Color('#000000');

        this.update();
    }

    update() {
        requestAnimationFrame(this.update.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}


// entry point
(() => {
    window.$fxhashFeatures = fxhashFeatures;

    const container = document.getElementById('container');
    if (container) {
        const msg = document.getElementById('message');

        if (msg) msg.innerHTML = 'Generating...';

        // Let's create a threejs app!
        new p5(sketch, container);

        if (msg) msg.remove();
    }
})();

```

## Commands

* `npm run fix` : to run ESLint and prettier to format source code nicely.
* `npm run dev` : to start dev server for development
* `npm run build` : to compile html and bundles into a zip file

## Random function

Let's use `rand()` instead of either `Math.random()` or `fxrand()`.  
`rand()` will return a desirable random value.  
On the build mode, `rand()` will return `fxrand()` value so the platform can generate unique NFT.  
On the dev mode, `rand()` will return `Math.random()` value so a developer can iterate random variations quickly.

## Shader support

You can use file extension of `.frag`, `.vert` and `.glsl` for import. They will be read as just string simply.

```ts
import postprocessVert from './shaders/passThrough.vert'
import postprocessFrag from './shaders/postprocess.frag'

const shaderPass = new ShaderPass({
    uniforms: {
        'tDiffuse': { value: null }
    },
    vertexShader: postprocessVert,
    fragmentShader: postprocessFrag
});

```

## Reference

* [MatthieuSegret/fxhash-template](https://github.com/MatthieuSegret/fxhash-template)