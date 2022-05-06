import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

// Scene, camera, renderer, controls, lights initialization

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 35, 35);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xcccccc);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

const lightAmb = new THREE.AmbientLight(0x404040, 0.8);
scene.add(lightAmb);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 15, 0);
scene.add(light);

// General information about rooms

const rooms = new THREE.Object3D();
const geometrySquareSide = new THREE.BoxGeometry(10, 10, 0.15);
const geometryRectangleSide = new THREE.BoxGeometry(20, 10, 0.15);

function addSide(data) {
  const material = data.material;
  const mesh = new THREE.Mesh(data.geometry, data.material);

  mesh.position.set(data.position[0], data.position[1], data.position[2]);
  mesh.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
  rooms.add(mesh);
}

// First room
const materialFirstRoom = new THREE.MeshLambertMaterial({ color: 0x889988 });

addSide({
  geometry: geometrySquareSide,
  material: materialFirstRoom,
  position: [-10, 0, 5],
  rotation: [0, 0, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialFirstRoom,
  position: [-10, 0, -5],
  rotation: [0, 0, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialFirstRoom,
  position: [-5, 0, 0],
  rotation: [0, -Math.PI / 2, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialFirstRoom,
  position: [-15, 0, 0],
  rotation: [0, Math.PI / 2, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialFirstRoom,
  position: [-10, -5, 0],
  rotation: [-Math.PI / 2, 0, 0],
});

// Second room

const materialSecondRoom = new THREE.MeshLambertMaterial({ color: 0x9fc5e8 });

addSide({
  geometry: geometryRectangleSide,
  material: materialSecondRoom,
  position: [20, 0, 5],
  rotation: [0, 0, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialSecondRoom,
  position: [15, 0, -15],
  rotation: [0, 0, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialSecondRoom,
  position: [30, 0, 0],
  rotation: [0, -Math.PI / 2, 0],
});

addSide({
  geometry: geometryRectangleSide,
  material: materialSecondRoom,
  position: [10, 0, -5],
  rotation: [0, Math.PI / 2, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialSecondRoom,
  position: [20, 0, -10],
  rotation: [0, -Math.PI / 2, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialSecondRoom,
  position: [25, 0, -5],
  rotation: [0, 0, 0],
});

addSide({
  geometry: geometryRectangleSide,
  material: materialSecondRoom,
  position: [20, -5, 0],
  rotation: [-Math.PI / 2, 0, 0],
});

addSide({
  geometry: geometrySquareSide,
  material: materialSecondRoom,
  position: [15, -5, -10],
  rotation: [-Math.PI / 2, 0, 0],
});

scene.add(rooms);

// Animation

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

rotateButton.addEventListener("click", rotateRooms);

function rotateRooms() {
  rooms.rotation.y -= Math.PI / 2;
}
