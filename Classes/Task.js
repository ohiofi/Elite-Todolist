const TASK_STATES = {
    TODO: "Todo",
    DOING: "Doing",
    DONE: "Done",
    ARCHIVED: "Archived",
    DELETED: "Deleted"
};

//defaults for instance vars
const DEFAULT_TASK_NAME   = "New Task";
const DEFAULT_DESCRIPTION = "";
const DEFAULT_STATUS      = TASK_STATES.TODO;
const DEFAULT_POSITION    = 0;
const DEFAULT_FINISHED    = false;

//text sizes
const NAME_SIZE           = 25;
const DESC_SIZE           = 16;
const STATUS_SIZE         = 16;

//text font
const TEXT_FONT           = "Courier New"; //TODO: change the font to something thats actually good (this is just one i picked randomly)

//colors, lots of colors
const BACKGROUND_COLORS   = [
    new Color(58, 110, 165), 
    new Color(192), 
    new Color(161, 130, 118), 
    new Color(55, 18, 60), 
    new Color(27, 48, 34), 
    new Color(114, 97, 163), 
    new Color(212, 81, 19), 
    new Color(60, 110, 113), 
    new Color(58, 90, 64), 
    new Color(52, 78, 65)
];
const NAME_COLOR          = new Color();
const NAME_COLOR_STROKE   = NAME_COLOR.toInverted() ;
const DESC_COLOR          = new Color(100);
const DESC_COLOR_STROKE   = DESC_COLOR.toInverted();
const DEFAULT_WHITE       = new Color(255);

const TASK_FILL           = new Color(255);
const STROKE_COLOR        = new Color(100, 230, 255);
const STATUS_COLORS       = {
    Default: new Color(),
    Todo:    new Color(255, 0,   0),
    Doing:   new Color(255, 255, 0),
    Done:    new Color(0,   255, 0),
};

//confirm button settings (offsets so far)
const CONFIRM_X_OFFSET    = 10;
const CONFIRM_Y_OFFSET    = 10;

//cancel button settings (offsets so far)
const CANCEL_X_OFFSET     = 350;
const CANCEL_Y_OFFSET     = 10;

//text settings
const TEXT_X_OFFSET       = 190;
const TEXT_X_PADDING      = 0;   //not used yet
const TEXT_Y_OFFSET       = 0;   //not used yet
const TEXT_Y_PADDING      = 30;

//id settings
const ID_MIN              = 10000;
const ID_MAX              = 99999;

class Task {
    constructor(name, desc, status, position, id, bgColor) { 
        this.name        = name     || DEFAULT_TASK_NAME;
        this.description = desc     || DEFAULT_DESCRIPTION;
        this.status      = status   || DEFAULT_STATUS;
        this.position    = position || DEFAULT_POSITION;
        this.finished    =             DEFAULT_FINISHED;  
        this.id          = id       || Math.floor(Date.now() / ((Math.random() * 10000) + 500));
        this.bgColor     = bgColor  || random(BACKGROUND_COLORS);
        // this.id          = id       || GenerateId();  

        //let menuBg = this.bgColor.getColor()
        //let menuStroke = STROKE_COLOR.getColor()

        this.menu = new Menu(
            0,
            0, 
            100, 
            105,
            this.bgColor, 
            STROKE_COLOR, 
            this
        );
    }

    //getters and setters
    getName()     { return this.name; }
    getDesc()     { return this.description; }
    getStatus()   { return this.status; }
    getPosition() { return this.position; }
    getId()       { return this.id; }
    isFinished()  { return this.finished; }

    setName(newName)       { this.name        = newName   || DEFAULT_TASK_NAME; }
    setDesc(newDesc)       { this.description = newDesc   || DEFAULT_DESCRIPTION; }
    setStatus(newStatus)   { this.status      = newStatus || DEFAULT_STATUS; }
    setPosition(newPos)    { this.position    = newPos    || DEFAULT_POSITION; }
    setFinished(condition) { this.finished    = condition || DEFAULT_FINISHED; }

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
    

    //methods
    toString() {
        let output = "";

        output += `Name: ${this.name}\n`;
        output += `Description: ${this.description}\n`;
        output += `Status: ${this.status}\n`;
        output += `Position: ${this.position}\n`;
        output += `Is Finished: ${this.finished}`;

        return output;
    }

   toSaveString() {
        let saveString = "";

        saveString += this.getName() + "|";
        saveString += this.getDesc() + "|";
        saveString += this.getStatus() + "|";
        saveString += this.getPosition() + "|";
        saveString += this.getId() + "|";
        saveString += this.bgColor.toSaveString() + "";

        return saveString;
    }
  
    show(x, y) {

        this.x = x; // why is show (an accessor method) changing instance variables like a setter method?????
        this.y = y;

        this.menu.x = this.x;
        this.menu.y = this.y;

        // main box
        strokeWeight(3);
        stroke(STROKE_COLOR.getColor());
        push();
        if (theme === "default") {
            fill(this.bgColor.getColor());
        } else if (theme === "dark") {
            fill(this.bgColor.toDarkMode().getColor());
        }
        rect(x, y, 380, 120, 10);
        pop();

        // sets pos of buttons        
        this.menu.menuButton.position(x + 345, y + 7);

        //show move task up/down buttons
        this.menu.menuButton.show();

        strokeWeight(1);
        // text slop
        textFont(TEXT_FONT);
        //name
        textAlign(CENTER, CENTER);
        fill(NAME_COLOR.getColor());
        stroke(NAME_COLOR_STROKE.getColor());
        textSize(NAME_SIZE);
        text(this.name, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING);

        //desc
        fill(DESC_COLOR.getColor());
        stroke(DESC_COLOR_STROKE.getColor());
        textSize(DESC_SIZE);
        text(this.description, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING * 2);

        //status
        fill(STATUS_COLORS[this.status].getColor() || STATUS_COLORS["Default"].getColor());
        textSize(STATUS_SIZE);
        text(this.status, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING * 3);

        fill(DEFAULT_WHITE.getColor());
        strokeWeight(1);

        this.menu.show();
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

let generatedIds = []; //array to store already generated ids (avoids the low chance of getting the same id twice)

//Generates a random id for the task
function GenerateId() {
    let generatedId;
    let idValid = false;

    while (!idValid) {
        generatedId = Math.floor(Math.random() * ID_MAX) + ID_MIN;
        
        //extra code to make it loop back around if the id is already created (too many lines for such an unlikely problem)
        idValid = true;
        for (let id in generatedIds) {
            if (generatedId == id) {
                console.warn("ID is already created!");
                continue;
            }
            idValid = false;
            generatedIds.push(generatedId);
        }
    }

    return generatedId;
}