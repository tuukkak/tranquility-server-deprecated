import rabbitmq from './rabbitmq';
import { Login, Join } from './types';
import gameHandler from './game';

rabbitmq('amqp://rabbitmq', async (publisher, listener) => {
    const publish = await publisher('outward');
    const game = gameHandler(publish);

    listener('login', (msg: Login) => {
        console.log('New player logged in');
        game.login(msg);
    });
    
    listener('join', (msg: Join) => {
        console.log('New player joined queue');
        game.join(msg);
    });
});
