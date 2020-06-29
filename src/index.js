import style from "./styles/index.scss";
import setup from "./game/baseSetup"
import joinGame from "./join/joinGame";

document.addEventListener("DOMContentLoaded", () => {
    sessionStorage.removeItem("player")
    joinGame();
    setup();
})