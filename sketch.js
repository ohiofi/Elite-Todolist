let listArray   = [];
const X_START   = 10;
const X_PADDING = 410
let menuBar;
// sorry i couldnt think of a better solution for spacing them out
// well actually i probably could but minimum viable product yknow

//TODO: implement the new convertTaskFromSaveString() function into this... somewhere
function setup() {
  createCanvas(windowWidth, windowHeight);

  menuBar = new Bar(10, 10, windowWidth -20, 75, 15, 200)

  let i = 0;
  while (localStorage.getItem(i.toString()) !== null) {
    let list = new List();
    list.getFromLocalStorage(i.toString());
    listArray.push(list);
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
  background(220);
  showTasks();
  menuBar.show();
}



// function initList(){
//   background(220);
//   x = 10;
//   for (const each of listArray) {
//     each.show(x, true);
//     x += 410
//   }
// }

function refresh(){
  background(220);
  if(listArray.length <= 0){
    return
  }
  showTasks()
}

function showTasks() {
  for (let index = 0; index < listArray.length; index++) { //may or may not have forgotten how to use for loops for indices
    let task = listArray[index]
    let taskPos = X_START + (index * X_PADDING)
    task.show(taskPos, false) //keeping this false in just to be safe
  }
}


// If the window size changes, automatically resize the canvas to fill the browser window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//may need to be moved to another script, idk where ppl save their stuff
function convertTaskFromSaveString(saveString) { //generational amount of characters
    let brokenString = saveString.split("|") //Name, Desc, Status, Position, Id in that order
    
    //might be an easier way to do this
    let newTask = new Task(brokenString[0], brokenString[1], brokenString[2], brokenString[3].parseInt(), brokenString[4].parseInt()) 
    return newTask
}




function saveAllLists(){
  for(let i = 0; i < listArray.length; i++){
    listArray[i].pushToLocalStorage(i.toString());
  }
}



function getNewTask(){
  let name =  prompt("Input the task name.");
  let desc = prompt("Input the tasks description.");
  return new Task(name, desc);
}

function getNewList(){
    let name =  prompt("Input the list name.");
    return new List(name);
}

function styleButton(btn) {
  btn.style("background-color", "#ffffff"); 
  btn.style("color", "#000000");             
  btn.style("border", "2px solid #64e6ff"); 
  btn.style("padding", "8px 16px");
  btn.style("border-radius", "6px");
  btn.style("font-size", "14px");
  btn.style("cursor", "pointer");
}

