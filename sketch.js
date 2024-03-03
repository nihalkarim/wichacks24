/** GLOBAL VARIABLES */

//these variables are used to store the video and the poseNet model
let video;
let poseNet;
let pose;
let skeleton;

//these variables are used to initialize and store the flowfield and the particles
let scl = 10;
let cols, rows;
let inc = 0.1;
let zOff = 0;
let particles = [];
let flowfield = [];

//these variables are used to change the particle properties
let hu = 120
let sat;
let bright;
let hueInc;
let strWght;
let angleMult;
let particleNum;

//these variables are used to create the sliders (TEMP?)
let hueIncSlider, satSlider, brightSlider, alphSlider
let strWghtSlider
let angleMultSlider
let particleNumSlider;


function setup() {
  createCanvas(400, 400);

  cols = floor(width / scl);
  rows = floor(height / scl);

  for (let i = 0; i < particleNum; i++) {
    particles[i] = new Particle();
  }
  background(50);

  //create sliders
  hueIncSlider = createSlider(0, 10, 0.1);
  hueIncSlider.size(75);

  satSlider = createSlider(0, 100, 100);
  satSlider.size(75);

  brightSlider = createSlider(0, 100, 100);
  brightSlider.size(75);

  alphSlider = createSlider(0, 100, 100);
  alphSlider.size(75);

  strWghtSlider = createSlider(0.5, 10, 1);
  strWghtSlider.size(75);

  angleMultSlider = createSlider(0.1, 50, 5);
  angleMultSlider.size(75);

  particleNumSlider = createSlider(100, 3000, 300);
  particleNumSlider.size(75);



  // video = createCapture(VIDEO); //{ flipped: true }
  // video.hide();
  // poseNet = ml5.poseNet(video, modelLoaded);
  // poseNet.on('pose', gotPoses);
  // translate(width / 3, height / 4);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  text('hue:' + hueIncSlider.value(), 20, 20);
  text('sat:' + satSlider.value(), 20, 40);
  text('bright:' + brightSlider.value(), 20, 60);
  text('alph:' + alphSlider.value(), 20, 80);
  text('strWght:' + strWghtSlider.value(), 20, 100);
  text('angleMult:' + angleMultSlider.value(), 20, 120);
  text('particleNum:' + particleNumSlider.value(), 20, 140);

  drawField();

  // push();
  // translate(width, 0);   // move to far corner
  // scale(-1, 1);
  // image(video, 0, 0, width, height); //video on canvas, position, dimensions
  // pop();



  // scale(-1, 1);    // flip x-axis backwards

  // if (pose) {
  //   let eyeR = pose.rightEye;
  //   let eyeL = pose.leftEye;
  //   let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
  //   fill(255, 0, 0);
  //   ellipse(pose.nose.x, pose.nose.y, d);
  //   fill(0, 0, 255);
  //   ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
  //   ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
  //   for (let i = 0; i < pose.keypoints.length; i++) {
  //     let x = pose.keypoints[i].position.x;
  //     let y = pose.keypoints[i].position.y;

  //     fill(0, 255, 0);
  //     ellipse(x, y, 16, 16);
  //   }
  //   for (let i = 0; i < skeleton.length; i++) {
  //     let a = skeleton[i][0];
  //     let b = skeleton[i][1];
  //     strokeWeight(2);
  //     stroke(255);
  //     line(a.position.x, a.position.y, b.position.x, b.position.y);
  //   }
  // }

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
    zOff += inc / 5;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

}