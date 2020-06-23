import chooseName from "./chooseName";

const setup = canvas => {

    const ctx = canvas.getContext("2d");
    chooseName(canvas, ctx);
}

export default setup;