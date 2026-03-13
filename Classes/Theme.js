class Theme {
    constructor(tP, tS, tT, sP, sS, bP, bS, bT, g, font) { //ik how much i stress readability but i am NOT typing allat
        //text slop
        this.TextPrimary         = tP   || new Paint()
        this.TextSecondary       = tS   || new Paint()
        this.TextTertiary        = tT   || new Paint(200,200,200)

        //stroke
        this.StrokePrimary       = sP   || new Paint(100, 230, 255)
        this.StrokeSecondary     = sS   || new Paint(100, 230, 255)

        //background
        this.BackgroundPrimary   = bP   || new Paint(200,200,200)
        this.BackgroundSecondary = bS   || new Paint(255,255,255)
        this.BackgroundTertiary  = bT   || new Paint(58, 110, 165)

        //glow/shadow
        this.Glow = g                   || new Paint(0,0,0)

        //font
        this.Font                = font || "Arial"
    }

    getColor(colorName) {
        let colorVal = this[colorName] //either a Paint or a list of paints

        if (colorVal instanceof Paint) {
            return colorVal
        }

        //pick random if its a list
        let randInt = Math.floor(Math.random() * colorVal.length)
        console.log(randInt)

        return colorVal[randInt]
    }

    getFont() {
        return this.Font
    }

    //might be redundant later due to custom dark themes
    toggleDarkMode(darkModeEnabled) {
        for (let colorName in this) {
            let colorVal = this[colorName]
            let evilColor = colorVal.toDarkMode(darkModeEnabled)

            this[colorName] = evilColor
        }
    }

    invertAll() {
        for(let colorName in this) {
            let colorVal = this[colorName]
            let reverseColor = colorVal.toInverted()

            this[colorName] = reverseColor
        }
    }

    grayscaleAll() {
        for(let colorName in this) {
            let colorVal = this[colorName]
            console.log(colorVal)
            let oldColor = colorVal.toGrayscale()

            this[colorName] = oldColor
        }
    }

    //TODO: make save string method (im not wasting my time on that yet)
}

const PresetThemes = {
    Default: new Theme(
        new Paint(),             //TextPrimary
        new Paint(),             //TextSecondary
        new Paint(200,200,200),  //TextTertiary
        new Paint(100, 230, 255),//StrokePrimary
        new Paint(100, 230, 255),//StrokeSecondary
        new Paint(200,200,200),  //BackgroundPrimary
        new Paint(255,255,255),  //BackgroundSecondary
        new Paint(58, 110, 165), //BackgroundTertiary
        new Paint(0, 0, 0),       //Glow
        "Arial"                  //Font
    ),
    Classic: new Theme(
        new Paint(),             //TextPrimary
        new Paint(),             //TextSecondary
        new Paint(200,200,200),  //TextTertiary
        new Paint(100, 230, 255),//StrokePrimary
        new Paint(100, 230, 255),//StrokeSecondary
        new Paint(200,200,200),  //BackgroundPrimary
        new Paint(255,255,255),  //BackgroundSecondary
        //BackgroundTertiary
        [
            new Paint(58, 110, 165), 
            // new Paint(192), 
            // new Paint(161, 130, 118), 
            // new Paint(55, 18, 60), 
            // new Paint(27, 48, 34), 
            // new Paint(114, 97, 163), 
            // new Paint(212, 81, 19), 
            // new Paint(60, 110, 113), 
            // new Paint(58, 90, 64), 
            // new Paint(52, 78, 65)
        ],
        new Paint(0, 0, 0),      //Glow
        "Courier New"            //Font
    ),
    Sakura: new Theme(
        new Paint(255, 229, 236),//TextPrimary
        new Paint(251, 111, 146),//TextSecondary
        new Paint(82, 50, 20),   //TextTertiary
        new Paint(71, 49, 27),   //StrokePrimary
        new Paint(255, 179, 198),//StrokeSecondary
        new Paint(255, 194, 209),//BackgroundPrimary
        new Paint(82, 53, 25),   //BackgroundSecondary
        new Paint(255, 229, 236),//BackgroundTertiary
        new Paint(0, 0, 0),       //Glow
        "Arial"                  //Font
    ),
    //TODO: MY DELICATE RETINAS!!!! THEY BURN!!!!!
    SakuraPrime: new Theme( 
        new Paint(),             //TextPrimary
        new Paint(),             //TextSecondary
        new Paint(255, 117, 239),//TextTertiary
        new Paint(255, 161, 244),//StrokePrimary
        new Paint(255, 161, 244),//StrokeSecondary
        new Paint(255, 255, 255),//BackgroundPrimary
        new Paint(255, 117, 239),//BackgroundSecondary
        new Paint(255, 255, 255),//BackgroundTertiary
        new Paint(255, 0, 255),  //Glow
        "Arial"                  //Font
    ),
    V1sDream: new Theme(
        new Paint(10, 30, 52), //TextPrimary
        new Paint(189, 31, 54),//TextSecondary
        new Paint(178, 30, 53),//TextTertiary
        new Paint(133, 24, 42),//StrokeSecondary
        new Paint(100, 18, 32),//StrokePrimary
        new Paint(110, 20, 35),//BackgroundPrimary
        new Paint(199, 31, 55),//BackgroundSecondary
        new Paint(100, 18, 32),//BackgroundTertiary
        new Paint(255, 0, 0),  //Glow
        "Arial",               //Font
    ),
    DeepBlue: new Theme(
        new Paint(70, 143, 175),//TextPrimary
        new Paint(),            //TextSecondary
        new Paint(100,100,100), //TextTertiary
        new Paint(),            //StrokePrimary
        new Paint(97, 165, 194),//StrokeSecondary
        new Paint(1, 58, 99),   //BackgroundPrimary
        new Paint(1, 42, 74),   //BackgroundSecondary
        new Paint(1, 73, 124),  //BackgroundTertiary
        new Paint(0, 0, 0),     //Glow
        "Arial",                //Font
    ),
    "1x1x1x1": new Theme(
        new Paint(255,0,0),      //TextPrimary
        new Paint(255, 0, 0),    //TextSecondary
        new Paint(175, 175, 175),//TextTertiary
        new Paint(0, 140, 0),    //StrokePrimary
        new Paint(10, 175, 10),  //StrokeSecondary
        new Paint(),             //BackgroundPrimary
        new Paint(11, 101, 11),  //BackgroundSecondary
        new Paint(0, 0, 0),      //BackgroundTertiary
        new Paint(0, 255, 0),    //Glow
        "Arial"                  //Font
    ),
    UltraGreen: new Theme(
        new Paint(0, 114, 0),   //TextPrimary
        new Paint(0, 100, 0),   //TextSecondary
        new Paint(0, 75, 35),   //TextTertiary
        new Paint(56, 176, 0),  //StrokePrimary
        new Paint(0, 128, 0),   //StrokeSecondary
        new Paint(204, 255, 51),//BackgroundPrimary
        new Paint(158, 240, 26),//BackgroundSecondary
        new Paint(112, 224, 0), //BackgroundTertiary
        new Paint(0, 255, 0),     //Glow
        "Arial",                //Font
    ),
}

function getPresetTheme(presetName) {
    let presetTheme = PresetThemes[presetName] || PresetThemes["Default"]
    //presetTheme = presetTheme.invertAll()
    return presetTheme
}

let theme = getPresetTheme("Default") //do not remove, this line is the nail which holds this whole building together (AKA coconut (how many references can i add to this comment))