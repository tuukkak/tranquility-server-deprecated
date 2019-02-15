import { Movement, Player } from '../types';
import * as redis from 'redis';

const client = redis.createClient({ host: 'redis' });

const move = (publish: Function) => (movement: Movement) => {
    const { playerId, ...rest } = movement;
    // Save movement in state
    client.set(`player:${playerId}:movement`, JSON.stringify(rest));
    // Send movement to other players
    client.get('game:1:players', (_err, players) =>
        JSON.parse(players).forEach((player: Player) =>
            player.id !== playerId ? publish(JSON.stringify({ to: player.address, message: movement })) : null
        )
    );
};

const movementHandler = (publish: Function) => ({
    move: move(publish)
});

export default movementHandler;
export { Movement } from '../types';
