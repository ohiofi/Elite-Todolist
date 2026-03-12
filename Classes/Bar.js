class Bar{
    constructor(init_x, init_y, init_width, init_height, init_cornerCouverture, init_color){
        this.x = init_x;
        this.y = init_y;
        this.width = init_width;
        this.height = init_height;
        this.cornerCouverture = init_cornerCouverture;

        this.addListButton = createButton(`Add list`);
        this.addListButton.hide();
        this.addListButton.mousePressed(() => this.buttonPressedMakeList());

        // this.addDarkModeButton = createButton(`Toggle Dark Mode`);
        // this.addDarkModeButton.hide();
        // this.addDarkModeButton.mousePressed(() => this.buttonPressedToggleDarkMode());

        this.ChangeThemeButton = createButton(`Change Theme`);
        this.ChangeThemeButton.hide();
        this.ChangeThemeButton.mousePressed(() => this.buttonPressedChangeTheme());
    }

    buttonPressedMakeList(){

        if(listArray.length > 0 && listArray[listArray.length - 1].name == "Archive"){
            let temp = listArray[listArray.length - 1];
            listArray.pop();
            listArray.push(getNewList());
            listArray.push(temp);
        }else{
            listArray.push(getNewList());
        }

        hideAllMenus();
        refresh();
        saveAllLists();
    }

    // buttonPressedToggleDarkMode(){
    //     if (mode != "default") {
    //         mode = "default";
    //     } else {
    //         mode = "dark";
    //     }
    // }

    buttonPressedChangeTheme() {
        let themeName = prompt("Theme name:", "Default")

        if (!themeName) {
            return
        }

        theme = getPresetTheme(themeName)
    }

    show(){
        strokeWeight(5)

        let bgColor = theme.getColor("BackgroundSecondary");
        let borderColor = theme.getColor("StrokePrimary")
        
        if (mode === "default") {
            stroke(borderColor.getColor());
            fill(bgColor.getColor());
        } else if (mode === "dark") {
            stroke(borderColor.toDarkMode().getColor());
            fill(bgColor.toDarkMode().getColor());
        }
        
        rect(this.x, this.y, this.width, this.height, this.cornerCouverture);
        
        //sets pos of buttons
        let xOffset = 40;
        let yOffset = this.height/4;
        this.addListButton.position(this.x + xOffset, this.y + yOffset);
        // this.addDarkModeButton.position(this.width - xOffset * 4.5, this.y + yOffset);
        this.ChangeThemeButton.position(this.width - xOffset * 4.5, this.y + yOffset);

        this.addListButton.style("padding", "12px 20px"); 
        this.addListButton.style("font-size", "20px"); 
        // this.addDarkModeButton.style("padding", "12px 20px"); 
        // this.addDarkModeButton.style("font-size", "20px"); 
        this.ChangeThemeButton.style("padding", "12px 20px"); 
        this.ChangeThemeButton.style("font-size", "20px"); 

        styleButton(this.addListButton);
        // styleButton(this.addDarkModeButton);
        styleButton(this.ChangeThemeButton);

        //shows buttons
        this.addListButton.show();
        // this.addDarkModeButton.show();
        this.ChangeThemeButton.show();
    }
    
}