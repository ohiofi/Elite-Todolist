//hmm maybe we should use this modularly for some other projects on p5js (virtual pet redux?)

const DEFAULT_RED   = 0
const DEFAULT_GREEN = 0
const DEFAULT_BLUE  = 0

class Color {
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
        return [this.R, this.G, this.B] //somehow this works as a tuple in p5js? idk dont ask me about it
    }
    
    copy() {
        return new Color(this.R, this.G, this.B)
    }

    //you cant get THIS from a NUMBER!
    toInverted() {
        this.setRed(255 - this.R)
        this.setGreen(255 - this.G)
        this.setBlue(255 - this.B)
    }

    //bad grayscale filter
    toGrayscale() {
        let colorAvg = Math.round((this.R + this.G + this.B) / 3)

        this.setRed(colorAvg)
        this.setGreen(colorAvg)
        this.setBlue(colorAvg)
    }
}