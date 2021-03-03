import Player from "../game/player/humanPlayer";
import { connectedPlayers } from "../game/utils/server_utils";
import setup from "../game/baseSetup";

const joinGame = () => {
    const joinBtn = document.getElementById("join");
    const modal = document.getElementById("new-player-modal")
    const form = document.getElementById("form-cont")

    const nameInput = document.getElementById("name");
    const colorInput = document.getElementById("color");
    const textColorInput = document.getElementById("text-color");
    const demo = document.getElementById("demo");
    const submitBtn = document.getElementById("player-submit");

    joinBtn.addEventListener("click", () => {
        if (!sessionStorage.getItem("player")) modal.classList.toggle("hidden")
    })
    modal.addEventListener("click", () => {
        modal.classList.toggle("hidden")
    })
    form.addEventListener("click", e => {
        e.stopPropagation();
    })

    let currentName = "";
    let color = "#aa80c2";
    let textColor = "#2c2330";
    demo.style = `color: ${textColor}; background: ${color}`

    nameInput.addEventListener("input", e => {
        const val = e.target.value
        if ( val.length < 29 && currentName !== val && ( val.length > 0 || currentName.length > 0)) {
            currentName = val;
            demo.innerHTML = `<span>${ currentName }</span>`
            nameInput.classList.remove("too-many")
        } else {
            e.target.value = currentName;
            nameInput.classList.add("too-many")
            if (val !== currentName) {
                nameInput.classList.add("shake")
                setTimeout(() => {nameInput.classList.remove("shake")}, 300)
            }
        }
    })
    
    colorInput.addEventListener("change", e => {
        color = e.target.value;
        demo.style = `color: ${ textColor }; background: ${ color }`
    })
    
    textColorInput.addEventListener("change", e => {
        textColor = e.target.value;
        demo.style = `color: ${ textColor }; background: ${ color }`
    })

    submitBtn.addEventListener("click", e => {
        e.preventDefault();
        if (currentName.length > 0) {
            modal.classList.add("hidden")
            if (!sessionStorage.getItem("player")) {
                joinBtn.classList.add("joined")
                socket.emit("new player", { name: currentName, color, textColor })
                setTimeout( () => {
                    sessionStorage.setItem("player", socket.id)
                    setup();
                }, 500 )
            }
        } else {
            nameInput.classList.add("too-many", "shake")
        }
    })
}

export default joinGame;