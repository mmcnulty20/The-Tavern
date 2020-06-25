import one from "../../../resources/pixel_assets/dice/1.png";
import two from "../../../resources/pixel_assets/dice/2.png";
import three from "../../../resources/pixel_assets/dice/3.png";
import four from "../../../resources/pixel_assets/dice/4.png";
import five from "../../../resources/pixel_assets/dice/5.png";
import six from "../../../resources/pixel_assets/dice/6.png";
import { shufflePlayerOrder } from "../utils/game_utils"
import pigAi from "../player/pigAi";
import { clearWithHUD, rectButton } from "../utils/canvas_utils";
import { loadImages, imagesStore } from "../utils/loading_utils";

class pig {
    constructor( canv, ctx, allPlayers ) {
        if ( allPlayers.length === 1 ) {
            allPlayers.push(new pigAi())
        }
        this.numPlayers = allPlayers.length;
        this.playerOrder = shufflePlayerOrder(allPlayers)
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.playerOrder[this.currentPlayerIndex]

        this.canv = canv;
        this.ctx = ctx;

        this.user = JSON.parse(sessionStorage.getItem("player")).name;
        this.user = this.playerOrder.find( player => player.name === this.user)
        this.scores = new Array(this.numPlayers).fill(0);

        this.numRolls = 0;
        this.tempScore = 0;
    }

    switchPlayers(){
        this.currentPlayerIndex = 
            (this.currentPlayerIndex + 1 ) < (this.playerOrder.length) ?
                this.currentPlayerIndex + 1 : 0
        this.currentPlayer = this.playerOrder[this.currentPlayerIndex]
    }

    roll(){
        return Math.floor(Math.random() * 6 + 1)
    }

    btnColor(){
        return this.user === this.currentPlayer ? "green" : "grey"
    }

    face(result){
        switch (result) {
            case 1:
                return "one";
            case 2:
                return "two";
            case 3:
                return "three";
            case 4:
                return "four";
            case 5:
                return "five";
            case 6:
                return "six"
            default:
                return null;
        }
    }

    endTurn(){
        this.scores[this.currentPlayerIndex] += this.tempScore;
        this.tempScore = 0;
        this.numRolls = 0;
        this.currentPlayer = null;
        this.render();
        setTimeout( () => {
            this.switchPlayers();
            this.render()
            this.playTurn();
        }, 750)

    }

    handleOne(){
        this.tempScore = 0;
        this.currentPlayer.earnPoints(this.numRolls);
        this.endTurn(1)
    }

    turn(){
        this.numRolls += 1;
        const roll = this.roll()
        if (roll === 1) {
            this.handleOne();
        } else {
            this.tempScore += roll;
        }
        this.render(roll)
        return roll !== 1
    }

    roboTurn() {
        setTimeout( () => {
            if ( this.tempScore < 15 ) {
                if ( this.turn() ) this.roboTurn();
            } else {
                this.endTurn();
            }
        }, 750 )
    }

    render(result, winner){
        const ctx = this.ctx;
        clearWithHUD(this.canv, ctx);
        
        ctx.beginPath();
        ctx.rect(85,375,630,100)
        ctx.strokeStyle = "black";
        ctx.fillStyle = "antiquewhite";
        this.ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(300,125,200,175)
        ctx.fillStyle = "#5e2f2f"
        ctx.strokeStyle = "#2f2016"
        ctx.lineWidth = 10
        this.ctx.closePath();
        ctx.fill();
        ctx.stroke();
        if ( this.currentPlayer !== null ) {
            this.lastRoll = this.face(result)
        }

        this.rollBtn.render(this.btnColor());
        this.holdBtn.render(this.btnColor())
        ctx.beginPath();
        if (result || this.currentPlayer === null) {
            let face = this.face(result) || this.lastRoll;
            if ( imagesStore[face] ) {
                this.diceRender(imagesStore[face])
            } else {
                loadImages( this.sources, (name, img) => {
                    if ( name === face ) this.diceRender(img)
                })
            }
        }
        this.ctx.closePath();
        ctx.lineWidth = 1
        if ( winner ) {
            ctx.fillText(`${winner.name} wins!!`, 400, 425)
        } else {
            ctx.fillText(`Current: ${this.tempScore}`, 400, 400)
            ctx.fillText(`Your total: ${ this.scores[this.currentPlayerIndex] }`, 400, 425)
            ctx.fillText(`Other's score: ${ this.scores[this.currentPlayerIndex === 0 ? 1 : 0] }`, 400, 450)
        }
    }

    diceRender(img) {
        this.ctx.beginPath();
        this.ctx.drawImage(img, 369, 181)
        this.ctx.closePath();
    }

    play(){
        this.rollBtn = new rectButton(this.canv, () => {
            if ( this.user === this.currentPlayer ) {
                this.turn();
            } else { console.log("not your turn") }
        }, {
            name: "roll",
            x: 150,
            y: 172.5,
            w: 130,
            h: 40,
            buttonText: "ROLL",
            textColor: "white",
            font: "20px Georgia"
        })
        this.holdBtn = new rectButton(this.canv, () => {
            if ( this.user === this.currentPlayer ) {
                this.endTurn();
            } else { console.log("not your turn") }
        }, {
            name: "hold",
            x: 150,
            y: 222.5,
            w: 130,
            h: 40,
            buttonText: "HOLD",
            textColor: "white",
            font: "20px Georgia"
        })
        this.canv.addEventListener("click", this.rollBtn.clicked);
        this.canv.addEventListener("click", this.holdBtn.clicked);

        this.sources = { one, two, three, four, five, six };
        this.render();
        this.playTurn();

    }

    playTurn(){
        if ( !this.gameOver() ) {
            if ( this.currentPlayer instanceof pigAi ) {
                this.roboTurn();
            }
        } else {
            this.win();
        }
    }

    win(){
        const idx = this.scores.findIndex( score => score >= 100 )
        console.log(idx)
        const winner = this.playerOrder[idx]
        console.log(winner)
        this.currentPlayer === null
        this.render(undefined, winner)
    }

    gameOver(){
        console.log(this.scores)
        const test = this.scores.find( score => score >= 100 )
        console.log(test)
        console.log(!!test)
        return !!test
    }

}

export default pig;