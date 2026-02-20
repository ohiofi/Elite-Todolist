class Bar{
    constructor(init_x, init_y, init_width, init_height, init_cornerCouverture, init_color){
        this.x = init_x;
        this.y = init_y;
        this.width = init_width;
        this.height = init_height;
        this.cornerCouverture = init_cornerCouverture;
        this.color = init_color

        this.addListButton = createButton(`Add list`);
        this.addListButton.hide();
        this.addListButton.mousePressed(() => this.buttonPressedMakeList());
    }

    buttonPressedMakeList(){
        listArray.push(getNewList());
        refresh();
        saveAllLists();
    }


    show(){
        stroke(0);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height, this.cornerCouverture);

        
        //sets pos of buttons
        let xOffest = 40
        let yOffest = this.height/4
        this.addListButton.position(this.x + xOffest, this.y + yOffest);

        this.addListButton.style("padding", "12px 20px"); 
        this.addListButton.style("font-size", "20px"); 

        styleButton(this.addListButton)
        //shows buttons
        this.addListButton.show();
    }
    
}