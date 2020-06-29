import Player from "../player/humanPlayer"
// import { socket } from "../../../server"

export let connectedPlayers = {}

socket.on("state", ( {players} ) => {
    const newConnected = {}
    Object.keys(players).forEach( connection => {
        if ( connectedPlayers[connection] ) {
            newConnected[connection] = connectedPlayers[connection]
        }
        else {
            newConnected[connection] = new Player(players[connection])
        }
    } )
    connectedPlayers = newConnected
})
