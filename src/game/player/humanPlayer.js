class Player {
    constructor({ color, name = "anonymous", health = 100, textColor }) {
        this.color = color;
        this.name = name;
        this.health = health;
        this.points = 0;
        this.textColor = textColor;
    }

    earnPoints(numPoints) {
        this.points += numPoints
        this.health -= (numPoints * 2)
    }

    lose(){
        return this.health <= 0
    }

    percent(){
        return this.health / 100
    }
}

export default Player;