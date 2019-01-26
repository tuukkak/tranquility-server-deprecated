package rabbitmq

import (
	"log"
	"error"
	"github.com/streadway/amqp"
)

type Session struct {
	conn *amqp.Connection
	ch *amqp.Channel
}

var session = Session{}

func Send(que string, msg []byte) {
	if session.conn == nil {
		connect()
	}

	q, err := session.ch.QueueDeclare(
		"hello", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	error.Handler(err, "Failed to declare a queue")

	err = session.ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(msg),
		},
	)
	error.Handler(err, "Failed to publish a message")
	
	log.Printf("Sent: %s", msg)
}

func connect() {
	conn, err := amqp.Dial("amqp://rabbitmq")
	error.Handler(err, "Failed to connect to RabbitMQ")
	session.conn = conn
	
	ch, err := session.conn.Channel()
	error.Handler(err, "Failed to open a channel")
	session.ch = ch
}
