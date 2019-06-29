import rabbitmq from './rabbitmq';
import movementHandler from './movement';
import { Movement } from './types';

const app = async () => {
    const { publisher, listener } = await rabbitmq('amqp://rabbitmq');
    const movement = movementHandler(publisher);

    listener('movement', (msg: Movement) => {
        movement.move(msg);
    });
}

app();
