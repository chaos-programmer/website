let canvas;

let cubes = [];
let light;

let showBackground = false;
let colorAlpha = 255;

function setup(){

    canvas = createCanvas(windowWidth,windowHeight,WEBGL);
    canvas.class('Canvas');

    canvas.attribute("aria-label","background");

    let Height = document.documentElement.scrollHeight;
    for(let i = 0; i < 25; i++){
        cubes.push(createVector(random(-width/2,width/2),random(-height/2,Height),random(-1000)));
    }

    light = createVector(0.5,0.75,-1);
    light.normalize();

}
function draw(){
    background(5);

    let cameraYOff = document.documentElement.scrollTop;

    camera(0, cameraYOff, (height/2)/tan(PI/6), 0, cameraYOff, 0, 0, 1, 0);

    // directionalLight(color(255), light);
    pointLight(color(255), 0, cameraYOff, 0);

    for(let i of cubes){
        push();
            translate(i.x,i.y,i.z);

            noStroke();
            fill(45);
            box(50,50);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}