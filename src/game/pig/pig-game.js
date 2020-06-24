import faceOne from "../../../resources/pixel_assets/dice/1.png";
import faceTwo from "../../../resources/pixel_assets/dice/2.png";
import faceThree from "../../../resources/pixel_assets/dice/3.png";
import faceFour from "../../../resources/pixel_assets/dice/4.png";
import faceFive from "../../../resources/pixel_assets/dice/5.png";
import faceSix from "../../../resources/pixel_assets/dice/6.png";
import { shufflePlayerOrder } from "../utils/game_utils"
import pigAi from "../player/pigAi";
import { clearWithHUD, rectButton } from "../utils/canvas_utils";

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
        this.scores = [];

        this.numRolls = 0;
        this.tempScore = 0;

        this.loadImages();
    }

    loadImages(){
        this.one = new Image();
        this.one.src = faceOne;

        this.two = new Image();
        this.two.src = faceTwo;

        this.three = new Image();
        this.three.src = faceThree;

        this.four = new Image();
        this.four.src = faceFour;

        this.five = new Image();
        this.five.src = faceFive;

        this.six = new Image();
        this.six.src = faceSix;

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
                return this.one;
            case 2:
                return this.two;
            case 3: 
                return this.three;
            case 4: 
                return this.four;
            case 5:
                return this.five;
            case 6:
                return this.six;
            default:
                return null;
        }
    }

    endTurn(score){

    }

    turn(){
        const roll = this.roll()

    }

    render(result){
        const ctx = this.ctx;
        clearWithHUD(this.canv, ctx);
        
        ctx.beginPath();
        ctx.rect(85,375,630,100)
        ctx.strokeStyle = "black";
        ctx.fillStyle = "antiquewhite";
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(300,125,200,175)
        ctx.fillStyle = "#5e2f2f"
        ctx.strokeStyle = "#2f2016"
        ctx.lineWidth = 10
        ctx.fill();
        ctx.stroke();

        // ctx.fillRect(150,172.5,130,40)
        this.rollBtn.render(this.btnColor());
        this.holdBtn.render(this.btnColor())

        if (result) {
            ctx.drawImage(face(result))
        }


    }

    play(){
        this.rollBtn = new rectButton(this.canv, () => {
            if ( this.user === this.currentPlayer ) {
                console.log("rolling")
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
                console.log("holding")
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
        this.render()
    }

}

export default pig;