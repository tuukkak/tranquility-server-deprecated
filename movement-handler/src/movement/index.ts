import { Movement } from './type';
import * as redis from 'redis';

const client = redis.createClient({ host: 'redis' });

const movementHandler = (publish: (msg: string) => boolean) => ({
    new: (movement: Movement) => {
        console.log(movementHashMap(movement));
        client.hmset(`player:${movement.playerID}`, movementHashMap(movement), redis.print);
        client.hvals(`player:*`, (err, reply) => {
            console.log(err);
            console.log(reply);
        });
        publish('asd');
    }
});

const movementHashMap = (movement: Movement): Array<string | number> => {
    const { playerID, ...rest } = movement;
    const arr: (string | number)[] = [];
    Object.entries(rest).forEach(([key, value]) => {
        arr.push(key, value);
    });
    return arr;
};

export default movementHandler;
export type Movement = Movement;
