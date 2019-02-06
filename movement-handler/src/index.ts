import rabbitmq from './rabbitmq/client';
import movementHandler, { Movement } from './movement';

rabbitmq('amqp://rabbitmq').then(messenger => {
    messenger.publisher('out').then(publish => {
        const movement = movementHandler(publish);
        messenger.subscribe('movement', (msg: Movement) => {
            movement.new(msg);
        });
    });
});
