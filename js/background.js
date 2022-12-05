let isMob = new Boolean(false);
let size = 5;
let divisions = 100;
let gCol = new THREE.Color(0xff0000);
console.log(isMob);
const cW = window.innerWidth;
const cH = window.innerWidth;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  alpha: true
});
const controls = new THREE.OrbitControls(camera, renderer.domElement)
const pt = new THREE.Vector3(0, -1, -1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  size = cW / 5;
  divisions = 25;
  // gCol = 0xFFC8C8;
  gCol = 0xcccccc;
} else {
  size = cW / 5;
  divisions = 100;
  // gCol = 0xFF9E9E;
  gCol = 0xcccccc;
}
const texture = new THREE.TextureLoader().load( "assets/temp_sketch_texture.png" );
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );
const pGeometry = new THREE.PlaneGeometry( 3,3);
// const pMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const pMaterial = new THREE.MeshLambertMaterial({ map : texture,     transparent: true,
});
const plane = new THREE.Mesh( pGeometry, pMaterial );
plane.material.side = THREE.DoubleSide;
scene.add( plane );
const gridHelper = new THREE.GridHelper(size, divisions, gCol, gCol);
scene.add(gridHelper);
/* scene.fog = new THREE.Fog(0xfffeed, 0.1, 60); */
scene.fog = new THREE.Fog(0xffffff, 0.1, 60);
//gridHelper.position.y = -2.5;
plane.position.y = 1.5;
//plane.position.z = 5;
//gridHelper.rotation.x = -0.25;
//plane.rotation.x = -0.25;
camera.position.y = 2;
camera.position.z = -10;
plane.position.z =10;
camera.aspect = cW / cH;
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  location.reload();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  camera.lookAt(pt);
  gridHelper.rotation.y += 0.00075;
  plane.translateZ(-10);
  plane.rotation.y += 0.00075;
  plane.translateZ(10);
  renderer.render(scene, camera);
};
animate();