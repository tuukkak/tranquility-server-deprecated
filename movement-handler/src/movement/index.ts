import { Movement } from '../types';
import * as state from '../state';

const movementHandler = (publish: Function) => {
    const move = (movement: Movement) => {
        console.log('Received movement:', movement);
        const { playerId } = movement;

        // Save movement in state
        state.setPlayerMovement(playerId, movement);

        // Send movement to other players
        state.getPlayerGame(playerId, gameId => {
            state.getGamePlayers(gameId, players => {
                publish({
                    type: 3,
                    to: players.filter(p => p.id !== playerId).map(p => p.address),
                    content: movement
                });
            });
        });
    };

    return {
        move
    };
};

export default movementHandler;
