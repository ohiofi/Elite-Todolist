const TASK_STATES = {
    TODO: "Todo",
    ARCHIVED: "Archived",
    DONE: "Done"
}


const DEFAULT_TASK_NAME =   "New Task";
const DEFAULT_DESCRIPTION = "";
const DEFAULT_STATUS =      TASK_STATES.TODO;
const DEFAULT_POSITION =    0;
const DEFAULT_FINISHED =    false;

class Task {
    constructor(name, desc, status, position) { 
        this.name =        name     || DEFAULT_TASK_NAME;
        this.description = desc     || DEFAULT_DESCRIPTION;
        this.status =      status   || DEFAULT_STATUS;
        this.position =    position || DEFAULT_POSITION;
        this.finished =                DEFAULT_FINISHED;

        this.markTaskDoneButton = createButton(`Mark Done`);
        this.markTaskDoneButton.hide();
        this.markTaskDoneButton.mousePressed(() => this.buttonPressedMarkDone());
        
        this.deleteTaskButton = createButton(`Delete Task`);
        this.deleteTaskButton.hide();
        this.deleteTaskButton.mousePressed(() => this.buttonPressedDelete());

    }

    //getters and setters
    getName()     { return this.name }
    getDesc()     { return this.description }
    getStatus()   { return this.status }
    getPosition() { return this.position}
    isFinished()  { return this.finished }

    setName(newName)       { this.name =        newName   || DEFAULT_TASK_NAME }
    setDesc(newDesc)       { this.description = newDesc   || DEFAULT_DESCRIPTION }
    setStatus(newStatus)   { this.status =      newStatus || DEFAULT_STATUS }
    setPosition(newPos)    { this.position =    newPos    || DEFAULT_POSITION }
    setFinished(condition) { this.finished =    condition || DEFAULT_FINISHED }

    //im not saying that this method should be in the list but it should definitely be in the list
    setArchived() {
        this.setStatus(TASK_STATES.ARCHIVED);
    }

    //kinda barebones but hopefully the list class can carry
    setCompleted() {
        this.setStatus(TASK_STATES.DONE);
        this.setFinished(true);
    }

    //basically slides the position of the task up or down 1 spot (world record for fastest annihilation of the webapp)
    slidePosition(direction) {
        if (direction == 0) { //do not.
            return;
        }
        let normDirection = direction / Math.abs(direction); //wizard spell to normalize the direction to either 1 or -1 (in theory)
        this.setPosition(normDirection);
    }
    

    //methods
    toString() {
        return `Name: ${this.name}\n Description: ${this.description}\n Status: ${this.status}\n Position: ${this.position}\n Is Finished: ${this.finished}`;
    }

    deleteTaskButtons(){
        this.markTaskDoneButton.remove();
        this.deleteTaskButton.remove();
    }

    buttonPressedMarkDone(){
        this.setCompleted();
        refresh();
    }

    buttonPressedDelete(){
        let list = this.getListTask()
        this.deleteTaskButtons()
        list.removeTask(this);
        refresh();
    }

    //gets the list that the task is in
    getListTask(){
        for(let list of listArray){
            let storage = list.getStorage();
            if(storage.findIndex(t => t.name === this.name) != -1){
                return list
            }
        }
    }

    show(x, y) {

        // main box
        rect(x, y, 380, 120, 10);

        // sets pos of buttons        
        this.markTaskDoneButton.position(x + 10, y+10);
        this.deleteTaskButton.position(x + 285, y+10);

        //shows buttons
        this.markTaskDoneButton.show();
        this.deleteTaskButton.show();

        // text slop
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.name, x + 190, y + 30);
        text(this.description, x + 190, y + 60);
        fill(255, 0, 0);
        text(this.status, x + 190, y + 90);
        fill(255);
    }

    static fromJSON(data) {
        return new Task(
            data.name, 
            data.description, 
            data.status, 
            data.position, 
            data.finished
        );
    }
}
    




    

