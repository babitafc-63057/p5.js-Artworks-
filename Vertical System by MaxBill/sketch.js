let mode = 0;
let spinPhase = 0;

let osc1, osc2, osc3;
let reverb;
let audioStarted = false;

function setup(){

createCanvas(700,850);
textAlign(CENTER);
noStroke();

reverb = new p5.Reverb();

/* create oscillators once */

osc1 = new p5.Oscillator('sine');
osc2 = new p5.Oscillator('sine');
osc3 = new p5.Oscillator('sine');

osc1.start();
osc2.start();
osc3.start();

osc1.amp(0);
osc2.amp(0);
osc3.amp(0);

reverb.process(osc1,3,2);
reverb.process(osc2,3,2);
reverb.process(osc3,3,2);

}

function draw(){

background('#fff1c3');

fill('#222');

textSize(25);
  textFont('COURIER NEW')
  textStyle('bold')
  
text("V E R T I C A L  S Y S T E M",width/2,80);

   textStyle('normal')
  
textSize(20);
text("Inspired by Max Bill",width/2,110);

translate(0,40);
  
/* artwork panel */

let panelW = 520;
let panelH = 556;

let x = (width-panelW)/2;
let y = 150;

let cw = panelW/9;

let yA = y + 92;
let yB = y + 230;
let yC = y + 322;
let yD = y + 437;
let y1 = y + panelH;


/* ---------- ORIGINAL ---------- */

if(mode==0){

drawOriginal(x,y,cw,yA,yB,yC,yD,y1);

}


/* ---------- SPIN ---------- */

if(mode==1){

spinPhase += 0.05;

for(let col=0; col<9; col++){

let scaleW = abs(cos(spinPhase + col*0.3));

let cx = x + col*cw + cw/2;
let w = cw * scaleW;

push();
translate(cx,0);
drawColumn(col,-w/2,y,w,yA,yB,yC,yD,y1);
pop();

}

}


/* ---------- MUTATION ---------- */

if(mode==2){

for(let col=0; col<9; col++){

let n = noise(col*0.4,frameCount*0.02);
let split = map(n,0,1,y+100,y1-100);

drawMutation(col,split,x,y,cw,y1);

}

}

translate(0,-25);
/* footer */

fill('#333');
textSize(13);

text(
"Click on the canvas to activate the generative states",
width/2,
820
);

}


/* ---------- ORIGINAL DRAW ---------- */

function drawOriginal(x,y,cw,yA,yB,yC,yD,y1){

fill('#f45c43'); rect(x + cw*0, y, cw, yC-y);
fill('#59c883'); rect(x + cw*0, yC, cw, y1-yC);

fill('#b23b88'); rect(x + cw*1, y, cw, yD-y);
fill('#efc100'); rect(x + cw*1, yD, cw, y1-yD);

fill('#59c883'); rect(x + cw*2, y, cw, yC-y);
fill('#f45c43'); rect(x + cw*2, yC, cw, y1-yC);

fill('#efc100'); rect(x + cw*3, y, cw, yB-y);
fill('#b23b88'); rect(x + cw*3, yB, cw, y1-yB);

fill('#f45c43'); rect(x + cw*4, y, cw, yA-y);
fill('#59c883'); rect(x + cw*4, yA, cw, y1-yA);

fill('#b23b88'); rect(x + cw*5, y, cw, yB-y);
fill('#efc100'); rect(x + cw*5, yB, cw, y1-yB);

fill('#59c883'); rect(x + cw*6, y, cw, yC-y);
fill('#f45c43'); rect(x + cw*6, yC, cw, y1-yC);

fill('#efc100'); rect(x + cw*7, y, cw, yD-y);
fill('#b23b88'); rect(x + cw*7, yD, cw, y1-yD);

fill('#f45c43'); rect(x + cw*8, y, cw, yC-y);
fill('#59c883'); rect(x + cw*8, yC, cw, y1-yC);

}


/* ---------- SPIN DRAW ---------- */

function drawColumn(col,x,y,w,yA,yB,yC,yD,y1){

if(col==0||col==4||col==8){
fill('#f45c43'); rect(x,y,w,yC-y);
fill('#59c883'); rect(x,yC,w,y1-yC);
}

if(col==1){
fill('#b23b88'); rect(x,y,w,yD-y);
fill('#efc100'); rect(x,yD,w,y1-yD);
}

if(col==2){
fill('#59c883'); rect(x,y,w,yC-y);
fill('#f45c43'); rect(x,yC,w,y1-yC);
}

if(col==3){
fill('#efc100'); rect(x,y,w,yB-y);
fill('#b23b88'); rect(x,yB,w,y1-yB);
}

if(col==5){
fill('#b23b88'); rect(x,y,w,yB-y);
fill('#efc100'); rect(x,yB,w,y1-yB);
}

if(col==6){
fill('#59c883'); rect(x,y,w,yC-y);
fill('#f45c43'); rect(x,yC,w,y1-yC);
}

if(col==7){
fill('#efc100'); rect(x,y,w,yD-y);
fill('#b23b88'); rect(x,yD,w,y1-yD);
}

}


/* ---------- MUTATION DRAW ---------- */

function drawMutation(col,split,x,y,cw,y1){

if(col==0||col==4||col==8){
fill('#f45c43'); rect(x+cw*col,y,cw,split-y);
fill('#59c883'); rect(x+cw*col,split,cw,y1-split);
}

if(col==1){
fill('#b23b88'); rect(x+cw*col,y,cw,split-y);
fill('#efc100'); rect(x+cw*col,split,cw,y1-split);
}

if(col==2){
fill('#59c883'); rect(x+cw*col,y,cw,split-y);
fill('#f45c43'); rect(x+cw*col,split,cw,y1-split);
}

if(col==3){
fill('#efc100'); rect(x+cw*col,y,cw,split-y);
fill('#b23b88'); rect(x+cw*col,split,cw,y1-split);
}

if(col==5){
fill('#b23b88'); rect(x+cw*col,y,cw,split-y);
fill('#efc100'); rect(x+cw*col,split,cw,y1-split);
}

if(col==6){
fill('#59c883'); rect(x+cw*col,y,cw,split-y);
fill('#f45c43'); rect(x+cw*col,split,cw,y1-split);
}

if(col==7){
fill('#efc100'); rect(x+cw*col,y,cw,split-y);
fill('#b23b88'); rect(x+cw*col,split,cw,y1-split);
}

}


/* ---------- CLICK INTERACTION ---------- */

function mousePressed(){

if(!audioStarted){
userStartAudio();
audioStarted = true;
}

mode++;

/* STATE 1 */

if(mode==1){

osc1.freq(261.63);
osc2.freq(329.63);
osc3.freq(392.00);

osc1.amp(0.05,0.5);
osc2.amp(0.04,0.5);
osc3.amp(0.03,0.5);

}

/* STATE 2 */

if(mode==2){

osc1.freq(293.66);
osc2.freq(349.23);
osc3.freq(440.00);

osc1.amp(0.06,0.5);
osc2.amp(0.05,0.5);
osc3.amp(0.04,0.5);

}

/* RESET */

if(mode>2){

mode = 0;

osc1.amp(0,0.5);
osc2.amp(0,0.5);
osc3.amp(0,0.5);

}

}