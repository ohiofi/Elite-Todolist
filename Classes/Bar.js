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
        localStorage.setItem("Theme", themeName)
    }

    show(){
        let ctx = drawingContext
        if (theme.getData("GlowEnabled")) {
            ctx.shadowColor = theme.getPaint("Glow").getHex();
            ctx.shadowOffsetX = 0.7;
            ctx.shadowOffsetY = 0.7;
            ctx.shadowBlur = 1 * theme.getData("GlowIntensity");
        }

        strokeWeight(5)

        let bgColor = theme.getPaint("BackgroundSecondary");
        let borderColor = theme.getPaint("StrokePrimary")
        
        if (mode === "default") {
            stroke(borderColor.getRGB());
            fill(bgColor.getRGB());
        } else if (mode === "dark") {
            stroke(borderColor.toDarkMode().getRGB());
            fill(bgColor.toDarkMode().getRGB());
        }
        
        rect(this.x, this.y, this.width, this.height, this.cornerCouverture);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        
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