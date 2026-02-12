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

    //Adds Task object to storage in List object.
    addTask(task){
        this.listStorage.push(task);
        // set the position of the task
        task.setPosition(this.listStorage.length - 1);

        // create callback functions so that the task can remotely control this list

        // give the task a moveDown callback function which calls the list's moveDown method
        task.moveDown = () => {
            const currentIndex = this.listStorage.indexOf(task);
            this.moveDown(currentIndex); // tell the list to move the task
        };

        // give the task a moveUp callback function which calls the list's moveUp method
        task.moveUp = () => {
            const currentIndex = this.listStorage.indexOf(task);
            this.moveUp(currentIndex); // tell the list to move the task
        };

    }

    removeTask(task){
        let storage = this.getStorage();
        const indx = storage.findIndex(t => t.name === task.name);

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
        if(index >= listStorage.length - 1){
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
        this.addTask(new Task())
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
        refresh()
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
        const stringObj = JSON.stringify(this)
        localStorage.setItem(listID, stringObj);
    }
    


    getFromLocalStorage(listId){
        //gets data
        const data = localStorage.getItem(listId);


        //fail safe to check if there is data
        if(data === null){
            return;
        }

        //converts data back
        const parsedData = JSON.parse(data);

        //sets the name of the list to the name saved in local Storage
        this.name =  parsedData.name;

        //asinged the objs to a class so it regains its methods
        if (parsedData.listStorage) {
            this.listStorage = parsedData.listStorage.map(item => Task.fromJSON(item));
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
            console.log("show")
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
