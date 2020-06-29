import { connectedPlayers } from "./server_utils";

export const shufflePlayerOrder = (allPlayers) => {
    const order = [];
    while (allPlayers.length > 0) {
        order.push(
            allPlayers.splice(
                Math.floor( Math.random() * allPlayers.length ), 1
            )[0]
        )
    }
    return order
}

export const shuffleConnectedPlayers = () => {
    const allPlayers = Object.keys(connectedPlayers)
    return shufflePlayerOrder(allPlayers)
}