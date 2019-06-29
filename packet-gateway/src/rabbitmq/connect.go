package rabbitmq

import (
	"err"

	"github.com/streadway/amqp"
)

var channel *amqp.Channel

func connect() {
	conn, e := amqp.Dial("amqp://rabbitmq")
	err.Handler(e, "Failed to connect to RabbitMQ")

	ch, e := conn.Channel()
	err.Handler(e, "Failed to open a channel")

	e = ch.ExchangeDeclare(
		"game",   // name
		"direct", // type
		false,    // durable
		false,    // auto-deleted
		false,    // internal
		false,    // no-wait
		nil,      // arguments
	)
	err.Handler(e, "Failed to declare an exchange")

	channel = ch
}
