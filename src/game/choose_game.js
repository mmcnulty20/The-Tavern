import { modal, rectButton, clearWithHUD } from "./utils/canvas_utils"
import pigInstructions from "./pig/instructions";


const chooseGame = (canv, ctx) => {
    clearWithHUD(canv, ctx);
    modal(ctx)

    ctx.beginPath();
    ctx.rect(275,75,250,350);
    ctx.fillStyle = "antiquewhite";
    ctx.strokeStyle = "grey"
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "black"
    ctx.textAlign = "center";
    ctx.fillText("What would you like to play?", 400, 100)

    const pigButton = new rectButton(canv, () => pigInstructions(canv, ctx), {
        name: "pig-btn",
        x: 325,
        y: 120,
        w: 150,
        h: 50,
        fill: "red",
        buttonText: "Pig",
        textColor: "white"
    })
    pigButton.render();
    canv.addEventListener("click", pigButton.clicked );
}

export default chooseGame;