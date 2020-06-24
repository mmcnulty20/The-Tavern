import Player from "./humanPlayer";

class pigAi extends Player {
    constructor(){
        super({name: "Coil the Warforged", color: "#cd9575"})
    }

    playTurn(roll){
        let tempscore = 0;
        let numRolls = 0;
        while (tempscore < 15) {
            numRolls += 1
            let result = roll(); //fix && add render 
            if ( result === 1 ) {
                tempscore = 0
                break
            } else {
                tempscore += result
            }
        }
        if ( tempscore === 0 ) {
            this.earnPoints(numRolls)
        }
        return tempscore;
    }
}

export default pigAi;