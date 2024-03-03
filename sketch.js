/** GLOBAL VARIABLES */

//these variables are used to store the video and the poseNet model
let video;
let poseNet;
let pose;
let skeleton;

//these variables are used to initialize and store the flowfield and the particles
let scl = 50;
let cols, rows;
let inc = 0.1;
let zOff = 0;
let particles = [];
let flowfield = [];

//these variables are used to change the particle properties
let hu = 0;
let sat = 100; //max 100
let bright = 100; //max 100
let alph = 50; //max 100
let hueInc = 1;
let strWght = 2;
let angleMult = 15;
let zOffInc = 0.002;
let particleNum = 500;


function setup() {
  createCanvas(windowWidth, windowHeight + 150);
  colorMode(HSB, 360, 100, 100, 100);
  background(50);

  cols = floor(width / scl);
  rows = floor(height / scl);

  for (let i = 0; i < particleNum; i++) {
    particles[i] = new Particle();
  }

  video = createCapture(VIDEO); //{ flipped: true }
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  // translate(width / 2, height / 2);
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  drawField();

  // push();
  // translate(width, 0);   // move to far corner
  // scale(-1, 1);
  // image(video, 0, 0, width, height); //video on canvas, position, dimensions
  // pop();


  if (pose) {
    let nose = pose.nose;
    let wristL = pose.leftWrist;
    let wristR = pose.rightWrist;
    let ankleL = pose.leftAnkle;
    let ankleR = pose.rightAnkle;

    // fill(150);
    // rect(0, 0, 250, 100);
    // fill(0);
    // textSize(30);
    // text('bright ' + bright, 10, 30);
    // text('alph ' + alph, 10, 60);


    strWght = map(nose.x, width * .25, width * .75, 5, 0.5);

    hueInc = map(wristL.x, 0, width / 2, 5.5, .01);

    sat = map(wristR.x, 0, width / 2, 100, 10);

    bright = map(wristL.y, 0, height - 10, 120, 10);

    alph = map(wristR.y, 0, height - 10, 120, 10);

    angleMult = map(ankleL.x, 0, width, 25, 0.1);

    zOffInc = map(ankleR.x, 0, width + 100, 1.5, 0.001);


    fill(100);
    ellipse(nose.x, nose.y, 30);
    ellipse(wristL.x, wristL.y, 30);
    ellipse(wristR.x, wristR.y, 30);
    ellipse(ankleL.x, ankleL.y, 30);
    ellipse(ankleR.x, ankleR.y, 30);


  }
}

function drawField() {
  let yOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xOff, yOff, zOff) * TWO_PI * angleMult;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xOff += inc;
    }
    yOff += inc;
    zOff += zOffInc;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  hu += hueInc;

  if (hu > 360) {
    hu = 0;
  }

}

function keyTyped() {
  if (key === 's') {
    saveCanvas('wichacks-flowform', 'png');
  }
  if (key === 'f') {
    fullscreen(true);
  }
}