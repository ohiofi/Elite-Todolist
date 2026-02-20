const DEFAULT_LIST_NAME     = "New List";

const LIST_TITLE_COLOR      = new Color();
const LIST_BACKGROUND_COLOR = new Color(255);

class List{

    constructor(name){
        this.name = name || DEFAULT_LIST_NAME;
        this.listStorage = [];

        this.addTaskButton = createButton(`Add Task`);
        this.addTaskButton.hide();
        this.addTaskButton.mousePressed(() => this.buttonPressedAddTask());

        this.deleteListButton = createButton(`Delete List`);
        this.deleteListButton.hide();
        this.deleteListButton.mousePressed(() => this.buttonPressedDeleteList());
    }

    //Getters
    getStorage(){
        return this.listStorage;
    }

    getName(){
        return this.name;
    }

    //Adds Task object to storage in List object.
    addTask(task){
        this.listStorage.push(task);
        // set the position of the task
        task.setPosition(this.listStorage.length - 1);

    }

    removeTask(task){
        let storage = this.getStorage();
        const indx = storage.findIndex(t => t.Id === task.Id);

        //remove task
        this.listStorage.splice(indx, indx >= 0 ? 1 : 0);

        //move to archive
        //todo

        // ^ i dont really think we should, this works fine
    }

    getNewTask(){
        let name =  prompt("Input the task name.");
        let desc = prompt("Input the tasks description.");
        return new Task(name, desc);
    }

    //swap the first index with the second index
    swapIndex(firstIndex, secondIndex){
        let temp = this.listStorage[firstIndex]
        this.listStorage[firstIndex] = this.listStorage[secondIndex]
        this.listStorage[secondIndex] = temp;
    }

    // this will swap the tasks at index and index + 1
    moveDown(index){
        // do a safety check to avoid index out of range
        if(index >= this.listStorage.length - 1){
            return;
        }
        this.swapIndex(index, index + 1);
        this.listStorage[index].setPosition(index);
        this.listStorage[index + 1].setPosition(index + 1);;
    }

        // this will swap the tasks at index and index - 1
    moveUp(index){
        if(index <= 0 || index >= this.listStorage.length){
            return;
        }
        this.swapIndex(index, index - 1);
        this.listStorage[index].setPosition(index);
        this.listStorage[index - 1].setPosition(index - 1);
    }

    moveTask(list, task){
        list.addTask(task);
        this.removeTask(task);
    }

    deleteListButtons(){
        this.addTaskButton.remove()
        this.deleteListButton.remove();
        saveAllLists();
    }
    
    buttonPressedAddTask(){
        this.addTask(getNewTask())
        //this.addTask(new Task())
        refresh();
        saveAllLists();
    }

    deleteTaskButtons(){
        for (let each of this.listStorage) {
            each.deleteTaskButtons();
        }
        saveAllLists();
    }

    buttonPressedDeleteList(){
        this.deleteListButtons()
        this.deleteTaskButtons()
        localStorage.clear();
        listArray.splice(listArray.indexOf(this), listArray.indexOf(this)>= 0 ? 1 : 0);
        refresh();
        saveAllLists();
    }

    toString(){
        let output = `List: ${this.name}\n`;

        for(let i = 0; i < this.listStorage.length; i++){
            output += this.listStorage[i].toString();
            if(i < this.listStorage.length - 1){
                output += "\n";
            }
        }

        return output;
    }

    //will need worked on a bit when we get multiple lists
    pushToLocalStorage(listID){
        console.log("pushToLocalStorage is currently broken and has been disabled")
        //uploads the obj it to local storage under the key name of what ever is stored in listID
        //const stringObj = JSON.stringify(this)
        //localStorage.setItem(listID, stringObj);
    }

    getFromLocalStorage(listId){
        //gets data from local storage
        const data = localStorage.getItem(listId);
        if (!data) { //should work the same as checking if null (if not change it back to "data === null")
            return;
        }

        //converts it to be useable agige
        const parsedData = JSON.parse(data);

        //resets the name
        this.name = parsedData.name;

        //clears the data
        this.listStorage = []; 

        //needed to add the tasks to the list stoage and i forgot to do that... mb
        if (parsedData.listStorage) {
            for (let item of parsedData.listStorage) {
                let task = Task.fromJSON(item);
                this.addTask(task); 
            }
        }
    }

    show(x) {
        stroke(0);
        fill(255);
        // box
        let verticalOffsetTop = 100;
        let verticalOffsetBottom = 125;

        
        rect(x, verticalOffsetTop, 400, windowHeight - verticalOffsetBottom, 15);

        //sets pos of buttons
        this.addTaskButton.position(x + 10, verticalOffsetTop + 10);
        this.deleteListButton.position(x + 290, verticalOffsetTop + 10);

        styleButton(this.addTaskButton);
        styleButton(this.deleteListButton); 


        //shows buttons
        this.addTaskButton.show();
        this.deleteListButton.show();

        // title
        strokeWeight(0);
        textFont(TEXT_FONT)
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(LIST_TITLE_COLOR.getColor());
        text(this.name, x + 200, verticalOffsetTop + 20);
        fill(LIST_BACKGROUND_COLOR.getColor());
        textSize(12);
        strokeWeight(1);

        // show all tasks in this list
        if(this.listStorage.length > 0){
            //console.log("show")
            this.showTasks(x)
        }
    }

    showTasks(x){
        let y = 70 + verticalOffsetTop;
        for (let index = 0; index < this.listStorage.length; index++) { 
            let task = this.listStorage[index]
            task.show(x + 10, y + (130 * index));
        }
    }


//     showTask(y){
//         let taskSpacing = 150;// has to be < 130
//         for (let each of this.listStorage) {
//             each.show(x + 10, y);
//             y += taskSpacing;
//         }
//         y = 70;
//         for (let each of this.listStorage) {
//             each.showTaskMenu()
//             y += 130;
//         }
//     }

}
