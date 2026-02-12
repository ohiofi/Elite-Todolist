let listArray = [];
let x = 10;
// sorry i couldnt think of a better solution for spacing them out
// well actually i probably could but minimum viable product yknow

function setup() {
  createCanvas(windowWidth, windowHeight);
  let list1 = new List();
  list1.addTask(new Task("Apples", "Get 2 Honeycrisp apples"));
  list1.addTask(new Task("Bananas", "3 or 4 green bananas"));
  listArray.push(list1);  

  initList();

}


function draw() {
  
}

function initList(){
  background(220);
  x = 10;
  for (const each of listArray) {
    each.show(x, true);
    x += 410
  }
}

function refresh(){
  background(220);
  x = 10;
  if(listArray.length > 0){
    for (const each of listArray) {
      
      each.show(x ,false);
      x += 410
    }
  }

}
