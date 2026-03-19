const DEFAULT_LIST_NAME = "New List";

class List {
    constructor(name) {
        this.name = name || DEFAULT_LIST_NAME;
        this.listStorage = [];

        this.menu = new Menu(
            30,
            105, 
            100, 
            105,
            this
        );
        
        this.titleColor = theme.getPaint("TextPrimary")
        this.backgroundColor = theme.getPaint("BackgroundSecondary")
        this.borderColor = theme.getPaint("StrokePrimary")
    }

    //Getters
    getStorage() {
        return this.listStorage;
    }

    getName() {
        return this.name;
    }

    //Adds Task object to storage in List object.
    addTask(task) {
        this.listStorage.push(task);
        // set the position of the task
        task.setPosition(this.listStorage.length - 1);

    }

    removeTask(task) {
        let storage = this.getStorage();
        const indx = storage.findIndex(t => t.id === task.id);

        //remove task
        this.listStorage.splice(indx, indx >= 0 ? 1 : 0);
    }

    getNewTask() {
        let name = prompt("Input the task name:");
        let desc = prompt("Input the task's description:");
        return new Task(name, desc);
    }

    //swap the first index with the second index
    swapIndex(firstIndex, secondIndex) {

        if (secondIndex < 0 || secondIndex >= this.listStorage.length) {
            return;
        }

        let temp = this.listStorage[firstIndex];
        this.listStorage[firstIndex] = this.listStorage[secondIndex];
        this.listStorage[secondIndex] = temp;

        this.setTasksPositions();
    }

    // this will swap the tasks at index and index + direction (positive or negative 1)
    move(index, direction) {
        // do a safety check to avoid index out of range
        // if(index >= this.listStorage.length + direction){
        //     return;
        // }

        if (direction == 0) { //avoids dividing by zero and other stuff that will break the app
            return;
        }

        direction = (-direction / Math.abs(direction))
        // console.log(`Slide direction is ${direction}`)

        if (direction != -1 && direction != 1) { //failsafe which isnt needed unless something evil happens
            throw new error("something evil happened :c pls fix my direction calculation")
        }

        let otherTaskIndex = index + direction;

        if (!this.listStorage[otherTaskIndex]) { //returns if theres nothing beyond the task
            return;
        }

        this.swapIndex(index, otherTaskIndex);
        this.listStorage[index].setPosition(index);
        this.listStorage[otherTaskIndex].setPosition(otherTaskIndex);
    }

    // this will swap the tasks at index and index - 1
    // moveUp(index){
    //     if(index <= 0 || index >= this.listStorage.length){
    //         return;
    //     }
    //     this.swapIndex(index, index - 1);
    //     this.listStorage[index].setPosition(index);
    //     this.listStorage[index - 1].setPosition(index - 1);
    // }

    setTasksPositions() {
        let storage = this.listStorage;
        for (let x = 0; x < this.listStorage.length; x++) {
            storage[x].setPosition(x);
        }
    }

    /**
     * 
     * @param {*} list list to move task to.
     * @param {*} task task to move from this list.
     */
    moveTask(list, task) {
        list.addTask(task);
        this.removeTask(task);
    }

    toString() {
        let output = `List: ${this.name}\n`;

        for (let i = 0; i < this.listStorage.length; i++) {
            output += this.listStorage[i].toString();
            if (i <= this.listStorage.length) {
                output += "\n";
            }
        }

        return output;
    }

    toSaveString() {
        let saveString = "";

        let listName = this.getName()
        // console.log(`List being saved: ${listName}`)
        saveString += listName //will always be 0 on split (hypothetically)

        for (let task of this.getStorage()) {
            // console.log(`Task being saved: ${task.getName()}`)
            saveString += "&" + task.toSaveString()
        }

        return saveString;
    }

    //will need worked on a bit when we get multiple lists
    pushToLocalStorage(listID) {
        // console.log("pushToLocalStorage is currently broken and has been disabled")
        console.warn("Attempting to save the list...");
        //uploads the obj it to local storage under the key name of what ever is stored in listID
        //const stringObj = JSON.stringify(this.toSaveString())
        let stringObj = this.toSaveString();
        localStorage.setItem(listID, stringObj);

        // console.log("List saved successfully (maybe)!")
    }

