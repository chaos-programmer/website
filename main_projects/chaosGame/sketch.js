
let group = [];
let current = 0;

let v;

let canvas;

let drawAnchor = true;

let scl = 10;
let iScl = 1;
let r = 5;
let vel = 50;
let run = true;

let controlPanel;
let noOfAnchores;
let travelDist;
let noOfAnchoresIn;
let travelDistIn;
let clearButton;
let startButton;
let sel;
let hide;

function setup(){

    createCanvas(windowWidth, windowHeight);

    //triangle
    group.push(

        {
            anchor: generateAnchors(3),
            dist: 0.5
        }
    );
    // carpet
    group.push(

        {
            anchor:[createVector(-1,-1),
                    createVector(0,-1),
                    createVector(1,-1),
                    createVector(-1,0),
                    createVector(1,0),
                    createVector(-1,1),
                    createVector(0,1),
                    createVector(1,1)],
            dist: 2/3
        }
    );
    //penta flake
    group.push(

        {
            anchor: generateAnchors(5),
            dist: 0.61803398875
        }
    );

    current = 0;//int(random(group.length));

    hide = createButton("Show Options");
    hide.addClass('hideButton');
    hide.mousePressed(hideEvent);

    controlPanel = createDiv();
    controlPanel.class('controlPanel');
    // controlPanel.addClass('hidePanel');

    // let label = createDiv("Examples:");
    // label.parent(controlPanel);

    // sel = createRadio();
    // sel.parent(controlPanel);
    // sel.option(0,"n-sided shape");
    // sel.option(1,"Sierpinski carpet");
    // sel.option(2,"Pentagonal n-flake");
    // sel.style('width', '150px');
    // sel.changed(changeEvent);
    // sel.selected("n-sided shape");

    noOfAnchores = createDiv("No of Anchores: ");
    noOfAnchores.parent(controlPanel);
    noOfAnchoresIn = createInput(group[current].anchor.length, "number");
    noOfAnchoresIn.parent(controlPanel);

    travelDist = createDiv("Jump Dist: ");
    travelDist.parent(controlPanel);
    travelDistIn = createInput(group[current].dist, "number");
    travelDistIn.parent(controlPanel);
    
    let br = createElement('br');
    br.parent(controlPanel);

    clearButton = createButton('Clear');
    clearButton.parent(controlPanel);
    clearButton.mousePressed(clearScreen);

    let br2 = createElement('br');
    br2.parent(controlPanel);

    startButton = createButton('Start');
    startButton.parent(controlPanel);
    startButton.mousePressed(restart)

    let br3 = createElement('br');
    br3.parent(controlPanel);

    //canvas to draw all points
    canvas = createGraphics(windowWidth, windowHeight);
    canvas.translate(width / 2, height / 2);

    scl = (min(width, height) / 2) - 30;

    v = p5.Vector.random2D();
}

function draw(){

    background(0);

    translate(width / 2, height / 2);

    image(canvas, -width / 2 * iScl, -height / 2* iScl, width* iScl, height* iScl);

    //drawing anchors
    if(drawAnchor){

        fill(255);
        noStroke();

        for(let i of group[current].anchor){

            ellipse(i.x * scl * iScl, i.y * scl * iScl, 15);
        }
    }

    canvas.noStroke()

    if(run){

        for(let i = 0; i < vel; i++){

            //drawing fractal
            canvas.fill(0, map(v.x, -1, 1, 0, 255), map(v.y, -1, 1, 0, 255) );

            canvas.ellipse(v.x * scl, v.y * scl, r);

            let nextAnchor = random(group[current].anchor);

            v.lerp(nextAnchor, group[current].dist);
        }
    }
}

function generateAnchors(no){

    let a = [];

    for(let i = 0; i < no; i++){

        let v = p5.Vector.fromAngle((TWO_PI / no) * i);

        a.push(v);
    }

    return a;
}

function hideEvent(){

    if(!controlPanel.hasClass('hidePanel')){

        controlPanel.addClass('hidePanel');
        
        hide.html("Show Panel");
    }
    else{

        controlPanel.removeClass('hidePanel');

        hide.html("Hide Panel");
    }
}

function changeEvent(){

    canvas.clear();

    current = sel.value();

    noOfAnchoresIn.value(group[current].anchor.length);
    travelDistIn.value(group[current].dist);
}

function clearScreen(){

    group[0].anchor = generateAnchors(int(noOfAnchoresIn.value()));
    group[0].dist = float(travelDistIn.value())

    canvas.clear();

    run = false;
}

function restart(){

    group[0].anchor = generateAnchors(int(noOfAnchoresIn.value()));
    group[0].dist = float(travelDistIn.value())

    canvas.clear();

    scl = (min(width, height) >> 1) - 30;

    run = true;
}

function mouseWheel(event){
    
    iScl += event.delta * 0.001;

    if(iScl < 0.01)
        iScl = 0.01;
}

function windowResized(){

    resizeCanvas(windowWidth, windowHeight);
    canvas.resizeCanvas(windowWidth, windowHeight);
    canvas.translate(windowWidth / 2, windowHeight / 2);

    restart();
}
