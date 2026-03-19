class Theme {
    constructor(data) {
        if (!data) {
            data = {}
        }
        //text slop
        this.TextPrimary         = data.TextPrimary          || new Paint()
        this.TextSecondary       = data.TextSecondary        || new Paint()
        this.TextTertiary        = data.TextTertiary         || new Paint(200,200,200)

        //stroke
        this.StrokePrimary       = data.StrokePrimary        || new Paint(100, 230, 255)
        this.StrokeSecondary     = data.StrokeSecondary      || new Paint(100, 230, 255)

        //background
        this.BackgroundPrimary   = data.BackgroundPrimary    || new Paint(200,200,200)
        this.BackgroundSecondary = data.BackgroundSecondary  || new Paint(255,255,255)
        this.BackgroundTertiary  = data.BackgroundTertiary   || new Paint(58, 110, 165)

        //glow/shadow
        this.Glow                = data.Glow                 || new Paint(0,0,0)
        this.GlowIntensity       = data.GlowIntensity        || 1
        this.GlowEnabled         = data.GlowEnabled          || false

        //highlight
        this.HighlightColor      = data.HighlightColor       || new Paint(255,255,255)
        this.HighlightEnabled    = data.HighlightEnabled     || false
        this.HighlightOpacity    = data.HighlightOpacity     || 22

        //misc data
        this.Font                = data.Font                 || "Arial"
    }

    getPaint(colorName) {
        let colorVal = this[colorName] //either a Paint or a list of paints

        if (colorVal instanceof Paint) {
            return colorVal
        }

        //pick random if its a list
        let randInt = Math.floor(Math.random() * colorVal.length)

        return colorVal[randInt]
    }

    getData(dataName) {
        return this[dataName]
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
    Default: new Theme({
        GlowEnabled: true,
        HighlightEnabled: true
    }),
    DarkMode: new Theme({
        TextPrimary: new Paint(200,200,200),
        TextSecondary: new Paint(200,200,200),
        TextTertiary: new Paint(225,225,225),
        BackgroundPrimary: new Paint(25,25,25),
        BackgroundSecondary: new Paint(50,50,50),
        BackgroundTertiary: new Paint(8, 60, 105),
        StrokePrimary: new Paint(25, 155, 180),
        StrokeSecondary: new Paint(25, 155, 180),
        GlowEnabled: true,
        HighlightColor: new Paint(),
        HighlightOpacity: 44,
        HighlightEnabled: true
    }),
    Classic: new Theme({
        BackgroundTertiary: [
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
        Font: "Courier New",
        GlowEnabled: false,
        HighlightEnabled: false
    }),
    Sakura: new Theme({
        TextPrimary: new Paint(255, 229, 236),
        TextSecondary: new Paint(251, 111, 146),
        TextTertiary: new Paint(82, 50, 20),   
        StrokePrimary: new Paint(71, 49, 27),   
        StrokeSecondary: new Paint(255, 179, 198),
        BackgroundPrimary: new Paint(255, 194, 209),
        BackgroundSecondary: new Paint(82, 53, 25),   
        BackgroundTertiary: new Paint(255, 229, 236),
        GlowEnabled: true,
        HighlightEnabled: true
    }),
    //TODO: MY DELICATE RETINAS!!!! THEY BURN!!!!!
    SakuraPrime: new Theme({ 
        TextPrimary: new Paint(),             
        TextSecondary: new Paint(),             
        TextTertiary: new Paint(255, 117, 239),
        StrokePrimary: new Paint(255, 161, 244),
        StrokeSecondary: new Paint(255, 161, 244),
        BackgroundPrimary: new Paint(255, 255, 255),
        BackgroundSecondary: new Paint(255, 117, 239),
        BackgroundTertiary: new Paint(255, 255, 255),
        Glow: new Paint(255, 0, 255),  
        GlowIntensity: 10,
        GlowEnabled: true,
        HighlightEnabled: true
    }),
    V1sDream: new Theme({
        TextPrimary: new Paint(10, 30, 52), 
        TextSecondary: new Paint(189, 31, 54),
        TextTertiary: new Paint(178, 30, 53),
        StrokeSecondary: new Paint(133, 24, 42),
        StrokePrimary: new Paint(100, 18, 32),
        BackgroundPrimary: new Paint(110, 20, 35),
        BackgroundSecondary: new Paint(199, 31, 55),
        BackgroundTertiary: new Paint(100, 18, 32),
        Glow: new Paint(255, 0, 0),  
        HighlightColor: new Paint(255,0,0),
        GlowIntensity: 5,
        GlowEnabled: true,
        HighlightOpacity: 60,
        HighlightEnabled: true
    }),
    DeepBlue: new Theme({
        TextPrimary: new Paint(70, 143, 175),
        TextSecondary: new Paint(),            
        TextTertiary: new Paint(100,100,100), 
        StrokePrimary: new Paint(),            
        StrokeSecondary: new Paint(97, 165, 194),
        BackgroundPrimary: new Paint(1, 58, 99),   
        BackgroundSecondary: new Paint(1, 42, 74),   
        BackgroundTertiary: new Paint(1, 73, 124),  
        GlowEnabled: true,
        HighlightEnabled: true
    }),
    "1x1x1x1": new Theme({
        TextPrimary: new Paint(255,0,0),      
        TextSecondary: new Paint(255, 0, 0),    
        TextTertiary: new Paint(175, 175, 175),
        StrokePrimary: new Paint(0, 140, 0),    
        StrokeSecondary: new Paint(10, 175, 10),  
        BackgroundPrimary: new Paint(),             
        BackgroundSecondary: new Paint(11, 101, 11),  
        BackgroundTertiary: new Paint(0, 0, 0),      
        Glow: new Paint(0, 255, 0),    
        GlowIntensity: 10,
        GlowEnabled: true,
        HighlightEnabled: false
    }),
    UltraGreen: new Theme({
        TextPrimary: new Paint(0, 114, 0),   
        TextSecondary: new Paint(0, 100, 0),   
        TextTertiary: new Paint(0, 75, 35),   
        StrokePrimary: new Paint(56, 176, 0),  
        StrokeSecondary: new Paint(0, 128, 0),   
        BackgroundPrimary: new Paint(204, 255, 51),
        BackgroundSecondary: new Paint(158, 240, 26),
        BackgroundTertiary: new Paint(112, 224, 0), 
        Glow: new Paint(0, 255, 0),   
        GlowEnabled: true,
        HighlightEnabled: true
    }),
    SmileOS: new Theme({
        TextPrimary: new Paint(255,255,255),
        TextSecondary: new Paint(255,255,255),
        TextTertiary: new Paint(255,255,255),
        StrokePrimary: new Paint(255,255,255),
        StrokeSecondary: new Paint(255,255,255),
        BackgroundPrimary: new Paint(0,0,0),
        BackgroundSecondary: new Paint(0,0,0),
        BackgroundTertiary: new Paint(0,0,0),
        GlowEnabled: false,
        HighlightEnabled: false
    }),
    HackerMan: new Theme({
        TextPrimary: new Paint(0,255,0),
        TextSecondary: new Paint(0,255,0),
        TextTertiary: new Paint(0,255,0),
        StrokePrimary: new Paint(0,255,0),
        StrokeSecondary: new Paint(0,255,0),
        BackgroundPrimary: new Paint(0,0,0),
        BackgroundSecondary: new Paint(0,0,0),
        BackgroundTertiary: new Paint(0,0,0),
        Glow: new Paint(0,255,0),
        GlowIntensity: 10,
        GlowEnabled: true,
        HighlightEnabled: false
    }),
    Noob: new Theme({
        TextPrimary: new Paint(0,0,0),
        TextSecondary: new Paint(0,0,0),
        TextTertiary: new Paint(0,0,0),
        StrokePrimary: new Paint(0,0,0),
        StrokeSecondary: new Paint(0,0,0),
        BackgroundPrimary: new Paint(255, 225, 0),
        BackgroundSecondary: new Paint(0, 157, 255),
        BackgroundTertiary: new Paint(13, 133, 0),
        GlowEnabled: true,
        HighlightEnabled: true
    })
}

function getPresetTheme(presetName) {
    let presetTheme = PresetThemes[presetName] || PresetThemes["Default"]
    //presetTheme = presetTheme.invertAll()
    return presetTheme
}

let theme = getPresetTheme("Default") //do not remove, this line is the nail which holds this whole building together (AKA coconut (how many references can i add to this comment))