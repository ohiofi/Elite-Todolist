let listArray = [];
let x = 10;
// sorry i couldnt think of a better solution for spacing them out
// well actually i probably could but minimum viable product yknow

function setup() {
  createCanvas(windowWidth, windowHeight);

  listArray.push(new ArchiveList());

  let list1 = new List("Groceries");
  list1.addTask(new Task("Apples", "Get 2 Honeycrisp apples"));
  list1.addTask(new Task("Bananas", "3 or 4 green bananas"));
  listArray.push(list1);  

  let list2 = new List("Movies To Watch");
  list2.addTask(new Task("Marty Supreme", "About table tennis?"));
  list2.addTask(new Task("The Muppet Show", "Seth Rogan is in it"));
  list2.addTask(new Task("F1", "Cars go vroom"));
  listArray.push(list2);  

  //initList();

}


function draw() {
  background(220);
  x = 10;
  for (const each of listArray) {
    each.show(x, true);
    x += 410
  }
}

// function initList(){
//   background(220);
//   x = 10;
//   for (const each of listArray) {
//     each.show(x, true);
//     x += 410
//   }
// }

// function refresh(){
//   background(220);
//   x = 10;
//   if(listArray.length > 0){
//     for (const each of listArray) {
      
//       each.show(x ,false);
//       x += 410
//     }
//   }
