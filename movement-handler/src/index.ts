import * as amqplib from 'amqplib';
import * as movementController from './controllers/movement';

const que = 'movement';

amqplib
    .connect('amqp://rabbitmq')
    .then(conn => conn.createChannel())
    .then(ch =>
        ch.assertQueue(que, { durable: false }).then(ok =>
            ch.consume(que, msg => {
                if (msg === null) return;
                ch.ack(msg);
                movementController.create(JSON.parse(msg.content.toString()));
            })
        )
    )
    .catch(console.warn);
