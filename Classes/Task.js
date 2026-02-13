const TASK_STATES = {
    TODO: "Todo",
    ARCHIVED: "Archived",
    DONE: "Done",
    DELETED: "Deleted"
}

//defaults for instance vars
const DEFAULT_TASK_NAME   = "New Task";
const DEFAULT_DESCRIPTION = "";
const DEFAULT_STATUS      = TASK_STATES.TODO;
const DEFAULT_POSITION    = 0;
const DEFAULT_FINISHED    = false;

//confirm button settings (offsets so far)
const CONFIRM_X_OFFSET    = 10
const CONFIRM_Y_OFFSET    = 10

//cancel button settings (offsets so far)
const CANCEL_X_OFFSET     = 350
const CANCEL_Y_OFFSET     = 10

//text settings
const TEXT_X_OFFSET       = 190
const TEXT_X_PADDING      = 0   //not used yet
const TEXT_Y_OFFSET       = 0   //not used yet
const TEXT_Y_PADDING      = 30

class Task {
    constructor(name, desc, status, position) { 
        this.name        = name     || DEFAULT_TASK_NAME;
        this.description = desc     || DEFAULT_DESCRIPTION;
        this.status =      status   || DEFAULT_STATUS;
        this.position =    position || DEFAULT_POSITION;
        this.finished =                DEFAULT_FINISHED;

        this.markTaskDoneButton = createButton(`Mark Done`);
        this.markTaskDoneButton.hide();
        this.markTaskDoneButton.mousePressed(() => this.handleMarkDonePress());
        
        this.deleteTaskButton = createButton(`Delete Task`);
        this.deleteTaskButton.hide();
        this.deleteTaskButton.mousePressed(() => this.handleDeletePress());

        this.x = 0;
        this.y = 0;
    }

    //getters and setters
    getName()     { return this.name }
    getDesc()     { return this.description }
    getStatus()   { return this.status }
    getPosition() { return this.position}
    isFinished()  { return this.finished }

    setName(newName)       { this.name        = newName   || DEFAULT_TASK_NAME }
    setDesc(newDesc)       { this.description = newDesc   || DEFAULT_DESCRIPTION }
    setStatus(newStatus)   { this.status      = newStatus || DEFAULT_STATUS }
    setPosition(newPos)    { this.position    = newPos    || DEFAULT_POSITION }
    setFinished(condition) { this.finished    = condition || DEFAULT_FINISHED }
    setX(newLocation) { this.x = newLocation || 0}
    setY(newLocation) { this.y = newLocation || 0}

    //im not saying that this method should be in the list but it should definitely be in the list
    setArchived() {
        this.setStatus(TASK_STATES.ARCHIVED);
    }

    //kinda barebones but hopefully the list class can carry
    setCompleted() {
        this.setStatus(TASK_STATES.DONE);
        this.setFinished(true);
    }

    // ❌ SHOULD BE handleDeletePress and then use a callback function to notify the list
    //get the list class to remove this or something
    // delete() {
    //     this.setName("Deleted Task")
    //     this.setDesc("")
    //     this.setStatus(TASK_STATES.DELETED)
    // }

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
        let output = ""

        output += `Name: ${this.name}\n`
        output += `Description: ${this.description}\n`
        output += `Status: ${this.status}\n`
        output += `Position: ${this.position}\n`
        output += `Is Finished: ${this.finished}`

        return output;
    }

    deleteTaskButtons(){
        this.markTaskDoneButton.remove();
        this.deleteTaskButton.remove();
    }

    // ❌ SHOULD BE handleMarkDonePress and then use a callback function to notify the list
    // buttonPressedMarkDone(){
    //     this.setCompleted();
    //     let list = this.getListTask();
    //     list.moveTask(listArray[0], this);
    //     //refresh();
    // }
    handleMarkDonePress(){}

    handleMoveDownPress(){}

    handleMoveUpPress(){}

    // ❌ duplicate method SHOULD BE handleDeletePress and then use a callback function to notify the list
    // buttonPressedDelete(){
    //     let list = this.getListTask()
    //     this.deleteTaskButtons()
    //     list.removeTask(this);
    //     //refresh();
    // }
    handleDeletePress(){}

    // ❌ this should NOT be the responsibility of a Task object
    //gets the list that the task is in
    // getListTask(){
    //     for(let list of listArray){
    //         let storage = list.getStorage();
    //         if(storage.findIndex(t => t.name === this.name) != -1){
    //             return list
    //         }
    //     }
    // }

    // ❌ should NOT have x, y args
    show() {

        // main box
        rect(this.x, this.y, 380, 120, 10);

        // sets pos of buttons        
        this.markTaskDoneButton.position(this.x + 10, this.y+10);
        this.deleteTaskButton.position(this.x + 285, this.y+10);

        //shows buttons
        this.markTaskDoneButton.show();
        this.deleteTaskButton.show();

        // text slop
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.name, this.x + TEXT_X_OFFSET, this.y + TEXT_Y_PADDING);
        text(this.description, this.x + TEXT_X_OFFSET, this.y + TEXT_Y_PADDING * 2);
        if (this.status === "Todo") fill(255, 0, 0);
        if (this.status === "Done") fill(0, 255, 0);
        text(this.status, this.x + TEXT_X_OFFSET, this.y + TEXT_Y_PADDING * 3);
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
