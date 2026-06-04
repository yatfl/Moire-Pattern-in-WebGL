import * as THREE from 'three';
import morieVertexShader from './shaders/Morie/vertex.glsl';
import morieFragmentShader from './shaders/Morie/fragment.glsl';

const textureLoader = new THREE.TextureLoader();
const nameTexture = textureLoader.load('/name.webp');
nameTexture.wrapS = THREE.RepeatWrapping;
nameTexture.wrapT = THREE.RepeatWrapping;

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const cursor = new THREE.Vector2(0, 0);
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width;
    cursor.y = 1 - event.clientY / sizes.height;
});

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.set(0, 0, 0.7);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const material = new THREE.ShaderMaterial({
    vertexShader: morieVertexShader,
    fragmentShader: morieFragmentShader,
    uniforms: {
	uNameTexture: new THREE.Uniform(nameTexture),
        uCursor: new THREE.Uniform(cursor),
    },
    transparent: true,
});
const plane1 = new THREE.Mesh(geometry, material);
scene.add(plane1);

const plane2 = new THREE.Mesh(geometry, material);
scene.add(plane2);

const speed = 0.001;
const tick = () => {
    renderer.render(scene, camera);
    plane2.position.x += speed;
    window.requestAnimationFrame(tick);
};
tick();
