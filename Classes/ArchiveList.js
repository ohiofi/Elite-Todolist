class ArchiveList extends List {
    constructor() {
        super("Archive");
        this.deleteListButton = createButton(`Delete List`);
        this.deleteListButton.hide();
        this.deleteListButton.mousePressed(() => this.buttonPressedDeleteList());
    }


    show(x) {
        let ctx = drawingContext
        if (theme.getData("GlowEnabled")) {
            ctx.shadowColor = theme.getPaint("Glow").getHex();
            ctx.shadowOffsetX = 0.7;
            ctx.shadowOffsetY = 0.7;
            ctx.shadowBlur = 1 * theme.getData("GlowIntensity");
        }

        strokeWeight(5)

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
        let verticalOffsetTop = 100;
        let verticalOffsetBottom = 125;

        rect(x, verticalOffsetTop, 400, windowHeight - verticalOffsetBottom, 15);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;

        //sets pos of buttons
        this.deleteListButton.position(x + 290, verticalOffsetTop + 10);

        styleButton(this.deleteListButton); 


        //shows buttons
        this.deleteListButton.show();

        // title
        
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