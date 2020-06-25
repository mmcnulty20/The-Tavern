import { clearWithHUD, thisPlayer } from "../utils/canvas_utils";
import pig from "./pig-game";

const pigDisplay = (canv, ctx) => {

    clearWithHUD(canv, ctx);
    const game = new pig(canv, ctx, [  thisPlayer ])
    game.play();
}

export default pigDisplay;
