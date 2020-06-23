import { modal, rectButton } from "./utils/canvas_utils"

const chooseGame = (canv, ctx) => {
    ctx.clearRect(0, 0, 800, 500);
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

    const pig = new rectButton(canv, () => console.log("playing pig"), {
        name: "pig-btn",
        x: 325,
        y: 120,
        w: 150,
        h: 50,
        fill: "red",
        buttonText: "Pig",
        textColor: "white"
    })
    pig.render();
    canv.addEventListener("click", pig.clicked );
}

export default chooseGame;