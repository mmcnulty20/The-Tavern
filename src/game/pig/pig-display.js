import { clearWithHUD } from "../utils/canvas_utils";
import pig from "./pig-game";

const pigDisplay = (canv, ctx) => {

    clearWithHUD(canv, ctx);
    const game = new pig(canv, ctx, [  JSON.parse(sessionStorage.getItem("player")) ])
    game.play();
}

export default pigDisplay;
