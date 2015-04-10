var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( 800 / - 2, 800 / 2, 600 / 2, 600 / - 2, 0.1, 3000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( 800,600 );
document.getElementById("3JSGame").appendChild( renderer.domElement );
    
var geometry = new THREE.BoxGeometry( 50, 50, 50 );
var red = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var blue = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

var cube = new THREE.Mesh( geometry, red );
scene.add( cube );

var otherCube = new THREE.Mesh( geometry, green);
scene.add(otherCube);

var otherOtherCube = new THREE.Mesh( geometry, blue);
scene.add(otherOtherCube);

var bigCube = new THREE.Mesh( new THREE.BoxGeometry( 150, 150, 150 ), blue);
scene.add(bigCube);

cube.rotation.x += 0.2;
otherCube.position.x += 100;
otherCube.rotation.x += 0.2;
otherOtherCube.position.y += 100;
otherOtherCube.rotation.x += 0.2;
bigCube.position.z = -1000;

camera.position.z = 100;
camera.position.x = -5;

var render = function () {
    requestAnimationFrame( render );

    cube.rotation.y += 0.1;
    otherCube.rotation.y += 0.1;
    otherOtherCube.rotation.y += 0.1;
    bigCube.rotation.y += 0.1;
    bigCube.rotation.x+= 0.1;
    
    renderer.render(scene, camera);
};

render();