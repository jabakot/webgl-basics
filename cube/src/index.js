const three = require("three");

function initScene() {
  const scene = new three.Scene();
  const camera = new three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return { scene, camera, renderer };
}

function createCube(scene, camera) {
  const geometry = new three.BoxGeometry(1, 1, 1);
  const material = new three.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  });
  const cube = new three.Mesh(geometry, material);
  cube.rotation.x += 0.5;
  cube.rotation.y += 0.3;
  scene.add(cube);
  camera.position.z = 3;
  return cube;
}

function draw() {
  const { scene, camera, renderer } = initScene();
  const cube = createCube(scene, camera);
  const render = () => renderer.render(scene, camera);
  const animate = function(render, cube)  {
    requestAnimationFrame(() =>animate(render, cube));
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    render();
  };
  animate(render, cube);
}

document.addEventListener("DOMContentLoaded", () => {
  draw();
});
