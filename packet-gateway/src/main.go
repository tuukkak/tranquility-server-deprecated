package main

import (
	"log"
	"udp"
)

func main() {
	log.Println("Starting packet gateway...")
	go udp.Listener()
	select {}
}
