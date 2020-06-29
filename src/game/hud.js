import { rectButton } from "./utils/canvas_utils";

class HUD {
    constructor(canv, player, numPlayers) {
        this.player = player;
        this.numPlayers = numPlayers;
        this.canv = canv;
        this.ctx = canv.getContext("2d");

        this.menu = new rectButton(canv, () => alert("menu opened!"), {
            name: "menu",
            x: 750,
            y: 5,
            w: 30,
            h: 25,
            fill: "#ffffff7e",
            buttonText: "☰",
            textColor: "black"
        })
    }

    render(){
    // render(player){
        const ctx = this.ctx;

        ctx.fillStyle = "white";
        ctx.strokeStyle = "grey";
        ctx.textAlign = "center";
        ctx.font = "20px Georgia"
        ctx.fillText(this.numPlayers, 30, 30)

        // if (player) {
        //     ctx.textAlign = "left";
        //     ctx.fillText(player, 70, 30);
        //     ctx.textAlign = "center";
        // }
        
        ctx.fillRect(262.5,10,275,30);

        ctx.fillStyle = this.player.color
        ctx.fillRect(267.5, 15, ( this.player.percent() * 265 ), 20);

        ctx.fillStyle = "#ffffff7e";
        ctx.fillRect(675,5,60,25)

        ctx.font = "16px Georgia"
        // ctx.strokeText(this.player.name, 400, 29);
        // ctx.strokeText(this.player.points, 705, 22)
        ctx.fillStyle = this.player.textColor
        ctx.fillText(this.player.name, 400, 29);
        ctx.fillText(this.player.points, 705, 22)

        this.menu.render();
        this.canv.addEventListener("click", this.menu.clicked );

        ctx.restore();

    }

    earnPoints(numPoints) {
        this.player.earnPoints(numPoints);
        this.render();
    }
}

export default HUD;