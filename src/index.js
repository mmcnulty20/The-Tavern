import style from "./styles/index.scss";
import setup from "./game/baseSetup"
import joinGame from "./join/joinGame";
import audio from "./join/audio";

document.addEventListener("DOMContentLoaded", () => {
    sessionStorage.removeItem("player")
    joinGame();
    audio();
    setup();
})