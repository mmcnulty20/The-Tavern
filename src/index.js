import style from "./styles/index.scss";
import setup from "./game/baseSetup"

document.addEventListener("DOMContentLoaded", () => {
    const canv = document.getElementById("game");
    
    sessionStorage.setItem("player", JSON.stringify({ name: "testuser", color: "#866b96" }))

    setup(canv);
})