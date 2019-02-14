import { Movement, Player } from '../types';
import * as redis from 'redis';

const client = redis.createClient({ host: 'redis' });

const move = (publish: Function) => (movement: Movement) => {
    const { playerId, ...rest } = movement;
    client.set(`player:${playerId}:movement`, JSON.stringify(rest));
    client.get('game:1:players', (_err, players) => {
        JSON.parse(players).forEach((player: Player) => {
            if (player.id === playerId) return;
            publish(JSON.stringify({ to: player.address, message: movement }));
        });
    });
};

const movementHandler = (publish: (msg: string) => boolean) => ({
    move: move(publish)
});

export default movementHandler;
export { Movement } from '../types';
