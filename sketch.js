/*
  Empty example
 */
 var cnv, soundFile, fft, peakDetect, ampli;

 let w = 640;
 let h = 480;

 let j = 0.0;

 let sol= [];
 let qnt_sol = 12;
 let n = 0;

function preload() {
  // add the path to your sound
   soundFile = loadSound('assets/teste00.mp3');
}

function setup() {
cnv = createCanvas(w,h);
cnv.position(300,200);
frameRate(30);

fft = new p5.FFT();
peakDetect = new p5.PeakDetect(100,200,0.5,20);

setupSound();
  //when a beat is detected, call triggerBeat()
peakDetect.onPeak(triggerBeat);

//amplitude
 ampli = new p5.Amplitude();
 ampli.setInput(soundFile);

for (var i=0; i<qnt_sol; i++) {

    sol.push(new construir_sol(25+(w/qnt_sol)*i,random((h/2) - 100,(h/2) + 100)));

  }

}

function draw() {

fft.analyze();
peakDetect.update(fft);

// Get the average (root mean square) amplitude
  var amplitude = map(ampli.getLevel(),0.0,0.5,255,50);
  //console.log(amplitude);
background(50,60,amplitude);

for (var i=0; i<qnt_sol; i++) {
  sol[i].display();
}

for (var j = 0; j < n; j++) {
  if(sol[j].y > sol[j].parada){
   sol[j].move();
 }
 }

}

function triggerBeat() {
  if(n<qnt_sol){
  n++;
}
}


function construir_sol(posX, stop_){
  this.x = posX;
  this.y = h-25;
  this.diameter = 50;
  this.speed = 5;
  this.parada = stop_;

  this.move = function() {
    //this.x = posX;
    this.y += -this.speed;
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

//TOCAR AUDIO
function setupSound() {
  cnv.mouseClicked( function() {
    if (soundFile.isPlaying() ) {
      soundFile.stop();
    } else {
      soundFile.play();
    }
  });
}
