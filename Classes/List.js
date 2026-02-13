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
        this.deleteListButton.mousePressed(() => this.handleDeleteListPress());

        this.x = 0;
        this.y = 10;
        this.yLocationForNextTask = 70;
    }

    getStorage(){
        return this.listStorage;
    }
    getName(){
        return this.name;
    }

    setX(newLocation) {
        this.x = newLocation || 0;
        for(let each of this.listStorage){
            each.setX(newLocation + 10);
        }
    }
    setY(newLocation) { this.y = newLocation || 0}

    //Adds Task object to storage in List object.
    addTask(task){
        this.listStorage.push(task);
        // set the position of the task
        task.setPosition(this.listStorage.length - 1);

        task.setX(this.x + 10)
        task.setY(this.yLocationForNextTask);
        this.yLocationForNextTask += 140;
        this.bindCallbackFunctions(task);
    }


    bindCallbackFunctions(taskObject){
        // create callback functions so that the task can remotely control this list

        // give the task a handleMoveDownPress callback function which calls the list's moveTaskDown method
        taskObject.handleMoveDownPress = () => {
            const currentIndex = this.listStorage.indexOf(taskObject);
            this.moveTaskDown(currentIndex); // tell the list to move the task
        };

        // give the task a handleMoveUpPress callback function which calls the list's moveTaskUp method
        taskObject.handleMoveUpPress = () => {
            const currentIndex = this.listStorage.indexOf(taskObject);
            this.moveTaskUp(currentIndex); // tell the list to move the task
        };

        taskObject.handleMarkDonePress = () => {
            this.handleMoveTaskToArchive(taskObject);
            console.log("mark done");
        };

        taskObject.handleDeletePress = () => {
            this.removeTask(taskObject)
        };

    }

    handleMoveTaskToArchive(taskObject){};

    removeTask(taskObject){
        let index = this.listStorage.indexOf(taskObject);
        this.listStorage.splice(index, 1);
        taskObject.deleteTaskButtons();
        // move the rest of the tasks up
        for(let i = index; i < this.listStorage.length; i++){
            this.listStorage[i].setY(this.listStorage[i].y - 140);
        }

        this.yLocationForNextTask -= 140;

       
    }

    //swap the first index with the second index
    swapIndex(firstIndex, secondIndex){
        let temp = this.listStorage[firstIndex];
        this.listStorage[firstIndex] = this.listStorage[secondIndex]        
        this.listStorage[secondIndex] = temp;

        let tempY = this.listStorage[firstIndex].y;
        this.listStorage[firstIndex].y = this.listStorage[secondIndex].y;
        this.listStorage[secondIndex].y = tempY;
    }

    // this will swap the tasks at index and index + 1
    moveTaskDown(index){
        // do a safety check to avoid index out of range
        if(index >= this.listStorage.length - 1){
            return;
        }
        this.swapIndex(index, index + 1);
        this.listStorage[index].setPosition(index);
        this.listStorage[index + 1].setPosition(index + 1);;
    }

        // this will swap the tasks at index and index - 1
    moveTaskUp(index){
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
        this.deleteTaskButtons();
    }
    
    buttonPressedAddTask(){
        this.addTask(new Task())
    }

    deleteTaskButtons(){
        for (let each of this.listStorage) {
            each.deleteTaskButtons();
        }
    }

    // ❌ SHOULD be handleDeleteListPress and should request that ListPlanbook object handle it
    // buttonPressedDeleteList(){
    //     this.deleteListButtons()
    //     this.deleteTaskButtons()
    //     listArray.splice(listArray.indexOf(this), listArray.indexOf(this)>= 0 ? 1 : 0);
    // }

    handleDeleteListPress(){}

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

    // ❌ should not have x arg
    show() {
        // box
        rect(this.x, this.y, 400, 1000, 15);

        //sets pos of buttons
        this.addTaskButton.position(this.x + 10, 20);
        this.deleteListButton.position(this.x + 310, 20);

        //shows buttons
        this.addTaskButton.show();
        this.deleteListButton.show();

        // title
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.name, this.x + 200, 30);
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
            each.show(this.x + 10, y);
            y += 130;
        }
    }

}
