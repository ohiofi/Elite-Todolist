//hmm maybe we should use this modularly for some other projects on p5js (virtual pet redux?)

const DEFAULT_RED   = 0
const DEFAULT_GREEN = 0
const DEFAULT_BLUE  = 0

class Color {
    //supports a single argument better c:
    constructor(red, green, blue) {
        this.R = red   || DEFAULT_RED
        this.G = green || DEFAULT_GREEN
        this.B = blue  || DEFAULT_BLUE
    }

    setRed(newRed)     { this.R = newRed   || DEFAULT_RED }
    setGreen(newGreen) { this.G = newGreen || DEFAULT_GREEN }
    setBlue(newBlue)   { this.B = newBlue  || DEFAULT_BLUE }

    //instead of passing in numbers for the color() thing pass this in (yes this is tested and works)
    getColor() {
        return [this.R, this.G, this.B];
    }

    toSaveString() {
        let output = "";

        output += this.R + ",";
        output += this.G + ",";
        output += this.B;

        return output;
    }

    changeColor(red, green, blue) {
        this.setRed(red);
        this.setGreen(green);
        this.setBlue(blue);
    }

    mix(otherColor, mixStrength) {
        mixStrength = Math.abs(mixStrength % 1);
        let mixStrengthOther = (1 - mixStrength);

        if (mixStrength == 0 || mixStrengthOther == 0) { //avoid dividing by zero
            throw new error("Mix failed :c (dividing by 0)");
        } 

        let red = (this.R * mixStrength) + (otherColor.R * mixStrengthOther);
        let green = (this.G * mixStrength) + (otherColor.G * mixStrengthOther);
        let blue = (this.B * mixStrength) + (otherColor.B * mixStrengthOther);

        this.changeColor(red, green, blue);
    }
    
    copy() {
        return new Color(this.R, this.G, this.B);
    }

    //you cant get THIS from a NUMBER!
    toInverted() {
        let newColor = this.copy();

        let red = 255 - newColor.R;
        let green = 255 - newColor.G;
        let blue = 255 - newColor.B;

        newColor.changeColor(red, green, blue);

        return newColor;
    }

    //bad grayscale filter
    toGrayscale() {
        let newColor = this.copy();

        let colorAvg = Math.round((newColor.R + newColor.G + newColor.B) / 3);
        newColor.changeColor(colorAvg);

        return newColor;
    }

    //just invert but darker, nothing else i can do
    toDarkMode() {
        let newColor = this.copy()
        
        let colorVals = []
        
        for (let colorVal of newColor.getColor()) {
          // console.log(Math.sqrt(colorVal))
          let newVal = Math.abs(colorVal - 200)
          
          colorVals.push(newVal)
        }

        newColor.changeColor(colorVals[0], colorVals[1], colorVals[2])

        return newColor
    }
}

function parseColor(colorString) {
    if (!colorString) {
        return;
    }

    let brokenString = colorString.split(",");

    return new Color(brokenString[0], brokenString[1], brokenString[2]);
}