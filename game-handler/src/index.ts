import rabbitmq from './rabbitmq';
import { Login, Join } from './types';
import gameHandler from './game';

const app = async () => {
    const { publisher, listener } = await rabbitmq('amqp://rabbitmq');
    const game = gameHandler(publisher);

    listener('login', (msg: Login) => {
        console.log('New player logged in');
        game.login(msg);
    });
    
    listener('join', (msg: Join) => {
        console.log('New player joined queue');
        game.join(msg);
    });
}

app();
