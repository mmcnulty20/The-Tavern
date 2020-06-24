import chooseName from "./chooseName";
import pig from "./pig/pig-game";
import pigAi from "./player/pigAi";
import Player from "./player/humanPlayer";

const setup = canvas => {

    const ctx = canvas.getContext("2d");
    // chooseName(canvas, ctx);
    const player = new Player(JSON.parse(sessionStorage.getItem("player")))
    const game = new pig(canvas, ctx, [player])
    game.play();
}

export default setup;