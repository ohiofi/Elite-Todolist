//menu offset
const MENU_X_OFFSET = 370;
const MENU_Y_OFFSET = 6;

class Menu {

    constructor(x, y, width, height, bgColor, borderColor, task) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor.copy();
        this.borderColor = borderColor.copy();
        this.task = task;

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

        this.mainBox = createDiv();

    }

    deleteMenu() {
        this.mainBox.remove();
    }

    buttonPressedMarkDone() {
        this.task.setCompleted();
        let list = this.getListTask();
        for (let i = 0; i < listArray.length; i++) {
            if (listArray[i].getName() === "Archive") {
                list.moveTask(listArray[i], this.task);
                break;
            }
            if (i === listArray.length - 1) {
                listArray.push(new ArchiveList("Archive"));
                list.moveTask(listArray[i + 1], this.task);
                break;
            }
        }
        // console.log(this.id + " was marked as done");
        list.setTasksPositions()
        hideAllMenus()
        refresh();
        saveAllLists();
    }

    buttonPressedDelete() {
        let list = this.getListTask();
        this.deleteTaskButtons();
        list.removeTask(this.task);
        list.setTasksPositions();
        this.deleteMenu();
        hideAllMenus();
        refresh();
        saveAllLists();
    }

    closeMenu() {
        this.taskMenuOpen = false;
        this.hideMenuButtons();
    }

    buttonPressedMenu() {
        if (!this.taskMenuOpen) {
            hideAllMenus()
            this.taskMenuOpen = true;
            return;
        } else if (this.taskMenuOpen) {
            this.closeMenu();
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

    show() {

        if (!this.taskMenuOpen) {
            return;
        }

        const pos = { x: this.x, y: this.y };

        // main box
        this.mainBox.position(this.x + MENU_X_OFFSET, this.y + MENU_Y_OFFSET);
        this.mainBox.style(`width: ${[this.width]}px`);
        this.mainBox.style(`height: ${[this.height]}px`);
        this.mainBox.style("z-index: 2");
        if (theme === "default") {
            this.mainBox.style(`background-color: ${[color(this.bgColor.getColor()[0], this.bgColor.getColor()[1], this.bgColor.getColor()[2])]}`);
            this.mainBox.style(`border: 3px solid ${[color(this.borderColor.getColor()[0], this.borderColor.getColor()[1], this.borderColor.getColor()[2])]}`);
        } else if (theme === "dark") {
            this.mainBox.style(`background-color: ${[color(this.bgColor.toDarkMode().getColor()[0], this.bgColor.toDarkMode().getColor()[1], this.bgColor.toDarkMode().getColor()[2])]}`);
            this.mainBox.style(`border: 3px solid ${[color(this.borderColor.getColor()[0], this.borderColor.getColor()[1], this.borderColor.getColor()[2])]}`);
        }

        this.mainBox.style(`border-radius: 10px`);
        this.mainBox.show();

        // sets pos of buttons        
        this.markTaskDoneButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 7);
        this.editTaskButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 30);
        this.deleteTaskButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 53);
        this.moveTaskUpButton.position(pos.x + MENU_X_OFFSET + 7, pos.y + MENU_Y_OFFSET + 76);
        this.moveTaskDownButton.position(pos.x + MENU_X_OFFSET + 41, pos.y + MENU_Y_OFFSET + 76);

        //show move task up/down buttons
        this.markTaskDoneButton.show();
        this.editTaskButton.show();
        this.deleteTaskButton.show();
        this.moveTaskUpButton.show();
        this.moveTaskDownButton.show();

        //menu buttons style.
        this.markTaskDoneButton.style('z-index', '3');
        this.editTaskButton.style('z-index', '3');
        this.deleteTaskButton.style('z-index', '3');
        this.moveTaskUpButton.style('z-index', '3');
        this.moveTaskDownButton.style('z-index', '3');

        //menu buttons position style.
        this.markTaskDoneButton.style('position', 'absolute');
        this.editTaskButton.style('position', 'absolute');
        this.deleteTaskButton.style('position', 'absolute');
        this.moveTaskUpButton.style('position', 'absolute');
        this.moveTaskDownButton.style('position', 'absolute');
    }

    hideMenuButtons() {
        this.markTaskDoneButton.hide();
        this.deleteTaskButton.hide();
        this.editTaskButton.hide();
        this.moveTaskUpButton.hide();
        this.moveTaskDownButton.hide();
        this.mainBox.hide();
    }

    editTask() {
        let editName = prompt("Input new task name:", this.task.name);
        switch (editName) {
            case null:
                return;
                break;

            default:
                this.task.name = editName;
                saveAllLists();
        }

        let editDesc = prompt("Input new task description:", this.task.description);
        switch (editDesc) {
            case null:
                saveAllLists();
                return;
                break;

            default:
                this.task.description = editDesc;
                saveAllLists();
        }

        hideAllMenus();
    }

    slidePosition(direction) {
        let list = this.getListTask();
        // console.log(list);
        let taskIndex = this.task.position

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
            if (storage.findIndex(t => t.id === this.task.id) != -1) {
                return list;
            }
        }
    }

}