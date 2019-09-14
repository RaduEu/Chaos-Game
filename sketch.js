let noSeeds = 3;
let seeds = [];
let size = 400;
let curr;
let prevIndex = 0;
let inverted = false; // white on black or black on white
let restrictions = [];

function setup() {
  createCanvas(size * 2, size * 2);
  //noLoop();
  background(256);
  translate(width / 2, height / 2);
  let angle = TWO_PI / noSeeds;
  seeds = [];
  for (let i = 0; i < noSeeds; i++) {
    seeds[i] = createVector(size * sin(i * angle), size * cos(i * angle));
    //point(seeds[i].x, seeds[i].y)
  }
  curr = createVector(seeds[0].x, seeds[0].y);
  if (inverted) background(0);
  textSize(30);
  if(inverted) fill(255);
  else fill(0);
  text("No. seeds: " + noSeeds, -width/2, -height/2+30)
  text("Restrictions: " + restrictions.toString(), -width / 2, height / 2);
}

function mousePressed() {
  if (inverted) background(0);
  else background(256);
  noSeeds = floor(random(3, 11));
  restrictions = [];
  for (let i = 0; i < noSeeds; i++)
    if (random(0, 1) > 0.5) restrictions.push(i);
  setup();
}

function draw() {
  update(restrictions);
}

// if chosen is n points away from index for some a in arr return true 
function illegal(chosen, index, arr) {
  //console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    if ((noSeeds + chosen - index - arr[i]) % noSeeds == 0) return true;
    //if ((noSeeds + chosen - index + arr[i]) % noSeeds == 0) return true;
  }
  //console.log("?");
  return false;
}
//runs the simulation with arr as restrictions
function update(arr) {
  strokeWeight(1);
  translate(width / 2, height / 2);
  for (let i = 0; i < 10000; i++) {
    let nextIndex = floor(random(seeds.length));
    if (illegal(nextIndex, prevIndex, arr)) continue;
    let next = seeds[nextIndex];
    prevIndex = nextIndex;
    curr.set((curr.x + next.x) / 2, (curr.y + next.y) / 2);
    if (inverted) stroke(255);
    point(curr.x, curr.y);
  }
}