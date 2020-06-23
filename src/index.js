import style from "./styles/index.scss";
import setup from "./game/baseSetup"
import Player from "./game/player/humanPlayer";

document.addEventListener("DOMContentLoaded", () => {
    const canv = document.getElementById("game");
    sessionStorage.setItem("player", "testuser")
    
    setup(canv);
})
