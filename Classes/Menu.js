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
        if (parent instanceof Task) {
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

            this.buttons = [
                this.markTaskDoneButton,
                this.editTaskButton,
                this.deleteTaskButton,
                this.moveTaskUpButton,
                this.moveTaskDownButton
            ]
        }
        else if (parent instanceof List) {
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

            this.buttons = [
                this.addTaskButton,
                this.deleteListButton,
                this.editListButton
            ]
        }
    
        this.menuButton = createButton(`≡`);
        this.menuButton.hide();
        this.menuButton.mousePressed(() => this.buttonPressedMenu());

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

    deleteButtons(){
        for (button of this.buttons) {
            button.remove()
        }
        this.deleteListTaskButtons();
    }

    buttonPressedDeleteList(){
        this.deleteButtons();
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
        if (editName) {
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
            this.menuOpen = false;
            this.hideButtons();
            this.mainBox.hide()
            return;
    }

    buttonPressedMenu() {
           if (!this.menuOpen) {
                hideAllMenus()
                this.menuOpen = true;
                return;
            } else if (this.menuOpen) {
                this.closeMenu();
            } 
    }

    showMenu() {
        if (!this.menuOpen) {
            return;
        }
        let bgColor = theme.getPaint("BackgroundTertiary")
        let borderColor = theme.getPaint("StrokeSecondary")
        const pos = { x: this.x, y: this.y };

        // main box
        this.mainBox.position(this.x + MENU_X_OFFSET, this.y + MENU_Y_OFFSET);
        this.mainBox.style(`width: ${[this.width]}px`);
        this.mainBox.style(`height: ${[this.height]}px`);
        this.mainBox.style("z-index: 2");
        if (mode === "default") {
            this.mainBox.style(`background-color: ${bgColor.getHex()}`);
            this.mainBox.style(`border: 3px solid ${borderColor.getHex()}`);
        } else if (mode === "dark") {
            this.mainBox.style(`background-color: ${bgColor.toDarkMode().getHex()}`);
            this.mainBox.style(`border: 3px solid ${borderColor.getHex()}`);
        }

        this.mainBox.style(`border-radius: 10px`);
        this.mainBox.show();

        // sets pos of buttons        
        let positions = [
            {x: 7, y: 7},
            {x: 7, y: 30},
            {x: 7, y: 53},
            {x: 7, y: 76},
            {x: 41, y: 76},
        ]

        let bgClr = theme.getPaint("BackgroundSecondary")
        let textClr = theme.getPaint("TextPrimary")
        let strokeClr = theme.getPaint("StrokePrimary")

        let loops = 0
        for (let btn of this.buttons) {
            btn.position(pos.x + MENU_X_OFFSET + positions[loops].x, pos.y + MENU_Y_OFFSET + positions[loops].y)
            btn.show()
            btn.style('z-index', '3')
            btn.style('position', 'absolute')
            btn.style("background-color", bgClr.getHex()); 
            btn.style("color", textClr.getHex()); 
            btn.style("border", "2px solid" + strokeClr.getHex()); 
            loops++
        }
    }

    hideButtons() {
        for (let btn of this.buttons) {
            btn.hide()
        }
    }
    
    editTask(){
        let editName = prompt("Input new task name:", this.parent.name);
        if (!editName) {
            return
        }
        this.parent.name = editName;

        let editDesc = prompt("Input new task description:", this.parent.description);

        if (!editDesc) {
            saveAllLists();
            return;
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
            if (storage.findIndex(task => task.id === this.parent.id) == -1) {
                continue
            }
            return list;
        }
    }

}