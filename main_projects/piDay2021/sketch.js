
let r;
let n = 3;

let lowSide;
let highSide;

let changing = 0;
let vel = 0.01;
let t = vel;

let controlPanel;
let inc;
let dec;
let hide;

function setup(){

    createCanvas(windowWidth,windowHeight);

    r = 0.15 * min(height, width);

    hide = createButton("Show Option");
    hide.addClass('hideButton');
    hide.mousePressed(hideEvent);

    controlPanel = createDiv();
    controlPanel.class('controlPanel');

    inc = createButton("increase n");
    inc.parent(controlPanel);
    inc.mousePressed(() =>{ if(changing == 0){ changing = 1}})

    let br = createElement('br');
    br.parent(controlPanel);

    dec = createButton("decrease n");
    dec.parent(controlPanel);
    dec.mousePressed(() =>{ if(changing == 0){ changing = -1}})
}
function draw(){

    background(0);

    push();
        translate(width/2,height/2);

        //circle
        noFill();
        stroke(255);
        strokeWeight(1);
        ellipse(0,0,r*2,r*2);

        //inner polygon
        noFill();
        beginShape();
            for(let i = 1; i < n+1; i++){
                let angle = i*TWO_PI/n;
                let v = p5.Vector.fromAngle(angle);
                v.setMag(r);
                vertex(v.x,v.y);
            }
        endShape(CLOSE);

        //outer polygon
        beginShape();
            for(let i = 1; i < n+1; i++){
                let angle = i*TWO_PI/n;
                let v = p5.Vector.fromAngle(angle);
                v.setMag(r/cos((TWO_PI/n)/2));
                vertex(v.x,v.y);
            }
        endShape(CLOSE);

    pop();

    //n can't be less than 3
    if(n < 3){

        n = 3;

        changing = 0;
    }
    //animation
    if(t >= 1){

        t = vel;

        changing = 0;

        n = round(n);
    }

    if(changing != 0 && t < 1){

        n = (changing == -1 ? ceil(n) : int(n)) + changing * interpolate(t);

        t += vel;
    }

    //calculation
    lowSide = 2*r*sin(PI/ceil(n));
    highSide = 2*r*tan(PI/ceil(n));
    
    let lowPi = perimeter(lowSide)/(2*r);
    let highPi = perimeter(highSide)/(2*r);
    let avgPi = (lowPi+highPi)/2;
    
	textFont('STIX Two Math');
	textAlign(CENTER);
    fill(255);

    textSize(min(width, height) / 27);
    text(highPi + " >",width/2,height/7 - min(width, height) / 19)

    textSize(min(width, height) / 19);
    text("π ≈ "+avgPi,width/2,height/6)

    textSize(min(width, height) / 27);
    text("> "+lowPi,width/2,height/6 + (height/6 - height / 7) + min(width, height) / 19)
}

function perimeter(sideLength){

    let l = 0;
    
    for(let i = 0; i < ceil(n); i++){
        l += sideLength;
    }
    
    return round(l, 9);
}

function interpolate(t_){

    return t*t*(3 - 2 * t);
}

function hideEvent(){

    if(!controlPanel.hasClass('hidePanel')){

        controlPanel.addClass('hidePanel');
        
        hide.html("Show Option");
    }
    else{

        controlPanel.removeClass('hidePanel');

        hide.html("Hide Option");
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    r = 0.15*min(height, width);
}