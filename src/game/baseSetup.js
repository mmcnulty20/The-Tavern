import chooseName from "./chooseName";
import pig from "./pig/pig-game";
import Player from "./player/humanPlayer";
import src from "../../resources/pixel_assets/general/mug.png"
import { loadImages } from "./utils/loading_utils";

const setup = canvas => {

    const ctx = canvas.getContext("2d");
    chooseName(canvas, ctx);
    const player = new Player(JSON.parse(sessionStorage.getItem("player")))
    // const game = new pig(canvas, ctx, [player])
    // game.play();
    // const mug = new Image();
    // mug.src = src;
    // mug.onload = () => ctx.drawImage(mug, 0, 0);

    // const images = loadImages({mug: src })
    // console.log(images)
    // ctx.drawImage(images[mug], 0, 0)
}

export default setup;