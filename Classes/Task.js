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
        let output = ""

        output += `Name: ${this.name}\n`
        output += `Description: ${this.description}\n`
        output += `Status: ${this.status}\n`
        output += `Position: ${this.position}\n`
        output += `Is Finished: ${this.finished}`

        return output;
    }

    show(x, y) {

        // main box
        rect(x, y, 380, 120);

        // green box which represents mark as done button maybe?
        fill(0, 150, 0);
        rect(x + 10, y + 10, 20, 20)
        fill(255);

        // red box for delete button maybe?
        fill(150, 0, 0);
        rect(x + 350, y + 10, 20, 20)
        fill(255);

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
    




    

