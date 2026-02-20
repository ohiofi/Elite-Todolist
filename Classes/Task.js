const TASK_STATES = {
    TODO: "Todo",
    DOING: "Doing",
    DONE: "Done",
    ARCHIVED: "Archived",
    DELETED: "Deleted"
}

//defaults for instance vars
const DEFAULT_TASK_NAME   = "New Task";
const DEFAULT_DESCRIPTION = "";
const DEFAULT_STATUS      = TASK_STATES.TODO;
const DEFAULT_POSITION    = 0;
const DEFAULT_FINISHED    = false;

//text sizes
const NAME_SIZE           = 25
const DESC_SIZE           = 16
const STATUS_SIZE         = 16

//text font
const TEXT_FONT           = "Courier New" //TODO: change the font to something thats actually good (this is just one i picked randomly)

//colors, lots of colors
const BACKGROUND_COLORS    = [new Color(58, 110, 165), new Color(192, 192, 192), new Color(161, 130, 118), new Color(55, 18, 60), new Color(27, 48, 34), new Color(114, 97, 163), new Color(212, 81, 19), new Color(60, 110, 113), new Color(58, 90, 64), new Color(52, 78, 65)]
const NAME_COLOR          = new Color(0,   0,   0)
const DESC_COLOR          = new Color(100, 100, 100)
const WHY_IS_THIS_HERE    = new Color(255, 255, 255)

const TASK_FILL           = new Color(255, 255, 255)
const STROKE_COLOR        = new Color(100, 230, 255)
const STATUS_COLORS       = {
    Todo: new Color(255, 0,   0),
    Doing: new Color(255, 255, 0),
    Done: new Color(0,   255, 0),
}

//confirm button settings (offsets so far)
const CONFIRM_X_OFFSET    = 10;
const CONFIRM_Y_OFFSET    = 10;

//cancel button settings (offsets so far)
const CANCEL_X_OFFSET     = 350;
const CANCEL_Y_OFFSET     = 10;

//menu offset
const MENU_X_OFFSET = 373
const MENU_Y_OFFSET = 9

//text settings
const TEXT_X_OFFSET       = 190;
const TEXT_X_PADDING      = 0;   //not used yet
const TEXT_Y_OFFSET       = 0;   //not used yet
const TEXT_Y_PADDING      = 30;

//id settings
const ID_MIN              = 10000
const ID_MAX              = 99999

class Task {
    constructor(name, desc, status, position, id) { 
        this.name        = name     || DEFAULT_TASK_NAME;
        this.description = desc     || DEFAULT_DESCRIPTION;
        this.status      = status   || DEFAULT_STATUS;
        this.position    = position || DEFAULT_POSITION;
        this.finished    =             DEFAULT_FINISHED;  
        this.id          = id       || GenerateId()     
        //uncomment this if u prefer this one
        // this.id          = id       || Math.floor(Date.now() / ((Math.random() * 10000) + 500))
        this.bgColor = random(BACKGROUND_COLORS).getColor();
        this.markTaskDoneButton = createButton(`Mark Done`);
        this.markTaskDoneButton.hide();
        this.markTaskDoneButton.mousePressed(() => this.buttonPressedMarkDone());
        
        this.deleteTaskButton = createButton(`Delete Task`);
        this.deleteTaskButton.hide();
        this.deleteTaskButton.mousePressed(() => this.buttonPressedDelete());

        this.editTaskButton = createButton(`Edit Task`);
        this.editTaskButton.hide();
        this.editTaskButton.mousePressed(() => this.editTask());

        this.moveTaskUpButton = createButton(`⬆️`);
        this.moveTaskUpButton.hide();
        this.moveTaskUpButton.mousePressed(() => this.slidePosition(1));
        
        this.moveTaskDownButton = createButton(`⬇️`);
        this.moveTaskDownButton.hide();
        this.moveTaskDownButton.mousePressed(() => this.slidePosition(-1));

        this.menuButton = createButton(`≡`);
        this.menuButton.hide();
        this.menuButton.mousePressed(() => this.buttonPressedMenu());

        this.id = Math.floor(Date.now() / ((Math.random() * 10000) + 500))

    }

    //getters and setters
    getName()     { return this.name }
    getDesc()     { return this.description }
    getStatus()   { return this.status }
    getPosition() { return this.position}
    getId()       { return this.id }
    isFinished()  { return this.finished }

    setName(newName)       { this.name        = newName   || DEFAULT_TASK_NAME }
    setDesc(newDesc)       { this.description = newDesc   || DEFAULT_DESCRIPTION }
    setStatus(newStatus)   { this.status      = newStatus || DEFAULT_STATUS }
    setPosition(newPos)    { this.position    = newPos    || DEFAULT_POSITION }
    setFinished(condition) { this.finished    = condition || DEFAULT_FINISHED }

    //im not saying that this method should be in the list but it should definitely be in the list
    setArchived() {
        this.setStatus(TASK_STATES.ARCHIVED);
    }

    //kinda barebones but hopefully the list class can carry
    setCompleted() {
        this.setStatus(TASK_STATES.DONE);
        this.setFinished(true);
    }

    //get the list class to remove this or something
    delete() {
        this.setName("Deleted Task");
        this.setDesc("");
        this.setStatus(TASK_STATES.DELETED);
    }

