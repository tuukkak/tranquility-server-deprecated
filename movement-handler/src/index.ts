import rabbitmq from './rabbitmq';
import movementHandler from './movement';
import { Movement } from './types';

rabbitmq('amqp://rabbitmq', async (publisher, listener) => {
    const publish = await publisher('outward');
    const movement = movementHandler(publish);
    listener('movement', (msg: Movement) => {
        movement.move(msg);
    });
});
