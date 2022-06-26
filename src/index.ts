import { WebGLRenderer, PerspectiveCamera, Scene, sRGBEncoding, Color } from 'three';
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
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.setClearColor('#000000');
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

        new App(container);

        if (msg) msg.remove();
    }
})();
