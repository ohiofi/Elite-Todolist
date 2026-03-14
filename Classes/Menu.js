//menu offset
const MENU_X_OFFSET = 370;
const MENU_Y_OFFSET = 6;

const LIST_MENU_X_OFFSET = 395;
const LIST_MENU_Y_OFFSET = 105;

class Menu {

    constructor(x, y, width, height, parent) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bgColor = 0;
        this.borderColor = 0;
        this.parent = parent;

        //task buttons
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

        //list buttons
        this.addTaskButton = createButton(`Add Task`);
        this.addTaskButton.hide();
        this.addTaskButton.mousePressed(() => this.buttonPressedAddTask());

        this.deleteListButton = createButton(`Delete List`);
        this.deleteListButton.hide();
        this.deleteListButton.mousePressed(() => this.buttonPressedDeleteList());

        this.editListButton = createButton(`Edit List`);
        this.editListButton.hide();
        this.editListButton.mousePressed(() => this.editList());

        this.mainBox = createDiv();

    }

    deleteMenu() {
        this.mainBox.remove();
    }

    buttonPressedMarkDone() {
        this.parent.setCompleted();
        let list = this.getListTask();
        for (let i = 0; i < listArray.length; i++) {
            if (listArray[i].getName() === "Archive") {
                list.moveTask(listArray[i], this.parent);
                break;
            }
            if (i === listArray.length - 1) {
                listArray.push(new ArchiveList("Archive"));
                list.moveTask(listArray[i + 1], this.parent);
                break;
            }
        }
        // console.log(this.id + " was marked as done");
        list.setTasksPositions()
        hideAllMenus()
        refresh();
        saveAllLists();
    }

    buttonPressedAddTask(){
        this.parent.addTask(getNewTask());
        //this.addTask(new Task());
        hideAllMenus();
        refresh();
        saveAllLists();
    }

    deleteListButtons(){
        this.addTaskButton.remove();
        this.deleteListButton.remove();
        this.editListButton.remove();
        this.menuButton.remove();
    }

    buttonPressedDeleteList(){
        this.deleteListButtons();
        this.deleteListTaskButtons();
        this.mainBox.remove();
        localStorage.clear();
        listArray.splice(listArray.indexOf(this.parent), listArray.indexOf(this.parent) >= 0 ? 1 : 0);
        hideAllMenus()
        refresh();
        saveAllLists();
    }

    deleteListTaskButtons(){
        for(let task of this.parent.listStorage){
            task.menu.deleteTaskButtons();
        }
    }

    editList(){
        let editName = prompt("Input new list name:", this.parent.name);
        switch(editName){
            case null:
                return;
            break;

            default:
                this.parent.name = editName;
                saveAllLists();
        }

        hideAllMenus();
    }

    buttonPressedDelete() {
        if (!confirm(`Delete ${this.parent.getName()}?`)) {
            return
        }

        let list = this.getListTask();
        this.deleteTaskButtons();
        list.removeTask(this.parent);
        list.setTasksPositions();
        this.deleteMenu();
        hideAllMenus();
        refresh();
        saveAllLists(); 
    }

    closeMenu() {
        if(this.parent instanceof Task){
            this.taskMenuOpen = false;
            this.hideMenuButtons();
            return;
        }else if(this.parent instanceof List){
            this.listMenuOpen = false;
            this.hideListMenuButtons();
            return;
        }
        
        
    }

    buttonPressedMenu() {
        if(this.parent instanceof Task){
           if (!this.taskMenuOpen) {
                hideAllMenus()
                this.taskMenuOpen = true;
                return;
            } else if (this.taskMenuOpen) {
                this.closeMenu();
            } 
        }else if(this.parent instanceof List){
            if (!this.listMenuOpen) {
                hideAllMenus()
                this.listMenuOpen = true;
                return;
            } else if (this.listMenuOpen) {
                this.closeMenu();
            } 
        }
        

    }

    deleteTaskButtons() {
        this.moveTaskUpButton.remove();
        this.moveTaskDownButton.remove();
        this.markTaskDoneButton.remove();
        this.deleteTaskButton.remove();
        this.editTaskButton.remove();
        this.menuButton.remove();
    }

    showTaskMenu() {

        if (!this.taskMenuOpen) {
            return;
        }
        let bgColor = theme.getColor("BackgroundTertiary")
        let borderColor = theme.getColor("StrokeSecondary")
        const pos = { x: this.x, y: this.y };

        // main box
        this.mainBox.position(this.x + MENU_X_OFFSET, this.y + MENU_Y_OFFSET);
        this.mainBox.style(`width: ${[this.width]}px`);
        this.mainBox.style(`height: ${[this.height]}px`);
        this.mainBox.style("z-index: 2");
        if (mode === "default") {
            this.mainBox.style(`background-color: ${bgColor.toHex()}`);
            this.mainBox.style(`border: 3px solid ${borderColor.toHex()}`);
        } else if (mode === "dark") {
            this.mainBox.style(`background-color: ${bgColor.toDarkMode().toHex()}`);
            this.mainBox.style(`border: 3px solid ${borderColor.toHex()}`);
        }

        this.mainBox.style(`border-radius: 10px`);
        this.mainBox.show();

        // sets pos of buttons        
        this.markTaskDoneButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 7);
        this.editTaskButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 30);
        this.deleteTaskButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 53);
        this.moveTaskUpButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 76);
        this.moveTaskDownButton.position(pos.x + MENU_X_OFFSET + 41, pos.y + MENU_Y_OFFSET + 76);

        let buttons = [
            this.markTaskDoneButton,
            this.editTaskButton,
            this.deleteTaskButton,
            this.moveTaskUpButton,
            this.moveTaskDownButton
        ]
        
        let bgClr = theme.getColor("BackgroundSecondary")
        let textClr = theme.getColor("TextPrimary")
        let strokeClr = theme.getColor("StrokePrimary")
        for (let btn of buttons) {
            btn.show()
            btn.style('z-index', '3')
            btn.style('position', 'absolute')
            btn.style("background-color", bgClr.toHex()); 
            btn.style("color", textClr.toHex()); 
            btn.style("border", "2px solid" + strokeClr.toHex()); 
        }
    }

    showListMenu() {

        if (!this.listMenuOpen) {
            return;
        }
        let bgColor = theme.getColor("BackgroundTertiary")
        let borderColor = theme.getColor("StrokeSecondary")
        const pos = { x: this.parent.x, y: this.y };

        // main box
        this.mainBox.position(pos.x + LIST_MENU_X_OFFSET, pos.y + LIST_MENU_Y_OFFSET);
        this.mainBox.style(`width: ${[this.width]}px`);
        this.mainBox.style(`height: ${[this.height]}px`);
        this.mainBox.style("z-index: 2");
        if (mode === "default") {
            this.mainBox.style(`background-color: ${bgColor.toHex()}`);
            this.mainBox.style(`border: 3px solid ${borderColor.toHex()}`);
        } else if (mode === "dark") {
            this.mainBox.style(`background-color: ${bgColor.toDarkMode().toHex()}`);
            this.mainBox.style(`border: 3px solid ${borderColor.toHex()}`);
        }

        this.mainBox.style(`border-radius: 10px`);
        this.mainBox.show();

        // sets pos of buttons
        this.addTaskButton.position(pos.x + LIST_MENU_X_OFFSET + 7, pos.y + LIST_MENU_Y_OFFSET + 7);
        this.deleteListButton.position(pos.x + LIST_MENU_X_OFFSET + 7, pos.y + LIST_MENU_Y_OFFSET + 30);
        this.editListButton.position(pos.x + LIST_MENU_X_OFFSET + 7, pos.y + LIST_MENU_Y_OFFSET + 53);

        //show move task up/down buttons
        this.addTaskButton.show();
        this.deleteListButton.show();
        this.editListButton.show();

        //menu buttons style.
        this.addTaskButton.style('z-index', '3');
        this.deleteListButton.style('z-index', '3');
        this.editListButton.style('z-index', '3');

        //menu buttons position style.
        this.addTaskButton.style('position', 'absolute');
        this.deleteListButton.style('position', 'absolute');
        this.editListButton.style('position', 'absolute');
        let buttons = [
            this.markTaskDoneButton,
            this.editTaskButton,
            this.deleteTaskButton,
            this.moveTaskUpButton,
            this.moveTaskDownButton
        ]
        
        let bgClr = theme.getColor("BackgroundSecondary")
        let textClr = theme.getColor("TextPrimary")
        let strokeClr = theme.getColor("StrokePrimary")
        for (let btn of buttons) {
            btn.show()
            btn.style('z-index', '3')
            btn.style('position', 'absolute')
            btn.style("background-color", bgClr.toHex()); 
            btn.style("color", textClr.toHex()); 
            btn.style("border", "2px solid" + strokeClr.toHex()); 
        }
    }

    hideMenuButtons() {
        this.markTaskDoneButton.hide();
        this.deleteTaskButton.hide();
        this.editTaskButton.hide();
        this.moveTaskUpButton.hide();
        this.moveTaskDownButton.hide();
        this.mainBox.hide();
    }

    hideListMenuButtons(){
        this.addTaskButton.hide();
        this.deleteListButton.hide();
        this.editListButton.hide();
        this.mainBox.hide();
    }

    

    editTask(){
        let editName = prompt("Input new task name:", this.parent.name);
        switch(editName){
            case null:
                return;
                break;

            default:
                this.parent.name = editName;
                saveAllLists();
        }

        let editDesc = prompt("Input new task description:", this.parent.description);
        switch(editDesc){
            case null:
                saveAllLists();
                return;
                break;

            default:
                this.parent.description = editDesc;
                saveAllLists();
        }

        this.parent.description = editDesc;
        saveAllLists();
        
        hideAllMenus();
    }

    slidePosition(direction) {
        let list = this.getListTask();
        // console.log(list);
        let taskIndex = this.parent.position;

        if (direction == 0) { //avoids dividing by zero and other stuff that will break the app
            return;
        }

        if (direction != -1 && direction != 1) { //failsafe which isnt needed unless something evil happens
            throw new error("something evil happened :c pls fix my direction calculation")
        }

        list.move(taskIndex, direction);

        hideAllMenus();
        refresh();
        saveAllLists();
    }

    //gets the list that the task is in
    getListTask() {
        for (let list of listArray) {
            let storage = list.getStorage();
            if (storage.findIndex(task => task.id === this.parent.id) != -1) {
                return list;
            }
        }
    }

}