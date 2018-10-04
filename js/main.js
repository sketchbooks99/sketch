var container, color;
var camera, cameraTarget, scene, renderer;
var group, textMesh1, textMesh2, textGeo, meterial;
var firstLetter = true;

var text = 'Kiuchi',
        height = 20,
        size = 70,
        hover = 30,
        curveSegments = 4,
        bevelThickness = 2,
        bevelSize = 1.5,
        bevelSegments = 3;

var font = null;
var mirror = true;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  // camera
  camera = new THREE.PerspectiveCamera(30, window.innerHeight / window.innerHeight, 1, 1500);
  camera.position.set(0, 400, 700);

  cameraTarget = new THREE.Vector3(0, 0, 0);

  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 250, 1400);


  group = new THREE.Group();
  group.position.y = 100;

  scene.add(group);

  var loader = new THREE.TTFLoader();

  loader.load('font/font.ttf', function(json) {
    font = new THREE.Font(json);
    createText();
  });

  var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.5, transparent: true})
  );
  plane.position.y = 100;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
}

// 画面サイズが変更された時
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updaterojectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// テキスト生成
function createText() {
  textGeo = new THREE.TextBufferGeometry(text, {
    font: font,
    size: size,
    height: height,
    curveSegments: curveSegments,

    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: true
  });

  textGeo.computeBoudingBox();
  textGeo.computeVertexNormals();

  var centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

  textMesh1 = new THREE.Mesh(textGeo, material);

  textMesh1.position.x = centerOffset;
  textMesh1.position.y = hover;
  textMesh1.position.z = 0;

  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = Math.PI * 2;

  group.add(textMesh1);
}

// アニメート
function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
  camera.lookAt(cameraTarget);
  renderer.render(scene, camera);
}
