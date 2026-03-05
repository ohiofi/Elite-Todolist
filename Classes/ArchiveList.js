class ArchiveList extends List {
    constructor() {
        super("Archive");
        this.deleteListButton = createButton(`Delete List`);
        this.deleteListButton.hide();
        this.deleteListButton.mousePressed(() => this.buttonPressedDeleteList());
    }


    show(x) {
        strokeWeight(5)
        
        if (theme === "default") {
            stroke(LIST_BORDER_COLOR.getColor());
            fill(LIST_BACKGROUND_COLOR.getColor());
        } else if (theme === "dark") {
            stroke(LIST_BORDER_COLOR.toDarkMode().getColor());
            fill(LIST_BACKGROUND_COLOR.toDarkMode().getColor());
        }
        // box
        let verticalOffsetTop = 100;
        let verticalOffsetBottom = 125;

        
        rect(x, verticalOffsetTop, 400, windowHeight - verticalOffsetBottom, 15);

        //sets pos of buttons
        this.deleteListButton.position(x + 290, verticalOffsetTop + 10);

        styleButton(this.deleteListButton); 


        //shows buttons
        this.deleteListButton.show();

        // title
        
        textFont(TEXT_FONT);
        textAlign(CENTER, CENTER);
      
       
        
        if (theme === "default") {
            strokeWeight(0);
            fill(LIST_TITLE_COLOR.getColor());
        } else if (theme === "dark") {
            strokeWeight(3);
            fill(LIST_TITLE_COLOR.toDarkMode().getColor());
        }
        textSize(24);
      
        text(this.name, x + 200, verticalOffsetTop + 20);
        fill(255);
        textSize(12);
        strokeWeight(1);

        // show all tasks in this list
        if(this.listStorage.length > 0){
            //console.log(this.listStorage[0])
            let index = listArray.length - 1;
            let taskPos = X_START + (index * X_PADDING);
            this.showTasks(taskPos);
        }
    
    }

    deleteListButtons(){
        this.deleteListButton.remove();
        saveAllLists();
    }

    deleteTaskButtons() {
        for (let task of this.getStorage()) {
            task.menu.deleteTaskButtons();
        }
        saveAllLists();
    }

    buttonPressedDeleteList(){
        this.deleteListButtons();
        this.deleteTaskButtons();
        localStorage.clear();
        listArray.splice(listArray.indexOf(this), listArray.indexOf(this) >= 0 ? 1 : 0);
        hideAllMenus()
        refresh();
        saveAllLists();
    }
}