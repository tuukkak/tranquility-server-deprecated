package rabbitmq

import (
	"err"
	"log"
)

func Listener(que string) {
	if channel == nil {
		connect()
	}

	q, e := channel.QueueDeclare(
		que, // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	err.Handler(e, "Failed to declare a queue")

	msgs, e := channel.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	err.Handler(e, "Failed to register a consumer")

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
		}
	}()

	log.Printf("Waiting for messages...")
	
	<-forever
}
