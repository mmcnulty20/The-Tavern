import welcome from "./welcomeScreen"

const setup = canvas => {

    const ctx = canvas.getContext("2d");

    welcome(canvas, ctx);
}

export default setup;