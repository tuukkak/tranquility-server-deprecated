import * as amqplib from 'amqplib';

const exchange = 'game';

const createChannel = async (host: string) => {
    const connection = await amqplib.connect(host);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'direct', {
        durable: false
    });
    return channel;
};

const publisher = async (channel: amqplib.Channel) => {
    return (que: string) =>
        channel
            .assertQueue(que, { durable: false })
            .then(_ok => (msg: object) => channel.sendToQueue(que, Buffer.from(JSON.stringify(msg))));
};

const listener = async (channel: amqplib.Channel) => {
    return (key: string, callback: Function) => {
        channel.assertQueue('', { exclusive: true }).then(q => {
            channel.bindQueue(q.queue, exchange, key);
            channel.consume(q.queue, msg => {
                if (msg !== null) {
                    channel.ack(msg);
                    callback(JSON.parse(msg.content.toString()));
                }
            });
        });
    };
};

const rabbitmq = async (host: string) =>
    createChannel(host)
        .then(channel => Promise.all([publisher(channel), listener(channel)]))
        .then(([publisher, listener]) => ({ publisher, listener }));

export default rabbitmq;
