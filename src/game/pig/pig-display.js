import one from "../../../resources/pixel_assets/dice/1.png";
import two from "../../../resources/pixel_assets/dice/2.png";
import three from "../../../resources/pixel_assets/dice/3.png";
import four from "../../../resources/pixel_assets/dice/4.png";
import five from "../../../resources/pixel_assets/dice/5.png";
import six from "../../../resources/pixel_assets/dice/6.png";
import pigInstructions from "./instructions";
import { clearWithHUD } from "../utils/canvas_utils";



const roll = () => {
    return Math.floor(Math.random() * 6 + 1)
}

const pig = (canv, ctx) => {
    clearWithHUD(canv, ctx);
}

export default pig;