    //slides task down(-1), or up(1).
    slidePosition(direction) {
        let list = this.getListTask();
        const taskIndex = this.position

        if(direction != -1 && direction != 1){
            return;
        }

        if(direction == -1){
            list.moveDown(taskIndex);
        }else if(direction == 1){
            list.moveUp(taskIndex);
        }
        
        refresh();
        saveAllLists();
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

    //converts the Task to a save string, whoever knows how to work localstorage pls implement this
    toSaveString() {
        let saveString = ""

        saveString += this.getName() + "|"
        saveString += this.getDesc() + "|"
        saveString += this.getStatus() + "|"
        saveString += this.getPosition() + "|"
        saveString += this.getId() + ""

        return saveString
    }
    editTask(){
        let newName = prompt("Input the task name.");
        let newDescription = prompt("Input the tasks description.");
        if (newName !== "") this.name = newName;
        if (newDescription !== "") this.description = newDescription;
        this.buttonPressedMenu();
    }
    
    showTaskMenu(){

        if(!this.taskMenuOpen){
            return;
        }

        const pos = {x: this.x, y: this.y};

        // main box
        push();
        strokeWeight(5)
        stroke(STROKE_COLOR.getColor())
        rect(pos.x + MENU_X_OFFSET, pos.y + MENU_Y_OFFSET, 100, 105, 10);
        pop();

        // sets pos of buttons        
        if (this.status === "Todo") this.markTaskDoneButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 7);
        this.editTaskButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 30);
        this.deleteTaskButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 53);

        //show move task up/down buttons
        if (this.status === "Todo") this.markTaskDoneButton.show();
        this.editTaskButton.show();
        this.deleteTaskButton.show();
    }

    hideMenuButtons(){
        this.markTaskDoneButton.hide();
        this.deleteTaskButton.hide();
        this.editTaskButton.hide();
    }

    deleteTaskButtons(){
        this.moveTaskUpButton.remove();
        this.moveTaskDownButton.remove();
        this.markTaskDoneButton.remove();
        this.deleteTaskButton.remove();
        this.editTaskButton.remove();
        this.menuButton.remove();

        saveAllLists();
    }

    buttonPressedMenu(){
        if(!this.taskMenuOpen){
            this.taskMenuOpen = true;
            return;
        }else if(this.taskMenuOpen){
            this.taskMenuOpen = false;

            this.hideMenuButtons();
        }
        
    }

    buttonPressedMarkDone(){
        this.setCompleted();
        let list = this.getListTask();
        for (let i = 0; i < listArray.length; i++) {
            if (listArray[i].getName() === "Archive") {
                list.moveTask(listArray[i], this);
                break;
            }
            if (i === listArray.length - 1) {
                listArray.push(new ArchiveList);
                list.moveTask(listArray[i + 1], this);
                break;
            }
        }
        console.log(this.id + " was marked as done");
        this.buttonPressedMenu();
        refresh();
        saveAllLists();
    }

    buttonPressedDelete(){
        let list = this.getListTask();
        this.deleteTaskButtons();
        list.removeTask(this);
        refresh();
        saveAllLists();
    }

    //gets the list that the task is in
    getListTask(){
        for(let list of listArray){
            let storage = list.getStorage();
            if(storage.findIndex(t => t.Id === this.Id) != -1){
                return list;
            }
        }
    }

    show(x, y) {

        this.x = x; // why is show (an accessor method) changing instance variables like a setter method?????
        this.y = y;

        // main box
        strokeWeight(3)
        stroke(STROKE_COLOR.getColor())
        push();
        fill(this.bgColor)
        rect(x, y, 380, 120, 10);
        pop();

        // sets pos of buttons        
        this.moveTaskUpButton.position(x + 10, y+7);
        this.moveTaskDownButton.position(x + 10, y+90);
        this.menuButton.position(x + 345, y + 7);

        //show move task up/down buttons
        this.moveTaskUpButton.show();
        this.moveTaskDownButton.show();
        this.menuButton.show();

        strokeWeight(0);
        // text slop
        textFont(TEXT_FONT)
        //name
        textAlign(CENTER, CENTER);
        fill(NAME_COLOR.getColor());
        textSize(NAME_SIZE);
        text(this.name, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING);

        //desc
        fill(DESC_COLOR.getColor());
        textSize(DESC_SIZE);
        text(this.description, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING * 2);

        //status
        fill(STATUS_COLORS[this.status].getColor() || new Color(0,0,0).getColor());
        textSize(STATUS_SIZE)
        text(this.status, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING * 3);

        fill(WHY_IS_THIS_HERE.getColor()); //im confused on why were filling with white here lol (might be p5js jank)
        strokeWeight(1);

        
    }

    static fromJSON(data) {
        return new Task(
            data.name, 
            data.description, 
            data.status, 
            data.position, 
            data.finished,
            data.id
        );
    }

    
    toJSON(){
        return {
            name: this.name,
            description: this.description,
            status: this.status,
            position: this.position,
            finished: this.finished,
            id: this.id
        };
    }
}

let generatedIds = {} //array to store already generated ids (avoids the low chance of getting the same id twice)
//Generates a random id for the task (probably redundant)
function GenerateId() {
    let generatedId
    let idValid = false

    while (!idValid) {
        generatedId = Math.floor(Math.random() * ID_MAX) + ID_MIN
        
        //extra code to make it loop back around if the id is already created (too many lines for such an unlikely problem)
        idValid = true
        for (let id in generatedIds) {
            if (!(rand == id)) {
                console.warn("ID is already created!")
                continue
            }
            idValid = false
        }
    }

    return generatedId
}