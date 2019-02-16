import * as amqplib from 'amqplib';

const channel = (host: string) => amqplib.connect(host).then(conn => conn.createChannel());

const publisher = (channel: amqplib.Channel) => (que: string) =>
    channel
        .assertQueue(que, { durable: false })
        .then(_ok => (msg: string) => channel.sendToQueue(que, Buffer.from(JSON.stringify(msg))));

const listener = (channel: amqplib.Channel) => (que: string, callback: Function) => {
    channel.assertQueue(que, { durable: false }).then(_ok =>
        channel.consume(que, msg => {
            if (msg !== null) {
                channel.ack(msg);
                callback(JSON.parse(msg.content.toString()));
            }
        })
    );
};

const rabbitmq = (host: string, callback: (publisher: Function, listener: Function) => void) =>
    channel(host).then(channel => callback(publisher(channel), listener(channel)));

export default rabbitmq;
