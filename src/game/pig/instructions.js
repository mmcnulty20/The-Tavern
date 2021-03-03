import { modal, rectButton, clearWithHUD } from "../utils/canvas_utils"
import pig from "./pig-display";
// import { socket } from "../../../server";

const pigInstructions = (canv, ctx) => {
    clearWithHUD(canv, ctx);
    modal(ctx)

    ctx.beginPath();
    ctx.rect(50,50,700,400);
    ctx.fillStyle = "antiquewhite";
    ctx.strokeStyle = "grey"
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "black"
    ctx.textAlign = "center";
    ctx.fillText("How to Play Pig:", 400, 80)

    const instructions = [
        "Pig is a classic dice game that can be played with just a single die",
        "On your turn, throw a 6 sided die.",
        "If not a 1: ",
        "   The value on the face will be added to your current total. But it's still your turn!",
        "   At any point, you can 'hold', adding the current point total to your score.",
        "   Keep rerolling as many times as you are willing to risk! HOWEVER",
        "If you roll a 1:",
        "   Your current total will be lost, your turn is over, and you'll take damage.",
        "   Damage is the number of times you rolled this turn",
        "   Continuing to roll can be risky to your health - especially your liver!",
        "The game is over when a player has accumulated 100 points!",
        "Don't let Coil win, though! And don't pass out!"
    ]

    ctx.textAlign = "left"
    instructions.forEach((str, i) => ctx.fillText(str, 125, 105 + (i * 20)));

    const start = new rectButton(canv, () => {
            socket.emit("ready")
            pig(canv, ctx);
        }, {
        name: "start-pig-btn",
        x: 325,
        y: 350,
        w: 150,
        h: 50,
        fill: "red",
        buttonText: "Begin",
        textColor: "white"
    })
    start.render();
    canv.addEventListener("click", start.clicked );
    ctx.textAlign = "center"

    ctx.fillText("Num Players: (temporarily locked at 2: one human, one AI)", 400, 425)
}

export default pigInstructions;