
let listManager;

function setup() {
  createCanvas(windowWidth, windowHeight);

  listManager = new Manager();
}


function draw() {
  background(220);
  listManager.update();
  listManager.show();
}


