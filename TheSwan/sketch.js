let osc;
let reverb;
let audioStarted = false;

function setup() {
  createCanvas(760, 900);
  noStroke();
  textAlign(CENTER);
  
  /* sound setup */
  osc = new p5.Oscillator('sine');
  osc.amp(0);
  osc.start();
  
  reverb = new p5.Reverb();
  reverb.process(osc, 3, 2);
}

function draw() {
  background('#a65034');
  
  let cx = width / 2;
  let cy = height / 2;
  let yellowRadius = 170;
  let eyeRadius = 85;
  
    
  textFont('COURIER NEW')
  textStyle('bold')
  
  /* ---------- HEADER ---------- */
  fill('#f3e7c5');
  textSize(36);

  
  text("THE SWAN: SHIFTING GAZE", width / 2, 80);
  
    textStyle('normal')
  textSize(16);
  text("After Hilma af Klint, The Swan, No.17", width / 2, 113);
  
  
  stroke('#f3e7c5');
  strokeWeight(0.6);
  line(width / 2 - 245, 130, width / 2 + 250, 130);
  
  noStroke();
  
  translate(0,50);
  
  /* ---------- OUTER RING ---------- */
  fill('#cfcac0');
  arc(cx, cy, 520, 520, HALF_PI, PI + HALF_PI, PIE);
  fill('#5f83b3');
  arc(cx, cy, 520, 520, -HALF_PI, HALF_PI, PIE);
  
  /* ---------- YELLOW HALF ---------- */
  fill('#d4be6c');
  arc(cx, cy, 340, 340, -HALF_PI, HALF_PI, PIE);
  
  /* ---------- CURSOR MOVEMENT ---------- */
  let dx = mouseX - cx;
  let dy = mouseY - cy;
  let d = sqrt(dx * dx + dy * dy);
  
  /* Check if at boundary BEFORE clamping */
  let edge = yellowRadius - eyeRadius;
  let isTouchingBoundary = (d >= edge && dx > 0);
  
  if (d > yellowRadius - eyeRadius) {
    dx *= (yellowRadius - eyeRadius) / d;
    dy *= (yellowRadius - eyeRadius) / d;
  }
  
  /* restrict to right half */
  dx = max(dx, 0);
  let eyeX = cx + dx;
  let eyeY = cy + dy;
  
  /* ---------- AUDIO ACTIVATION ---------- */
  if (!audioStarted && mouseIsPressed) {
    userStartAudio();
    audioStarted = true;
  }
  
  /* ---------- BOUNDARY SOUND ---------- */
  if (isTouchingBoundary) {
    /* soft diffused tone when touching the yellow boundary */
    osc.freq(220);
    osc.amp(0.08, 0.2);
  } else {
    osc.amp(0, 0.5);
  }
  
  /* ---------- CENTER CIRCLE ---------- */
  fill('#d69a83');
  circle(eyeX, eyeY, 170);
  
  /* ---------- BLACK HALF ---------- */
  fill('#2f2f32');
  arc(cx, cy, 340, 340, HALF_PI, PI + HALF_PI, PIE);
  
    
  translate(0,-45);

  /* ---------- FOOTER ---------- */
  fill(255);
  textSize(14);
  text("*Move the cursor*", width / 2, height - 30);
}