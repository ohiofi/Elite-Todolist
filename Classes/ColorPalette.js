const DEFAULT_PALETTE_NAME = "Default" //TODO: add a way for the user to change the theme themselves

class ColorPalette {
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

    //might be redundant later due to custom dark palettes
    toggleDarkMode(darkModeEnabled) {
        for (let colorName in this) {
            let colorVal = this[colorName]
            let evilColor = colorVal.toggleDarkMode(darkModeEnabled)

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
    Default: new ColorPalette(
        new Color(),
        new Color(255,255,255),
        new Color(100, 230, 255),
        new Color(58, 110, 165), 
        new Color(100, 230, 255),
        new Color(),
        new Color(200,200,200),
        new Color(200,200,200),
        "Arial"
    ),
    Sakura: new ColorPalette(
        new Color(255, 229, 236),
        new Color(82, 53, 25),
        new Color(71, 49, 27),
        new Color(255, 229, 236),
        new Color(255, 179, 198),
        new Color(251, 111, 146),
        new Color(82, 50, 20),
        new Color(255, 194, 209),
        "Arial"
    ),
    //TODO: MY DELICATE RETINAS!!!! THEY BURN!!!!!
    SakuraPrime: new ColorPalette( 
        new Color(),
        new Color(255, 117, 239),
        new Color(255, 161, 244),
        new Color(255, 255, 255),
        new Color(255, 161, 244),
        new Color(),
        new Color(255, 117, 239),
        new Color(255, 255, 255),
        "Arial"
    ),
    V1sDream: new ColorPalette(
        new Color(10, 30, 52),
        new Color(199, 31, 55),
        new Color(100, 18, 32),
        new Color(100, 18, 32),
        new Color(133, 24, 42),
        new Color(189, 31, 54),
        new Color(178, 30, 53),
        new Color(110, 20, 35),
        "Arial",
    ),
    DeepBlue: new ColorPalette(
        new Color(70, 143, 175),
        new Color(1, 42, 74),
        new Color(97, 165, 194),
        new Color(1, 73, 124),
        new Color(),
        new Color(),
        new Color(100,100,100),
        new Color(1, 58, 99),
        "Arial",
    ),
    "1x1x1x1": new ColorPalette(
        new Color(255,0,0),
        new Color(11, 101, 11),
        new Color(0, 140, 0),
        new Color(0, 150, 0),
        new Color(10, 175, 10),
        new Color(255, 0, 0),
        new Color(194, 0, 0),
        new Color(),
        "Arial"
    )
}

function getPresetPalette(presetName) {
    return PresetPalettes[presetName] || PresetPalettes[DEFAULT_PALETTE_NAME] || PresetPalettes["Default"]
}

let COLOR_PALETTE = getPresetPalette(DEFAULT_PALETTE_NAME) //TODO: hastily slapped together to PR in time, fix later