const que = 'movement';

const amqplib = require('amqplib');

// Consumer
amqplib
    .connect('amqp://rabbitmq')
    .then(conn => conn.createChannel())
    .then(ch =>
        ch.assertQueue(que, { durable: false }).then(ok =>
            ch.consume(que, msg => {
                if (msg !== null) {
                    console.log('received:', JSON.parse(msg.content.toString()));
                    ch.ack(msg);
                }
            })
        )
    )
    .catch(console.warn);
