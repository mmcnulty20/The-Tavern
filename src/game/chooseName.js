import welcomeScreen from "./welcomeScreen";
import { modal } from "./utils/canvas_utils";

const chooseName = (canv, ctx) => {
    if (!window.sessionStorage.player) {
        modal(ctx)
        
        // Replace with pixel-drawn box eventually
        ctx.beginPath();
        ctx.rect(150,200,500,100);
        ctx.fillStyle = "antiquewhite";
        ctx.strokeStyle = "grey"
        ctx.stroke();
        ctx.fill();

        ctx.textAlign = "center"
        ctx.fillStyle = "black"
        ctx.font = "30px Georgia"
        ctx.fillText("Start or join a game above to begin!", 400, 255)
    } else {
        welcomeScreen(canv,ctx)
    }
}

export default chooseName