import messageBroker from './rabbitmq/client';
import movementController, { Movement } from './controllers/movement';

messageBroker('amqp://rabbitmq', 'movement', 'outgoing').then(mb =>
    mb.publisher.then(publisher => {
        const movement = movementController(publisher);

        mb.subscribe((msg: Movement) => {
            console.log(msg);
            movement.create(msg);
        });
    })
);
