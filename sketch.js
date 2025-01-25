let angle = [6, 4, 8.5, 6.5, 7, 6.5, 5.5, 3];  // Angles of branches, averange enjoyment of research
let trunkLengths = [336, 504, 756, 48, 252, 72, 48, 168];  // based on how long to start making after research
let lean = [33, 50, 43.75, 46.5, 33, 25, 45, 45];  // based on digital vs physical resources, divided by 2 because too drastic of angle - and find mapping confusing
let jitterAmounts = [0.8, 1, 0.3, 0.9, 0.6, 0.8, 0.9, 1]; // based on how overwhelmed during research 
let angleControl = [15, 17.5, 14.5, 20, 8, 20, 10, 20 ] // how many resources are refernces in project 
let colour = [
  [255, 84, 71], [125, 208, 219], 
  [191, 222, 91], [92, 76, 85],
  [90, 103, 196], [255, 162, 0],
  [222, 227, 211], [247, 0, 255]
];  // not currently in use rn 

let i = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

}

function draw() {
  background(255);

  push();
  fill(0);
  strokeWeight(0.2);
  textFont('Futura')
  textSize(16);
  text('TREE PROPERTIES:', 50,100);
  text('')
  textAlign(LEFT);

  text('LEAN ', 50, 130);
  text('Higher use of digital resources leans to right: ' + lean[0+i] * 2 + "%",50,150);
  text('TRUNK LENGTH ', 50, 185);
  text('Time spent researching before making: ' + trunkLengths[0+i] + ' hrs',50,205);
  text('JITTER ',50,240);
  text('Level of overwhelm felt while researching: ' +  + jitterAmounts[0+i] * 10 + '/10', 50, 260);
  text('ANGLE ',50,300);
  text('Average enjoyment of research: ' + angle[0+i] + '/10', 50, 315);
  text('DISTANCE BETWEEN BRANCHES ', 50,350);
  text('Total number of resources referenced: ' + angleControl[0+i], 50, 370);

  pop();

  strokeWeight(2);
  stroke(255);

  // gets the trunk length for the current tree
  let trunkLength = trunkLengths[i];  
  let leanControl = lean[i];
  let jitter = jitterAmounts[i];
  let angleOffset = angleControl[i];

  translate(width / 3, height);  //translates origin to near middle of winow
  branch(trunkLength, leanControl, angleOffset, jitter);  
}

function branch(length, leanControl, angleOffset, jitter) {

  stroke(0);
  
  // Map the angle with jitter for smoothness
  let mappedAngle = map(angle[i] + random(jitter, jitter), 0, 100, -45, 45);  
  let adjustedAngleRight = mappedAngle + leanControl;
  let adjustedAngleLeft = -mappedAngle + leanControl;
  
  // Draw the main trunk or branch
  line(0, 0, 0, -length);
  translate(0, -length);

  if (length > 20) {  // Stop branching if length is too small
    push();
    rotate(radians(adjustedAngleRight + angleOffset));
    stroke(colour[i]);
    branch(length * 0.67, leanControl, angleOffset, jitter);  // Right sub-branch
    pop();

    push();
    rotate(radians(adjustedAngleLeft - angleOffset));
    stroke(colour[i]);
    branch(length * 0.67, leanControl, angleOffset, jitter);  // Left sub-branch
    pop();
  }
}

function mousePressed() {
 
  i = (i + 1) % angle.length;
  i = (i + 1) % colour.length;
  i = (i + 1) % trunkLengths.length;

  console.log("TREE PROPERTIES");
  console.log("Trunk Length" + trunkLengths[i]);
  console.log("Branch Angle: " + angle[i]);
  console.log("Branch Lean: " + lean[i]);
  console.log("Branch Color: " + colour[i]);
  console.log("Jitter Amount: " + jitterAmounts[i]);
  console.log("Angle Offset: " + angleControl[i]);


}


