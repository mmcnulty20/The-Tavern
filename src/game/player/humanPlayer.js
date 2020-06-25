class Player {
    constructor({ color, name = "anonymous", health = 100 }) {
        this.color = color;
        this.name = name;
        this.health = health;
        this.points = 0
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