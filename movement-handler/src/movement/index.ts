import { Movement, Player } from '../types';
import * as redis from 'redis';

const client = redis.createClient({ host: 'redis' });

const move = (publish: Function) => (movement: Movement) => {
    console.log('Received movement:', movement);
    const { playerId, ...rest } = movement;
    // Save movement in state
    client.set(`player:${playerId}:movement`, JSON.stringify(rest));
    // Send movement to other players
    client.get('game:1:players', (_err, players) =>
        publish(
            JSON.stringify({
                type: 3,
                to: JSON.parse(players)
                    .filter((p: Player) => p.id !== playerId)
                    .map((p: Player) => p.address),
                content: movement
            })
        )
    );
};

const movementHandler = (publish: Function) => ({
    move: move(publish)
});

export default movementHandler;
export { Movement } from '../types';
