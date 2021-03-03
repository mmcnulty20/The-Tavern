const maxHealth = 50
class Player {
    constructor({ color, name = "anonymous", health = maxHealth, textColor }) {
        this.color = color;
        this.name = name;
        this.health = health;
        this.points = 0;
        this.textColor = textColor;
    }

    fullHeal(){
        this.health = maxHealth
    }

    earnPoints(numPoints) {
        this.points += numPoints
        this.health -= (numPoints * 2)
    }

    lose(){
        return this.health <= 0
    }

    percent(){
        return this.health / maxHealth
    }
}

export default Player;