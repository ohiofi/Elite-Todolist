let listArray   = [];
const X_START   = 10;
const X_PADDING = 410;
let menuBar;
let theme = "default";
// sorry i couldnt think of a better solution for spacing them out
// well actually i probably could but minimum viable product yknow

function setup() {
  createCanvas(windowWidth, windowHeight);

  menuBar = new Bar(10, 10, windowWidth - 20, 75, 15, 200);

  let i = 0;
  while (localStorage.getItem(i.toString())) {
    let list = new List();
    list.loadFromLocalStorage(i.toString());
    if (list.name === "Archive") {
      let archive = new ArchiveList();
      archive.loadFromLocalStorage(i.toString());
      listArray.push(archive);
    } else {
      listArray.push(list);
    }
    i++;
  }


  // let list0 = new List("Groceries");
  // list0.addTask(new Task("Apples", "Get 2 Honeycrisp apples"));
  // list0.addTask(new Task("Bananas", "3 or 4 green bananas"));
  // listArray.push(list0);  

  // let list1 = new List("Movies To Watch");
  // list1.addTask(new Task("Marty Supreme", "About table tennis?"));
  // list1.addTask(new Task("The Muppet Show", "Seth Rogan is in it"));
  // list1.addTask(new Task("F1", "Cars go vroom"));
  // listArray.push(list1);  


  //initList();
}

function draw() {
  if (theme === "default") {
    background(220);
  } else if (theme === "dark") {
    background(0);
  }
  showLists();
  menuBar.show();
}

// function initList(){
//   background(220);
//   x = 10;
//   for (const each of listArray) {
//     each.show(x, true);
//     x += 410;
//   }
// }

function refresh(){
  background(220);
  if(listArray.length <= 0){
    return;
  }
  showLists();
}

function showLists() {
  for (let index = 0; index < listArray.length; index++) { //may or may not have forgotten how to use for loops for indices
    let list = listArray[index];
    let taskPos = X_START + (index * X_PADDING);
    list.show(taskPos, false); //keeping this false in just to be safe
  }
}


// If the window size changes, automatically resize the canvas to fill the browser window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function saveAllLists(){
  for(let i = 0; i < listArray.length; i++){
    saveSingleList(i);
  }
}

function saveSingleList(index) {
  let list = listArray[index];
  list.pushToLocalStorage(index.toString());
}

function getNewTask(){
  let name =  prompt("Input the task name:");
  let desc = prompt("Input the task's description:");
  return new Task(name, desc);
}

function getNewList(){
    let name =  prompt("Input the list name:");
    if (name === "Archive") {
      return new ArchiveList();
    } else {
      return new List(name);
    }
}

function styleButton(btn) {
  if (theme === "default") {
    btn.style("background-color", "#ffffff"); 
    btn.style("color", "#000000"); 
  } else if (theme === "dark") {
    btn.style("background-color", "#000000"); 
    btn.style("color", "#ffffff"); 
  }      
  btn.style("border", "2px solid #64e6ff"); 
  btn.style("padding", "8px 16px");
  btn.style("border-radius", "6px");
  btn.style("font-size", "14px");
  btn.style("cursor", "pointer");
}

function hideAllMenus(){
  for(let list of listArray){
    list.hideTasksMenus();
  }
}