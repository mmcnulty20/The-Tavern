import { modal, rectButton, clearWithHUD } from "../utils/canvas_utils"
import pig from "./pig-display";

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
    ctx.fillText("How to Play Pig:", 400, 100)

    const start = new rectButton(canv, () => pig(canv, ctx), {
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

    ctx.fillText("Num Players: (temporarily locked at 2: one human, one AI)", 400, 425)
}

export default pigInstructions;