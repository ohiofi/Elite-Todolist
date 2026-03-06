class ArchiveList extends List {
    constructor() {
        super("Archive");
        
    }


    show(x) {
        strokeWeight(5)
        if (mode === "default") {
            stroke(LIST_BORDER_COLOR.getColor());
            fill(LIST_BACKGROUND_COLOR.getColor());
        } else if (mode === "dark") {
            let evilmodeColor = LIST_BACKGROUND_COLOR.toDarkMode()
            let evilBorderColor = LIST_BORDER_COLOR.toDarkMode()
            stroke(evilBorderColor.getColor());
            fill(evilmodeColor.getColor());
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
        this.addTaskButton.remove();

        // title
        
        textFont(TEXT_FONT);
        textAlign(CENTER, CENTER);
      
       
        
        if (mode === "default") {
            strokeWeight(0);
            fill(LIST_TITLE_COLOR.getColor());
        } else if (mode === "dark") {
            let evilTitleColor = LIST_TITLE_COLOR.toDarkMode()
            strokeWeight(3);
            fill(evilTitleColor.getColor());
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
}