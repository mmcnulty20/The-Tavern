import { clearWithHUD, thisPlayer } from "../utils/canvas_utils";
import pig from "./pig-game";
import { shuffleConnectedPlayers } from "../utils/game_utils";
import { connectedPlayers } from "../utils/server_utils";

let control

const pigDisplay = (canv, ctx) => {
    
    clearWithHUD(canv, ctx);
    const game = new pig(canv, ctx, [ thisPlayer ])
    game.preRender();
    if ( Object.keys(connectedPlayers).length !== 1 ) {
        socket.on("all ready", controllingPlayer => {
            if ( socket.id === controllingPlayer ) {
                const order =  shuffleConnectedPlayers()
                socket.emit("shuffled order", order)
            }
        })
        socket.on("player order", order => {
            game.setup(order)
        })
    }
}

export default pigDisplay;
