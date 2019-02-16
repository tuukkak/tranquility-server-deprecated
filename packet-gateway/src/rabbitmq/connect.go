package rabbitmq

import (
	"github.com/streadway/amqp"
	"err"
)

var channel *amqp.Channel

func connect() {
	conn, e := amqp.Dial("amqp://rabbitmq")
	err.Handler(e, "Failed to connect to RabbitMQ")
	
	ch, e := conn.Channel()
	err.Handler(e, "Failed to open a channel")
	channel = ch
}
