const DEFAULT_PALETTE_NAME = "1x1x1x1" //TODO: add a way for the user to change the theme themselves

class Theme {
    constructor(lTextP, lBg, lB, eBg, eS, eTextP, eTextS, bg, font) { //ik how much i stress readability but i am NOT typing allat
        this.ListTextPrimary      = lTextP || new Color()
        this.ListBg               = lBg    || new Color(255,255,255)
        this.ListBorder           = lB     || new Color(100, 230, 255)
        this.ElementBg            = eBg    || new Color(58, 110, 165)
        this.ElementStroke        = eS     || new Color(100, 230, 255)
        this.ElementTextPrimary   = eTextP || new Color()
        this.ElementTextSecondary = eTextS || new Color(200,200,200)
        this.Background           = bg     || new Color(200,200,200)
        this.Font                 = font   || "Arial"
    }

    getColor(colorName) {
        let colorVal = this[colorName] //either a Color or a list of colors

        if (colorVal instanceof Color) {
            return colorVal
        }

        let randInt = Math.floor(Math.random() * colorVal.length)
        console.log(randInt)

        return colorVal[randInt]
    }

    getFont() {
        return this.Font
    }

    //might be redundant later due to custom dark palettes
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
            let oldColor = colorVal.toGrayscale()

            this.colorName = oldColor
        }
    }

    //TODO: make save string method (im not wasting my time on that yet)
}

const PresetPalettes = {
    Default: new Theme(
        new Color(),             //ListTextPrimary
        new Color(255,255,255),  //ListBg
        new Color(100, 230, 255),//ListBorder
        new Color(58, 110, 165), //ElementBg
        new Color(100, 230, 255),//ElementStroke
        new Color(),             //ElementTextPrimary
        new Color(200,200,200),  //ElementTextSecondary
        new Color(200,200,200),  //Background
        "Arial"                  //Font
    ),
    Classic: new Theme(
        new Color(),             //ListTextPrimary
        new Color(255,255,255),  //ListBg
        new Color(100, 230, 255),//ListBorder
        //ElementBg
        [
            new Color(58, 110, 165), 
            new Color(192), 
            new Color(161, 130, 118), 
            new Color(55, 18, 60), 
            new Color(27, 48, 34), 
            new Color(114, 97, 163), 
            new Color(212, 81, 19), 
            new Color(60, 110, 113), 
            new Color(58, 90, 64), 
            new Color(52, 78, 65)
        ],
        new Color(100, 230, 255),//ElementStroke
        new Color(),             //ElementTextPrimary
        new Color(200,200,200),  //ElementTextSecondary
        new Color(200,200,200),  //Background
        "Courier New"            //Font
    ),
    Sakura: new Theme(
        new Color(255, 229, 236),//ListTextPrimary
        new Color(82, 53, 25),   //ListBg
        new Color(71, 49, 27),   //ListBorder
        new Color(255, 229, 236),//ElementBg
        new Color(255, 179, 198),//ElementStroke
        new Color(251, 111, 146),//ElementTextPrimary
        new Color(82, 50, 20),   //ElementTextSecondary
        new Color(255, 194, 209),//Background
        "Arial"                  //Font
    ),
    //TODO: MY DELICATE RETINAS!!!! THEY BURN!!!!!
    SakuraPrime: new Theme( 
        new Color(),             //ListTextPrimary
        new Color(255, 117, 239),//ListBg
        new Color(255, 161, 244),//ListBorder
        new Color(255, 255, 255),//ElementBg
        new Color(255, 161, 244),//ElementStroke
        new Color(),             //ElementTextPrimary
        new Color(255, 117, 239),//ElementTextSecondary
        new Color(255, 255, 255),//Background
        "Arial"                  //Font
    ),
    V1sDream: new Theme(
        new Color(10, 30, 52), //ListTextPrimary
        new Color(199, 31, 55),//ListBg
        new Color(100, 18, 32),//ListBorder
        new Color(100, 18, 32),//ElementBg
        new Color(133, 24, 42),//ElementStroke
        new Color(189, 31, 54),//ElementTextPrimary
        new Color(178, 30, 53),//ElementTextSecondary
        new Color(110, 20, 35),//Background
        "Arial",               //Font
    ),
    DeepBlue: new Theme(
        new Color(70, 143, 175),//ListTextPrimary
        new Color(1, 42, 74),   //ListBg
        new Color(97, 165, 194),//ListBorder
        new Color(1, 73, 124),  //ElementBg
        new Color(),            //ElementStroke
        new Color(),            //ElementTextPrimary
        new Color(100,100,100), //ElementTextSecondary
        new Color(1, 58, 99),   //Background
        "Arial",                //Font
    ),
    "1x1x1x1": new Theme(
        new Color(255,0,0),      //ListTextPrimary
        new Color(11, 101, 11),  //ListBg
        new Color(0, 140, 0),    //ListBorder
        new Color(0, 0, 0),    //ElementBg
        new Color(10, 175, 10),  //ElementStroke
        new Color(255, 0, 0),    //ElementTextPrimary
        new Color(175, 175, 175),//ElementTextSecondary
        new Color(),             //Background
        "Arial"                  //Font
    )
}

function getPresetPalette(presetName) {
    return PresetPalettes[presetName] || PresetPalettes[DEFAULT_PALETTE_NAME] || PresetPalettes["Default"]
}

let theme = getPresetPalette(DEFAULT_PALETTE_NAME) //do not remove, this line is the nail which holds this whole building together (AKA coconut (how many references can i add to this comment))