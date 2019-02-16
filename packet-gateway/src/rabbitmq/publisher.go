package rabbitmq

import (
	"log"
	"err"
	"github.com/streadway/amqp"
)

func Publish(que string, msg []byte) {
	if channel == nil {
		connect()
	}

	q, e := channel.QueueDeclare(
		que,     // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	err.Handler(e, "Failed to declare a queue")

	e = channel.Publish(
		"",     // exchange
		q.Name, // routing key
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
