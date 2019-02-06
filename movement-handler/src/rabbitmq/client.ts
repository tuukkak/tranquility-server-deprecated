import * as amqplib from 'amqplib';
import { Movement } from '../movement';

const rabbitmq = (host: string) =>
    amqplib
        .connect(host)
        .then(conn => conn.createChannel())
        .then(channel => ({
            publisher: (que: string) =>
                channel
                    .assertQueue(que, { durable: false })
                    .then(_ok => (msg: string) => channel.sendToQueue(que, Buffer.from(msg))),
            subscribe: (que: string, handler: (msg: Movement) => void) => {
                channel.assertQueue(que, { durable: false }).then(_ok =>
                    channel.consume(que, msg => {
                        if (msg !== null) {
                            channel.ack(msg);
                            handler(JSON.parse(msg.content.toString()));
                        }
                    })
                );
            }
        }));

export default rabbitmq;
