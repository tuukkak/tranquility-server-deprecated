package rabbitmq

import (
	"err"
	"log"

	"github.com/streadway/amqp"
)

// Publish ...
func Publish(key string, msg []byte) {
	if channel == nil {
		connect()
	}

	e := channel.Publish(
		"game", // exchange
		key,    // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(msg),
		},
	)
	err.Handler(e, "Failed to publish a message")

	log.Printf("Sent: %s", msg)
}