    loadFromLocalStorage(listId) {
        let saveString = localStorage.getItem(listId);
        if (!saveString) {
            return;
        }

        let brokenString = saveString.split("&");

        this.name = brokenString[0];
        this.listStorage = [];

        if (!brokenString[1]) { //early return if there arent any more values (saved list is empty)
            return;
        }
        for (let taskNum = 1; taskNum < brokenString.length; taskNum++) {
            let taskSave = brokenString[taskNum];
            let newTask = convertTaskFromSaveString(taskSave);

            this.listStorage.push(newTask); //hope this supports the whole id thing
        }
    }

    show(x) {
        this.x = x; // this is necessary for the List's menu
        
        let ctx = drawingContext
        if (theme.getData("GlowEnabled")) {
            ctx.shadowColor = theme.getPaint("Glow").getHex();
            ctx.shadowOffsetX = 0.7;
            ctx.shadowOffsetY = 0.7;
            ctx.shadowBlur = 1 * theme.getData("GlowIntensity");
        }

        let borderColor = theme.getPaint("StrokePrimary")
        let backgroundColor = theme.getPaint("BackgroundSecondary")
        let titleColor = theme.getPaint("TextPrimary")

        if (mode === "default") {
            stroke(borderColor.getRGB());
            fill(backgroundColor.getRGB());
        } else if (mode === "dark") {
            let evilmodeColor = backgroundColor.toDarkMode()
            let evilBorderColor = borderColor.toDarkMode()
            stroke(evilBorderColor.getRGB());
            fill(evilmodeColor.getRGB());
        }
        // box
        strokeWeight(5);
        let verticalOffsetTop = 100;
        let verticalOffsetBottom = 125;
        
        rect(x, verticalOffsetTop, 400, windowHeight - verticalOffsetBottom, 15);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;

        this.menu.x = x + 30

        //sets pos of buttons
        this.menu.menuButton.position(x + 370,verticalOffsetBottom - 17);

        //styles the menu button
        let buttonBg = theme.getPaint("BackgroundSecondary")
        let buttonText = theme.getPaint("TextPrimary")
        let buttonStroke = theme.getPaint("StrokePrimary")

        this.menu.menuButton.style("background-color", buttonBg.getHex()); 
        this.menu.menuButton.style("color", buttonText.getHex()); 
        this.menu.menuButton.style("border", "2px solid" + buttonStroke.getHex()); 

        //show move task up/down buttons
        this.menu.menuButton.show();

        // title
        strokeWeight(0)
        textFont(theme.getData("Font"));
        textAlign(CENTER, CENTER);
        if (mode === "default") {
            strokeWeight(0);
            fill(titleColor.getRGB());
        } else if (mode === "dark") {
            let evilTitleColor = titleColor.toDarkMode()
            strokeWeight(3);
            fill(evilTitleColor.getRGB());
        }
        textSize(24);
        
        text(this.name, x + 200, verticalOffsetTop + 20);
        // fill(this.backgroundColor.getRGB());
        textSize(12);
        strokeWeight(1);

        // show all tasks in this list
        if(this.listStorage.length > 0){
            //console.log("show");
            this.showTasks(x)
        }

        this.menu.showMenu();
    }

    showTasks(x) {
        let verticalOffsetTop = 100;
        let y = 70 + verticalOffsetTop;
        for (let index = 0; index < this.listStorage.length; index++) { 
            let task = this.listStorage[index];
            task.show(x + 10, y + (130 * index));
        }
    }

    hideTasksMenus() {
        this.menu.closeMenu();
        for (let task of this.listStorage) {
            task.menu.closeMenu();
        }
    }
}

function convertTaskFromSaveString(saveString) { //generational amount of characters
    let brokenString = saveString.split("|"); //Name, Desc, Status, Position, Id in that order

    let savedName     = brokenString[0];
    let savedDesc     = brokenString[1];
    let savedStatus   = brokenString[2];
    let savedPosition = parseInt(brokenString[3]);
    let savedId       = parseInt(brokenString[4]);
    let savedColor    = parseColor(brokenString[5]);
    
    //might be an easier way to do this
    let newTask = new Task(savedName, savedDesc, savedStatus, savedPosition, savedId, savedColor);
    return newTask;
}