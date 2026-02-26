class ArchiveList extends List {
    constructor() {
        super("Archive");
        
    }


    show(x) {
        if (theme === "default") {
            stroke(0);
            fill(255);
        } else if (theme === "dark") {
            stroke(255);
            fill(0);
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
        if (theme === "default") {
            strokeWeight(0);
        } else if (theme === "dark") {
            strokeWeight(3);      
        }
        fill(0);
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