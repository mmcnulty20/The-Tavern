import welcomeScreen from "./welcomeScreen";
import { modal } from "./utils/canvas_utils";

const chooseName = (canv, ctx) => {
    if (!sessionStorage.getItem("player")) {
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

// arr = [{ state: "NY" }, { state: "CA" }, { state: "NY" },{ state: "NY" },{ state: "CA" },{ state: "MI" }]
// counts = {NY: 0, CA: 0, MI: 0}
// arr.forEach(obj => {
//     // counts[obj.state] = counts[obj.state] ? counts[obj.state] + 1 : 1
//     counts[obj.state] += 1
// })