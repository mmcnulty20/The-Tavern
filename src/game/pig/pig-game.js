import one from "../../../resources/pixel_assets/dice/1.png";
import two from "../../../resources/pixel_assets/dice/2.png";
import three from "../../../resources/pixel_assets/dice/3.png";
import four from "../../../resources/pixel_assets/dice/4.png";
import five from "../../../resources/pixel_assets/dice/5.png";
import six from "../../../resources/pixel_assets/dice/6.png";
import { shufflePlayerOrder } from "../utils/game_utils"
import pigAi from "../player/pigAi";
import { clearWithHUD, rectButton, thisPlayer } from "../utils/canvas_utils";
import { loadImages, imagesStore } from "../utils/loading_utils";
import { connectedPlayers } from "../utils/server_utils";

class pig {
    constructor( canv, ctx ) {
        this.currentPlayerIndex = 0;

        this.canv = canv;
        this.ctx = ctx;

        this.user = thisPlayer

        this.numRolls = 0;
        this.tempScore = 0;

        socket.on("hold", () => {
            this.endTurn()
        });
        socket.on("roll", roll => {
            this.turn(roll)
        })
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

    rollEvent(){
        const roll = this.roll()
        socket.emit("roll", roll)
        this.turn(roll)
    }

    turn(roll){
        this.numRolls += 1;
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
                if ( this.turn(this.roll()) ) this.roboTurn();
            } else {
                this.endTurn();
            }
        }, 750 )
    }

    render(result, winner, holding = false){
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
            this.activePlayer = this.currentPlayer
        }
        if ( holding ) {
            this.rollBtn.render("grey");
            this.holdBtn.render("grey");
        } else {
            this.rollBtn.render(this.btnColor());
            this.holdBtn.render(this.btnColor());
        }
        ctx.beginPath();
        if ( ( result || this.currentPlayer === null ) && !holding ) {
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
            ctx.fillText(`${winner.name} wins!`, 400, 425)
        } else if ( holding ) {
            ctx.fillText(`Waiting for all players to join`, 400, 425);
        } else {
            ctx.textAlign = "center";
            ctx.fillText(`Current: ${this.tempScore}`, 400, 420)
            ctx.fillText(this.user.name, 190, 400)
            ctx.fillText(this.scores[this.myIdx], 190, 440)
            ctx.textAlign = "right"
            ctx.fillText("Rolling Now", 700, 400)
            ctx.fillStyle = this.activePlayer.textColor;
            ctx.strokeStyle = this.activePlayer.color;
            ctx.fillText(this.activePlayer.name, 700, 420);
            ctx.strokeText(this.activePlayer.name, 700, 420);
            
            ctx.fillStyle = this.user.color
            ctx.fillRect(135,408,100,15)
            let n = 0
            ctx.textAlign = "center"
            this.playerOrder.forEach( ( player, i ) => {
                if ( player !== this.user ) {
                    ctx.fillStyle = player.color
                    ctx.fillRect((675 - (n * 45)), 440, 30, 20)
                    ctx.fillStyle = player.textColor
                    ctx.fillText(this.scores[i], 690 - (n * 45), 455)
                    n += 1
                }
            })
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
                this.rollEvent();
            }}, {
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
                socket.emit("hold")
                this.endTurn();
            }
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

    preRender(){
        this.rollBtn = new rectButton(this.canv, () => {}, {
            name: "roll",
            x: 150,
            y: 172.5,
            w: 130,
            h: 40,
            buttonText: "ROLL",
            textColor: "white",
            font: "20px Georgia"
        })
        this.holdBtn = new rectButton(this.canv, () => {}, {
            name: "hold",
            x: 150,
            y: 222.5,
            w: 130,
            h: 40,
            buttonText: "HOLD",
            textColor: "white",
            font: "20px Georgia"
        })

        const allPlayers = Object.values(connectedPlayers)

        
        if ( allPlayers.length === 1 ) {
            allPlayers.push(new pigAi())
            this.shuffleToBegin(allPlayers);
            this.play();
        } else {
            this.render(null,null,true);
        }   
    }

    shuffleToBegin(allPlayers){
        const numPlayers = allPlayers.length;
        this.scores = new Array(numPlayers).fill(0)
        this.playerOrder = shufflePlayerOrder(allPlayers)
        this.currentPlayer = this.playerOrder[this.currentPlayerIndex]
        this.myIdx = this.user === this.currentPlayer ? 0 : 1;
    }

    setup(order) {
        this.playerOrder = order.map( ( connection, i) => {
            if ( connection === socket.id ) this.myIdx = i;
            return connectedPlayers[connection]
        } )
        this.scores = new Array(this.playerOrder.length).fill(0)
        this.currentPlayer = this.playerOrder[0]
        this.play()
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
        const winner = this.playerOrder[idx]
        this.currentPlayer === null
        this.render(undefined, winner)
    }

    gameOver(){
        const test = this.scores.find( score => score >= 100 )
        return !!test
    }

}

export default pig;