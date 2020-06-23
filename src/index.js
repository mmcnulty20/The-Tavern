import style from "./styles/index.scss";
import setup from "./game/baseSetup"

document.addEventListener("DOMContentLoaded", () => {
    const canv = document.getElementById("game");
    
    setup(canv);
})