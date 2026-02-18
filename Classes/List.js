const DEFAULT_LIST_NAME = "New List";

class List{

    constructor(name){
        this.name = name || DEFAULT_LIST_NAME
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


    getNewTask(){
        let name =  prompt("Input the task name.");
        let desc = prompt("Input the tasks description.");
        return new Task(name, desc);
    }

    //Adds Task object to storage in List object.
    addTask(task){
        this.listStorage.push(task);
        // set the position of the task
        task.setPosition(this.listStorage.length - 1);

        

    }

    removeTask(task){
        let storage = this.getStorage();
        const indx = storage.findIndex(t => t.id === task.id);

        //remove task
        this.listStorage.splice(indx, indx >= 0 ? 1 : 0);

        //move to archive
        //todo

       
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
        if(index <= 0){
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
    }
    
    buttonPressedAddTask(){
        this.addTask(this.getNewTask())
        //this.addTask(new Task())
        refresh();
    }

    deleteTaskButtons(){
        for (let each of this.listStorage) {
            each.deleteTaskButtons();
        }
    }

    buttonPressedDeleteList(){
        this.deleteListButtons()
        this.deleteTaskButtons()
        listArray.splice(listArray.indexOf(this), listArray.indexOf(this)>= 0 ? 1 : 0);
        refresh();
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
        //uploads the obj it to local storage under the key name of what ever is stored in listID
        //const stringObj = JSON.stringify(this) <-- this stopped working when we added the buttons

        //does the same thing but without the buttons
        const data = {
            name: this.name,
            listStorage: this.listStorage.map(task => task.toJSON())
        };

        localStorage.setItem(listID, JSON.stringify(data));
    }
    

    getFromLocalStorage(listId){
        //gets data from local storage
        const data = localStorage.getItem(listId);
        if(data === null) return;

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
        // box
        rect(x, 10, 400, 1000, 15);

        //sets pos of buttons
        this.addTaskButton.position(x + 10, 20);
        this.deleteListButton.position(x + 310, 20);

        //shows buttons
        this.addTaskButton.show();
        this.deleteListButton.show();

        // title
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.name, x + 200, 30);
        fill(255);

        // show all tasks in this list
        if(this.listStorage.length > 0){
            //console.log("show")
            this.showTask()
        }
        
        
    
    }

    showTask(){
        let y = 70;
        for (let each of this.listStorage) {
            each.show(x + 10, y);
            y += 130;
        }
    }

}
