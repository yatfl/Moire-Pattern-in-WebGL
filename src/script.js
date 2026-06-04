import * as THREE from 'three';

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
    console.log(cursor);
});

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.set(0, 0, 5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();
