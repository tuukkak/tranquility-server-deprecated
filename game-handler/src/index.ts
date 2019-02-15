import * as redis from 'redis';
import rabbitmq from './rabbitmq'

const client = redis.createClient({ host: 'redis' });
client.set('game:1:players', JSON.stringify([1, 2, 3]));

rabbitmq('amqp://rabbitmq', async (publisher, listener) => {
    const publish = await publisher('outward');
    listener('join', (msg: object) => {
        console.log('player joined')
        console.log(msg);
    });
});
