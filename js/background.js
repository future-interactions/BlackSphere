let isMob = new Boolean(false);
let size = 5;
let divisions = 100;
let gCol = new THREE.Color(0xff0000);
const planePos = [10,7,16,18,22];
const planeSize =5;
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
const light = new THREE.AmbientLight();
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
const texture0 = new THREE.TextureLoader().load( "assets/temp_sketch_texture.png" );
const texture1 = new THREE.TextureLoader().load( "assets/ng_content_strat.png" );

// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );
const pGeometry = new THREE.PlaneGeometry( planeSize,planeSize);
// const pMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const pMaterial0 = new THREE.MeshLambertMaterial({ map : texture0,     transparent: true,
});
const pMaterial1 = new THREE.MeshLambertMaterial({ map : texture1,     transparent: true,
});
const plane0 = new THREE.Mesh( pGeometry, pMaterial0 );
const plane1 = new THREE.Mesh( pGeometry, pMaterial1 );

plane0.material.side = THREE.DoubleSide;
plane1.material.side = THREE.DoubleSide;

scene.add( plane0 );
scene.add( plane1 );
const gridHelper = new THREE.GridHelper(size, divisions, gCol, gCol);
scene.add(gridHelper);
scene.fog = new THREE.Fog(0xffffff, 0.1, 60);
plane0.position.y = planeSize/2;
plane1.position.y = planeSize/2;

camera.position.y = 10;
camera.position.z = -20;
 plane0.position.z =planePos[0];
 plane1.position.x =planePos[1];

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
   plane0.translateZ(-planePos[0]);
  plane0.rotation.y += 0.00075;
  
  plane0.translateZ(planePos[0]);
  plane0.rotation.y += 0.00075;
   plane1.translateX(-planePos[1]);
   plane1.rotation.y += 0.00075;
   plane1.translateX(planePos[1]);
  renderer.render(scene, camera);
};
animate();