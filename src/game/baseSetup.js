import chooseName from "./chooseName";
// import pig from "./pig/pig-game";
// import Player from "./player/humanPlayer";
// import src from "../../resources/pixel_assets/general/mug.png"
// import { loadImages } from "./utils/loading_utils";

const setup = () => {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    chooseName(canvas, ctx);
}

export default setup;