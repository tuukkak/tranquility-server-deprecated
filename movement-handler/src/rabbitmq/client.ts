import * as amqplib from 'amqplib';
import { Movement } from '../controllers/movement';

const channel = (host: string) => amqplib.connect(host).then(conn => conn.createChannel());

const messageBroker = (host: string, subQue: string, pubQue: string) =>
    channel(host).then(channel => ({
        publisher: channel
            .assertQueue(pubQue, { durable: false })
            .then(ok => (msg: string) => channel.sendToQueue(pubQue, Buffer.from(msg))),
        subscribe: (messageHandler: (msg: Movement) => void) => {
            channel.assertQueue(subQue, { durable: false }).then(ok =>
                channel.consume(subQue, msg => {
                    if (msg !== null) {
                        channel.ack(msg);
                        messageHandler(JSON.parse(msg.content.toString()));
                    }
                })
            );
        }
    }));

export default messageBroker;
