
let listPlanbook;

function setup() {
  createCanvas(windowWidth, windowHeight);

  listPlanbook = new Planbook();
}


function draw() {
  background(220);
  listPlanbook.update();
  listPlanbook.show();
}


