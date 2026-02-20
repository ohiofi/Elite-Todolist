class ArchiveList extends List {
    constructor() {
        super("Archive");
    }


    show(x) {
        stroke(0);
        fill(255);
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
        strokeWeight(0);
        textFont(TEXT_FONT)
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(0);
        text(this.name, x + 200, verticalOffsetTop + 20);
        fill(255);
        textSize(12);
        strokeWeight(1);

        // show all tasks in this list
        if(this.listStorage.length > 0){
            //console.log("show")
            this.showTask(70 + verticalOffsetTop)
        }
    
    }
}
